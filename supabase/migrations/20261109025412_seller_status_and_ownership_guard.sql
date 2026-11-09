/*
# Enforce seller status rules and product ownership on the server

1. Modified Tables
- `seller_applications`: a signed-in seller can only save status `draft` or `submitted`, and cannot move an application that is under review, approved, or rejected.
- `seller_products`: a signed-in seller can only save status `draft`, `pending_review`, or `inactive`. Publishing and rejection are reserved for staff. `seller_id` must match the signed-in user.

2. Security
- Blocks self-approval of seller applications and self-publishing of products, which the previous grants allowed.
- Staff (rows in `admin_staff`) and the database owner context (no signed-in user) are not restricted.

3. Important notes
- No rows are changed by this migration.
- The seller screens only save the allowed statuses, so their behaviour is unchanged.
*/

CREATE OR REPLACE FUNCTION public.guard_seller_application_status()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR EXISTS (SELECT 1 FROM public.admin_staff WHERE user_id = auth.uid()) THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND NEW.status IS NOT DISTINCT FROM OLD.status THEN
    RETURN NEW;
  END IF;

  IF NEW.status NOT IN ('draft', 'submitted') THEN
    RAISE EXCEPTION 'This status can only be set by staff' USING ERRCODE = '42501';
  END IF;

  IF TG_OP = 'UPDATE' AND OLD.status NOT IN ('draft', 'submitted') THEN
    RAISE EXCEPTION 'This application can no longer be changed by the seller' USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.guard_seller_product_rules()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR EXISTS (SELECT 1 FROM public.admin_staff WHERE user_id = auth.uid()) THEN
    RETURN NEW;
  END IF;

  IF NEW.seller_id IS DISTINCT FROM auth.uid()::text THEN
    RAISE EXCEPTION 'Products must belong to the signed-in seller' USING ERRCODE = '42501';
  END IF;

  IF NEW.status NOT IN ('draft', 'pending_review', 'inactive') THEN
    RAISE EXCEPTION 'This status can only be set by staff' USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.guard_seller_application_status() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.guard_seller_product_rules() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS guard_seller_application_status ON public.seller_applications;
CREATE TRIGGER guard_seller_application_status
  BEFORE INSERT OR UPDATE ON public.seller_applications
  FOR EACH ROW EXECUTE FUNCTION public.guard_seller_application_status();

DROP TRIGGER IF EXISTS guard_seller_product_rules ON public.seller_products;
CREATE TRIGGER guard_seller_product_rules
  BEFORE INSERT OR UPDATE ON public.seller_products
  FOR EACH ROW EXECUTE FUNCTION public.guard_seller_product_rules();

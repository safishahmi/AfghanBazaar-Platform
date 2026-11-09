/*
# Seller accounts: owner-scoped seller data

1. Modified Tables
- `seller_applications`: new `owner_id` column linking each application to the signed-in user who owns it. Defaults to the current user. One application per user.
- `seller_products`: new `owner_id` column linking each product to the signed-in user who owns it. Defaults to the current user.
- Demo rows created before accounts existed have no owner. They are kept, not deleted, and are no longer visible through the app.

2. Security
- Anonymous (signed-out) access is removed from both tables.
- Signed-in users can only read, create, and update rows whose owner matches their own user ID.
- The earlier demo policies that let anyone read and write are dropped.
- Delete access remains removed.

3. Important notes
- The owner column is set by the database, so the app cannot assign a listing to another user.
- Each seller can have one application.
*/

ALTER TABLE seller_applications ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();
ALTER TABLE seller_products ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();

CREATE UNIQUE INDEX IF NOT EXISTS seller_applications_owner_id_key ON seller_applications (owner_id);
CREATE INDEX IF NOT EXISTS seller_products_owner_id_idx ON seller_products (owner_id);

DROP POLICY IF EXISTS "anon_select_seller_applications" ON seller_applications;
DROP POLICY IF EXISTS "anon_insert_seller_applications" ON seller_applications;
DROP POLICY IF EXISTS "anon_update_seller_applications" ON seller_applications;
DROP POLICY IF EXISTS "anon_select_seller_products" ON seller_products;
DROP POLICY IF EXISTS "anon_insert_seller_products" ON seller_products;
DROP POLICY IF EXISTS "anon_update_seller_products" ON seller_products;

REVOKE ALL ON seller_applications FROM anon;
REVOKE ALL ON seller_products FROM anon;
GRANT SELECT, INSERT, UPDATE ON seller_applications TO authenticated;
GRANT SELECT, INSERT, UPDATE ON seller_products TO authenticated;

DROP POLICY IF EXISTS "select_own_seller_application" ON seller_applications;
CREATE POLICY "select_own_seller_application" ON seller_applications FOR SELECT
  TO authenticated USING (owner_id = auth.uid());

DROP POLICY IF EXISTS "insert_own_seller_application" ON seller_applications;
CREATE POLICY "insert_own_seller_application" ON seller_applications FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "update_own_seller_application" ON seller_applications;
CREATE POLICY "update_own_seller_application" ON seller_applications FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "select_own_seller_products" ON seller_products;
CREATE POLICY "select_own_seller_products" ON seller_products FOR SELECT
  TO authenticated USING (owner_id = auth.uid());

DROP POLICY IF EXISTS "insert_own_seller_products" ON seller_products;
CREATE POLICY "insert_own_seller_products" ON seller_products FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "update_own_seller_products" ON seller_products;
CREATE POLICY "update_own_seller_products" ON seller_products FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

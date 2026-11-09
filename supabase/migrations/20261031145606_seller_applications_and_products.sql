/*
# Seller applications and products (demo persistence)

1. New Tables
- `seller_applications`: the registration application and store profile for the demo seller. One row per applicant. Holds status, owner name, store name, contact details, business address, province, main category, and a short description.
- `seller_products`: product listings for the seller, including Dari and English names, description, category, image, prices, stock quantity, condition, brand, SKU, delivery method, and listing status.

2. Seed data
- One demo application and eight demo products are inserted so the seller panel has sample content on first load. Re-running the migration does not duplicate rows.

3. Security
- Row level security is enabled on both tables.
- The app has no sign-in screen, so policies allow the `anon` and `authenticated` roles. The data is intentionally public demo data.
- Grants are limited to SELECT, INSERT, and UPDATE. Rows are never deleted from the app.

4. Important notes
- Prices use numeric values in AFN. A discount must be zero or more and lower than the selling price.
- SKU values are unique.
- Order records are not stored in this migration.
*/

CREATE TABLE IF NOT EXISTS seller_applications (
  id text PRIMARY KEY,
  status text NOT NULL CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected')),
  full_name text NOT NULL,
  store_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  business_address text NOT NULL,
  province_id text NOT NULL,
  category_id text,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS seller_products (
  id text PRIMARY KEY,
  seller_id text NOT NULL,
  name_en text NOT NULL,
  name_prs text NOT NULL,
  description text NOT NULL DEFAULT '',
  category_id text NOT NULL,
  image_url text NOT NULL,
  selling_price numeric(12, 2) NOT NULL CHECK (selling_price > 0),
  discount_price numeric(12, 2) CHECK (discount_price IS NULL OR (discount_price >= 0 AND discount_price < selling_price)),
  quantity integer NOT NULL CHECK (quantity >= 0),
  condition text NOT NULL CHECK (condition IN ('new', 'like_new', 'used')),
  brand text,
  sku text NOT NULL UNIQUE,
  shipping_method text NOT NULL CHECK (shipping_method IN ('seller', 'afghanbazaar')),
  status text NOT NULL CHECK (status IN ('draft', 'pending_review', 'published', 'rejected', 'inactive')),
  updated_at date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS seller_products_seller_id_idx ON seller_products (seller_id);

ALTER TABLE seller_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_products ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE ON seller_applications TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON seller_products TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_seller_applications" ON seller_applications;
CREATE POLICY "anon_select_seller_applications" ON seller_applications FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_seller_applications" ON seller_applications;
CREATE POLICY "anon_insert_seller_applications" ON seller_applications FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_seller_applications" ON seller_applications;
CREATE POLICY "anon_update_seller_applications" ON seller_applications FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_seller_products" ON seller_products;
CREATE POLICY "anon_select_seller_products" ON seller_products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_seller_products" ON seller_products;
CREATE POLICY "anon_insert_seller_products" ON seller_products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_seller_products" ON seller_products;
CREATE POLICY "anon_update_seller_products" ON seller_products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

INSERT INTO seller_applications (id, status, full_name, store_name, phone, email, business_address, province_id, category_id, description, created_at)
VALUES (
  'demo-application', 'under_review', 'Demo Seller', 'Demo Seller Store', '+93 70 000 0001', 'seller-demo@example.com',
  'Demo address, District 4, Kabul', 'kabul', 'electronics', 'Demo application used to preview the registration status.', '2026-10-01 09:00:00+00'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO seller_products (id, seller_id, name_en, name_prs, description, category_id, image_url, selling_price, discount_price, quantity, condition, brand, sku, shipping_method, status, updated_at, created_at)
VALUES
  ('demo-earbuds', 'demo-seller', 'Demo wireless earbuds', 'گوش‌ی بی‌سیم نمونه', 'Compact earbuds with a charging case. Demo listing.', 'electronics', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 2800, 2400, 24, 'new', 'DemoSound', 'DEMO-EB-001', 'seller', 'published', '2026-10-28', '2026-10-01 09:01:00+00'),
  ('demo-vase', 'demo-seller', 'Demo hand-painted vase', 'گلدان نمونه دست‌ساز', 'A small hand-painted ceramic vase. Demo listing.', 'home-kitchen', 'https://images.pexels.com/photos/18633243/pexels-photo-18633243.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1900, NULL, 2, 'new', NULL, 'DEMO-HV-002', 'seller', 'published', '2026-10-27', '2026-10-01 09:02:00+00'),
  ('demo-shirt', 'demo-seller', 'Demo cotton shirt', 'پیراهن نمونه پنبه‌ای', 'Breathable cotton shirt for everyday wear. Demo listing.', 'clothing', 'https://images.pexels.com/photos/14564843/pexels-photo-14564843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1300, NULL, 15, 'new', NULL, 'DEMO-CS-003', 'seller', 'pending_review', '2026-10-29', '2026-10-01 09:03:00+00'),
  ('demo-moisturiser', 'demo-seller', 'Demo face moisturiser', 'کرم نمونه مرطوب‌کننده', 'Lightweight daily moisturiser. Demo draft.', 'beauty', 'https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 900, NULL, 0, 'new', 'DemoCare', 'DEMO-MF-004', 'afghanbazaar', 'draft', '2026-10-30', '2026-10-01 09:04:00+00'),
  ('demo-study-set', 'demo-seller', 'Demo study book set', 'مجموعه کتاب درسی نمونه', 'Set of study books for secondary school. Demo listing.', 'books', 'https://images.pexels.com/photos/34889792/pexels-photo-34889792.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 750, NULL, 10, 'used', NULL, 'DEMO-BK-005', 'seller', 'rejected', '2026-10-22', '2026-10-01 09:05:00+00'),
  ('demo-tool-kit', 'demo-seller', 'Demo hand tool kit', 'کیت ابزار دستی نمونه', 'Basic hand tool kit for home repairs. Demo listing.', 'tools', 'https://images.pexels.com/photos/909256/pexels-photo-909256.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 2600, 2450, 0, 'new', NULL, 'DEMO-TK-006', 'seller', 'published', '2026-10-26', '2026-10-01 09:06:00+00'),
  ('demo-vitamin-pack', 'demo-seller', 'Demo vitamin pack', 'بسته ویتامین نمونه', 'Vitamin C pack. Demo listing, currently paused by the seller.', 'health', 'https://images.pexels.com/photos/14029289/pexels-photo-14029289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1100, NULL, 5, 'new', 'DemoHealth', 'DEMO-VP-007', 'afghanbazaar', 'inactive', '2026-10-18', '2026-10-01 09:07:00+00'),
  ('demo-veg-crate', 'demo-seller', 'Demo vegetable crate', 'سبد سبزیجات نمونه', 'Fresh seasonal vegetable crate. Demo listing.', 'agriculture', 'https://images.pexels.com/photos/33622710/pexels-photo-33622710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 600, NULL, 8, 'new', NULL, 'DEMO-VC-008', 'seller', 'published', '2026-10-30', '2026-10-01 09:08:00+00')
ON CONFLICT (id) DO NOTHING;

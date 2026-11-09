/*
# Admin staff access list

1. New Tables
- `admin_staff`: one row per authorized staff member.
  - `user_id` (uuid, primary key): the signed-in account that is allowed into the admin dashboard.
  - `created_at` (timestamp): when access was granted.

2. Security
- Row level security is enabled on `admin_staff`.
- Signed-in users can read only their own row, so the app can check whether the current account is staff.
- No insert, update, or delete grant is given to any app role. Staff are added and removed by the database owner, so a signed-in user cannot grant themselves admin access.

3. Important Notes
- Creating this table does not grant access to anyone. Access is granted later by inserting a matching `user_id`.
*/

CREATE TABLE IF NOT EXISTS admin_staff (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_staff ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON admin_staff FROM PUBLIC, anon;
GRANT SELECT ON admin_staff TO authenticated;

DROP POLICY IF EXISTS "select_own_staff_row" ON admin_staff;
CREATE POLICY "select_own_staff_row" ON admin_staff FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

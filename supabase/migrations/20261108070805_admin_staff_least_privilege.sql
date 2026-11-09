/*
# Restrict admin_staff to read-only access for signed-in users

1. Modified Tables
- `admin_staff`: privileges for the `authenticated` role are reduced to SELECT only.

2. Security
- Removed INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, and TRIGGER from `authenticated`. These were present on the live table because the table's default privileges granted everything to signed-in users, and the earlier migration never revoked them from that role.
- Kept SELECT for `authenticated`. The existing row policy still limits reads to the signed-in user's own row.
- `anon` and `PUBLIC` keep no privileges.
- Row level security stays enabled. No policies were added or changed.
- The `service_role` and `postgres` roles keep their privileges, so staff are still added by the database owner.

3. Important Notes
- No rows are deleted or changed. Existing staff records remain intact.
- The statements are idempotent: revoking a privilege that is already absent has no effect.
*/

REVOKE ALL ON admin_staff FROM PUBLIC, anon, authenticated;
GRANT SELECT ON admin_staff TO authenticated;

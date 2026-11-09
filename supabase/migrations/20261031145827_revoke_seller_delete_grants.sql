/*
# Remove unused DELETE privilege from seller tables

1. Modified Tables
- `seller_applications` and `seller_products`: the default database privileges granted DELETE to the public API roles. The app never deletes seller records.

2. Security
- DELETE is revoked from `anon` and `authenticated` on both tables. SELECT, INSERT, and UPDATE stay in place.

3. Important notes
- Row level security already had no DELETE policy, so this only tightens privileges and does not change app behaviour.
*/

REVOKE DELETE ON seller_applications FROM anon, authenticated;
REVOKE DELETE ON seller_products FROM anon, authenticated;

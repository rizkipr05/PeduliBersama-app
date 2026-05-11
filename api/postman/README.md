Import collection ini ke Postman:

- File: `api/postman/PeduliBersama.postman_collection.json`
- Default `baseUrl`: `http://localhost:3001`

Urutan test yang disarankan:

1. `Auth > Admin Login`
2. `Users` atau `Bencana`
3. `Auth > Validate Token`
4. `Auth > Logout`

Catatan:

- Endpoint admin memakai header `Authorization: Bearer {{adminToken}}`
- Collection akan otomatis menyimpan token dari request login ke variable Postman
- Sebelum test admin, pastikan ada user admin di database

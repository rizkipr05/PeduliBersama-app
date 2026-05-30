Import collection ini ke Postman:

- File: `api/postman/PeduliBersama.postman_collection.json`
- Environment: `api/postman/PeduliBersama.local.postman_environment.json`
- Default `baseUrl`: `http://localhost:3001`

Flow test yang disarankan:

0. Jalankan `npm run seed:admin` di folder `api`
1. `Auth > Register User`
2. `Auth > Login User`
3. `Auth > Login Admin`
4. `Bencana > Create Bencana`
5. `Donasi > Create Donasi`
6. Lanjut ke endpoint admin/user lain sesuai kebutuhan

Catatan:

- Token admin dan user otomatis disimpan ke collection variable setelah login.
- `disasterId`, `donationId`, dan `managedUserId` juga akan terisi otomatis setelah request create yang relevan.
- Endpoint admin memakai header `Authorization: Bearer {{adminToken}}`.
- Endpoint donatur memakai header `Authorization: Bearer {{userToken}}`.
- Nilai yang sudah disiapkan di environment:
  - `baseUrl = http://localhost:3001`
  - `adminEmail = admin@mail.com`
  - `adminPassword = secret123`
  - `userEmail = user.postman@mail.com`
  - `userPassword = secret123`
- Environment juga sudah mencakup variable payload untuk:
  - create/update user
  - create/update bencana
  - upload foto bencana
  - set kebutuhan bencana
  - create/update donasi
  - simulasi notifikasi Midtrans
- Akun admin lokal sekarang bisa dibuat dengan `npm run seed:admin`.
- Script seed admin membaca `ADMIN_NAME`, `ADMIN_EMAIL`, dan `ADMIN_PASSWORD` dari `api/.env`.
- Request `Midtrans Notification` tanpa `signature_key` agar mudah dipakai untuk test lokal.

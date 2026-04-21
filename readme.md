# 🌿 PeduliBersama

> Aplikasi donasi bencana yang menghubungkan masyarakat untuk membantu korban secara cepat, transparan, dan terpercaya.

![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E?style=flat-square&logo=nestjs)
![NextJS](https://img.shields.io/badge/CMS-Next.js-000000?style=flat-square&logo=nextdotjs)
![React Native](https://img.shields.io/badge/Mobile-React%20Native-61DAFB?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/DevOps-Docker-2496ED?style=flat-square&logo=docker)

---

## 📖 Tentang Proyek

**PeduliBersama** adalah aplikasi donasi bencana berbasis mobile yang memungkinkan masyarakat menyalurkan bantuan kepada korban bencana secara mudah, cepat, dan transparan. Donatur dapat memantau ke mana donasinya disalurkan secara real-time.

> Proyek ini dikerjakan sebagai tugas mata kuliah **Pemrograman Berorientasi Service (PBS)**.  
> Penilaian berdasarkan jumlah commit GitHub dan kelengkapan dokumentasi.

---

## 👥 Tim & Pembagian Tugas

| Nama | Bagian | Platform | Stack |
|------|--------|----------|-------|
| [Orang 1] | Backend Developer | Server & API | NestJS + PostgreSQL |
| [Orang 2] | Frontend Developer | Admin Panel (CMS) | Next.js + Tailwind CSS |
| [Orang 3] | Mobile Developer | Aplikasi User | React Native + TypeScript |

---

## 🏗️ Arsitektur Sistem

```
peduli-bersama/
├── backend/                  ← NestJS API Server (port 3000)
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── campaigns/
│   │   ├── donations/
│   │   └── notifications/
│   └── Dockerfile
│
├── frontend-cms/             ← Next.js Admin Panel (port 3001)
│   ├── src/
│   │   └── app/
│   └── Dockerfile
│
├── mobile_pedulibersama/     ← React Native User App
│   └── src/
│       ├── screens/
│       ├── components/
│       ├── services/
│       └── navigation/
│
├── docker-compose.yml        ← Orkestrasi semua container
└── README.md
```

### Alur Sistem

```
[Admin] → input bencana → [CMS] → POST /disasters → [Backend API]
                                                           ↓
[Donatur] ← lihat bencana ← GET /disasters ←─────────────┘
    ↓
  donasi → POST /donations → [Backend] → [Midtrans Payment Gateway]
                                ↓
                        verifikasi admin
                                ↓
                    push notification → [FCM] → [Mobile App]
                                ↓
                    donatur tracking status donasi ✓
```

---

## 🐳 Docker & Setup Development

Project ini menggunakan **Docker Compose** — cukup 1 perintah untuk menjalankan semua service sekaligus.

### Prasyarat

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) sudah terinstall
- Git

### Cara Menjalankan (Semua Service)

```bash
# 1. Clone repository
git clone https://github.com/[username]/peduli-bersama.git
cd peduli-bersama

# 2. Copy environment variables
cp backend/.env.example backend/.env

# 3. Jalankan semua container
docker compose up

# Atau jalankan di background
docker compose up -d
```

Service yang berjalan:

| Container | URL | Keterangan |
|-----------|-----|------------|
| `backend` | http://localhost:3000 | NestJS API |
| `frontend-cms` | http://localhost:3001 | Admin Panel |
| `postgresql` | localhost:5432 | Database |
| `swagger` | http://localhost:3000/api | API Docs |

### Menjalankan Mobile App (Terpisah dari Docker)

```bash
cd mobile_pedulibersama
npm install
npm run android   # Android emulator
npm run ios       # iOS simulator (Mac only)
```

> ⚠️ Pastikan emulator Android sudah berjalan sebelum menjalankan perintah di atas.

---

## ✨ Fitur Aplikasi

### Role dalam Sistem

| Role | Platform | Hak Akses |
|------|----------|-----------|
| **Donatur** | Mobile App | Registrasi, login, lihat bencana, donasi, tracking, riwayat, notifikasi |
| **Admin** | CMS (Web) | Login admin, kelola bencana, verifikasi donasi, kelola user, laporan |
| **Sistem** | Backend | Proses request, autentikasi JWT, payment gateway, push notification |

### Modul Fitur

| Modul | Fitur | Untuk |
|-------|-------|-------|
| 🔐 Autentikasi | Register, Login (JWT), Logout, Validasi Token | Semua |
| 🌊 Manajemen Bencana | CRUD bencana, upload foto, status aktif/selesai | Admin |
| 💚 Donasi | Pilih bencana, input nominal, pilih metode bayar, konfirmasi | Donatur |
| ✅ Verifikasi Donasi | Lihat daftar donasi, verifikasi pembayaran, update status | Admin |
| 💳 Pembayaran | Integrasi Midtrans, status transaksi, generate invoice | Sistem |
| 📍 Tracking Donasi | Status diproses → diverifikasi → disalurkan, timeline | Donatur |
| 🔔 Notifikasi | Push notif donasi berhasil, perubahan status, bencana baru | Sistem |
| 📊 Laporan & Statistik | Total donasi, grafik, export PDF/Excel | Admin |
| 👤 Profil & Riwayat | Edit profil, riwayat donasi, bukti donasi | Donatur |

---

## 🗓️ Roadmap Pengembangan

### Fase 1 — Fondasi (Week 1–3)

| Week | Fokus | Backend | CMS | Mobile |
|------|-------|---------|-----|--------|
| W1 | Setup & Auth | Init NestJS, Docker, API login & register, JWT | Init Next.js, halaman login admin, axios setup | Init RN, splash screen, login & register |
| W2 | Bencana | CRUD endpoint bencana, upload foto, status | Halaman list & form bencana, integrasi API | Home screen, card bencana, detail bencana |
| W3 | Donasi | Endpoint donasi, integrasi Midtrans sandbox | List donasi, verifikasi, total per bencana | Form donasi, pilih metode, konfirmasi, sukses |

### Fase 2 — Fitur Utama (Week 4–6)

| Week | Fokus | Backend | CMS | Mobile |
|------|-------|---------|-----|--------|
| W4 | Tracking | Tracking status, riwayat per user, invoice | Update status, input timeline penyaluran | Riwayat donasi, detail status, timeline |
| W5 | Notif & Profil | FCM setup, push notif, endpoint profil | Manajemen user, role management | Profil user, edit profil, notifikasi |
| W6 | Polish | Swagger, rate limiting, statistik API | Dashboard grafik, export laporan | Skeleton loading, animasi, error handling |

### Fase 3 — Finalisasi (Week 7–8)

| Week | Fokus | Backend | CMS | Mobile |
|------|-------|---------|-----|--------|
| W7 | Testing | Unit test, optimasi query, bug fix | Testing semua halaman, screenshot | Testing Android, fix crash, optimasi |
| W8 | Submit | README, ERD, diagram arsitektur, v1.0.0 | README CMS, dokumentasi, merge PR | README mobile, build APK, merge PR |

> 📌 Estimasi commit per orang: **~85–95 commit** selama 8 minggu.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** NestJS (Node.js + TypeScript)
- **Database:** PostgreSQL 16
- **ORM:** TypeORM
- **Auth:** JWT (JSON Web Token)
- **Payment:** Midtrans Payment Gateway
- **Notification:** Firebase Cloud Messaging (FCM)
- **Docs:** Swagger / OpenAPI
- **Container:** Docker

### Frontend CMS
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Charts:** Recharts

### Mobile App
- **Framework:** React Native 0.73 + TypeScript
- **Navigation:** React Navigation v6
- **HTTP Client:** Axios + AsyncStorage
- **Payment:** Midtrans (WebView)
- **Notification:** Firebase Cloud Messaging
- **UI Design:** Custom (Stitch AI — tema hijau minimalis)

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/pedulibersama
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
FCM_SERVER_KEY=your_firebase_server_key
PORT=3000
```

### Frontend CMS (`frontend-cms/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Mobile App (`mobile_pedulibersama/src/services/api.ts`)
```ts
// Emulator Android  → http://10.0.2.2:3000
// Device fisik      → http://<IP_LAPTOP>:3000
// Production        → https://api.pedulibersama.com
```

---

## 📝 Konvensi Git

### Format Pesan Commit

```
feat: add login endpoint with JWT validation
feat: implement splash screen with animation
fix: keyboard avoiding view on android
fix: token expired handling on 401 response
docs: add README week 1 setup guide
refactor: move auth logic to service layer
chore: update dependencies
test: add unit test for auth endpoint
```

### Branch Strategy

```
main
├── feature/backend/auth
├── feature/backend/donation
├── feature/cms/dashboard
├── feature/cms/campaign
├── feature/mobile/splash-login
└── feature/mobile/donation-flow
```

---

## 📱 Screenshot

> *Screenshot akan ditambahkan setelah Week 6 selesai.*

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik — Mata Kuliah PBS.

---

<p align="center">
  Dibuat dengan 💚 oleh Tim PeduliBersama
</p>
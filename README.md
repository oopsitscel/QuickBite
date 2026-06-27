# QuickBite

QuickBite merupakan aplikasi **food ordering** berbasis web yang dirancang untuk membantu proses pemesanan makanan serta pengelolaan operasional restoran dalam satu sistem terintegrasi. Aplikasi ini mendukung empat jenis pengguna, yaitu **Guest**, **Customer**, **Chef**, dan **Admin**, di mana setiap role memiliki hak akses dan fitur yang berbeda sesuai kebutuhannya. QuickBite dikembangkan menggunakan **HTML**, **CSS**, **JavaScript**, **NestJS**, **TypeScript**, **Prisma ORM**, dan **MySQL**, serta menerapkan autentikasi menggunakan **JSON Web Token (JWT)** untuk menjaga keamanan sistem.

---

# Tech Stack

## Frontend
* HTML
* CSS
* JavaScript

## Backend
* NestJS
* TypeScript
* Prisma ORM
* JWT Authentication
* Bcrypt

## Database
* MySQL

---

# Prerequisites
Sebelum menjalankan aplikasi, pastikan perangkat telah terinstal:
* Node.js (versi 18 atau lebih baru)
* npm
* MySQL Server
* Git
* Visual Studio Code (disarankan)
* Live Server Extension (VS Code)

---

# Installation Guide
Ikuti langkah-langkah berikut untuk menjalankan QuickBite pada komputer lokal.

## 1. Clone Repository
Clone repository menggunakan Git.
```bash
git clone https://github.com/oopsitscel/QuickBite
```

Masuk ke folder project.
```bash
cd QuickBite
```

---

## 2. Import Database
QuickBite menggunakan **MySQL** sebagai database utama. Sebelum menjalankan aplikasi, database perlu diimpor ke dalam MySQL.

1. Buka **phpMyAdmin** atau **MySQL Workbench**.
2. Buat database baru dengan nama **quickbite_db**.
3. Pilih database **quickbite_db** yang telah dibuat.
4. Buka menu **Import**.
5. Pilih file **quickbite_db.sql**.
6. Klik **Import** (phpMyAdmin) atau **Start Import** (MySQL Workbench).
7. Tunggu hingga proses import selesai.

Setelah proses import berhasil, seluruh tabel beserta data awal akan tersedia di dalam database **quickbite_db** dan siap digunakan oleh aplikasi.

---

## 3. Backend Setup
Masuk ke folder backend.
```bash
cd backend
```

Install seluruh dependency project.
```bash
npm install
```

Perintah tersebut akan menginstal seluruh package yang dibutuhkan seperti NestJS, Prisma, JWT, Bcrypt, TypeScript, dan dependency lainnya.

---

## 4. Konfigurasi Environment Variables
Buat file baru dengan nama:
```
.env
```
di dalam folder **backend**, kemudian isi dengan konfigurasi berikut.

```env
PORT=5000

DATABASE_URL="mysql://root:@localhost:3306/quickbite_db"

JWT_SECRET=quickbite_secret
```

## 6. Menjalankan Backend
Jalankan backend menggunakan:
```bash
npm run start:dev
```

Apabila berhasil, backend akan berjalan pada:
```
http://localhost:5000
```

---

## 7. Menjalankan Frontend
Masuk ke folder frontend.
```bash
cd frontend
```
Karena frontend dikembangkan menggunakan HTML, CSS, dan JavaScript tanpa framework, proses build tidak diperlukan.

Jalankan frontend menggunakan **Live Server**.
Langkah-langkah:
1. Buka folder frontend pada Visual Studio Code.
2. Klik kanan file:
  ```
  guest.html
  ```
3. Pilih:
  ```
  Open with Live Server / Go Live
  ```

Frontend akan berjalan pada alamat seperti:
```
http://127.0.0.1:5500
```

---

## 8. Menjalankan Aplikasi
Pastikan:
* MySQL telah aktif.
* Database `quickbite_db` berhasil di-import.
* Backend berhasil berjalan pada `http://localhost:5000`.
* Frontend berhasil dijalankan menggunakan Live Server.
  
Selanjutnya buka halaman Guest, kemudian lakukan registrasi akun baru atau login menggunakan akun yang telah tersedia untuk mulai menggunakan aplikasi.

---

# User Roles

### Guest
* Melihat daftar menu.
* Melihat kategori makanan.

### Customer
* Registrasi akun.
* Login.
* Melihat menu.
* Menambahkan menu ke keranjang.
* Checkout pesanan.
* Melihat riwayat pesanan.
* Memantau status pesanan.

### Chef
* Menambahkan menu baru.
* Mengubah informasi menu.
* Melihat pesanan yang ditugaskan.
* Memperbarui status pesanan.

### Admin
* Mengelola data pengguna.
* Mengubah role pengguna.
* Mengelola kategori.
* Mengelola menu.
* Menugaskan chef pada pesanan.
* Melihat seluruh pesanan.
---

# Fitur Utama
* JWT Authentication
* Role-Based Access Control
* Food Ordering
* Shopping Cart
* Menu Management
* Category Management
* Order Management
* Order Tracking
* Stock Management
* Admin Dashboard
* Chef Dashboard

---

# Kelompok 5
* Edwin Winarto
* Joseline Fransiska Wijaya
* Kelly Aurelya Tiona
* Michelle Santoso
* Vincent Juvento

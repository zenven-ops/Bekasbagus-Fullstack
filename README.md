# Bekasbagus — Platform Jual Beli Barang Second (Fullstack)

**Tugas Perkuliahan Bab 9 — NestJS Dasar + Struktur MVC**  
**Nama:** Steven Taufik Fajar  
**NIM:** 103122400068  
**Kelas:** S1SE-08-02  

## Deskripsi Proyek
**Bekasbagus** adalah aplikasi web *marketplace* jual beli barang bekas (*second-hand*) yang mengutamakan keamanan transaksi **COD (Cash on Delivery) ketemuan langsung**, dilengkapi opsi pengiriman reguler. Proyek ini melanjutkan aplikasi frontend React sebelumnya dengan menambahkan fondasi backend REST API berbasis **NestJS** berarsitektur **MVC (Model-View-Controller)** untuk mengelola data utama produk (`products`).

## Fitur Utama & Arsitektur Backend
- **Entitas Utama (`Product`):** Menyimpan data barang bekas dengan 8 field (`id`, `nama`, `kategori`, `harga`, `kondisi`, `lokasi`, `bisaCod`, `gambar`).
- **Operasi CRUD Lengkap:** `GET /products`, `GET /products/:id`, `POST /products`, `PATCH /products/:id`, dan `DELETE /products/:id` menggunakan penyimpanan array in-memory dan *dependency injection* pada `ProductsService`.
- **Validasi DTO Global:** Validasi input otomatis menggunakan `class-validator` (`@IsString`, `@IsNotEmpty`, `@MinLength`, `@IsIn`, `@IsNumber`, `@Min`, `@IsBoolean`, `@IsOptional`) dan `ValidationPipe` global.
- **Exception Handling:** Penanganan error spesifik menggunakan `NotFoundException` (404), `ConflictException` (409) untuk iklan duplikat, dan `BadRequestException` (400) untuk titik lokasi COD yang tidak jelas.
- **Integrasi Fullstack:** Terhubung penuh dengan antarmuka React + Tailwind CSS untuk menampilkan katalog, menambah barang baru, mengedit data barang, dan menghapus barang.

## Struktur Folder
```text
bekasbagus-fullstack/
├── backend/              # REST API NestJS (MVC: Controller, Service, DTO, Entity)
├── frontend/             # Antarmuka Web React + Vite + Tailwind CSS
├── docs/
│   └── screenshots/      # Dokumentasi screenshot pengujian REST Client & Frontend
└── README.md
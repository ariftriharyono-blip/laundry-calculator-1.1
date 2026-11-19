# PRODUCT.md — LaundryCalc

Dokumen ini merangkum daftar fitur dari PRD *LaundryCalc & Catalog* (v1.1), urutan pengerjaan, serta hal-hal yang masih perlu diputuskan sebelum pembangunan kode dimulai.

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Target Versi | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FT-01** | Tampilan Katalog & Durasi | Must Have | v0.1 | Tidak ada | Selesai |
| **FT-02** | Input Berat & Notifikasi Min. Charge | Must Have | v0.1 | FT-01 | Selesai |
| **FT-03** | Opsi Add-on Terintegrasi | Must Have | v0.1 | FT-02 | Selesai |
| **FT-04** | Floating Price Summary | Must Have | v0.1 | FT-01, FT-02, FT-03 | Selesai |
| **FT-05** | Form Data Pemesan | Must Have | v0.1 | FT-03 | Selesai |
| **FT-06** | WhatsApp Deep Link Button | Must Have | v0.1 | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| **FT-07** | Info Jam Operasional Toko | Should Have | v0.1 | Tidak ada | Belum |

## Keputusan PRD yang Sudah Disepakati

1. **Format penulisan Rupiah:** Memakai format tanpa spasi (`Rp18.000`) secara konsisten di layar dan di pesan WhatsApp; penulisan jam memakai titik (`08.00–20.00 WIB`).
2. **Kondisi awal halaman:** Layanan utama `L02` (Cuci Setrika) terpilih otomatis, sedangkan kolom estimasi berat dimulai kosong.
3. **Pembulatan dan batas berat:** Input berat menerima desimal dengan koma atau titik (batas maksimal `100` kg); hasil kali rupiah dibulatkan ke bilangan bulat terdekat (`Math.round`).
4. **Pewangi Premium:** Ditampilkan sebagai satu checkbox `"Pewangi Premium"` beserta catatan `(Downy Passion / Mystique)` tanpa pemilih varian aroma.
5. **Posisi tombol kirim:** Tombol `"Kirim ke WhatsApp"` diletakkan di bar bawah yang menempel bersama ringkasan biaya agar selalu terlihat di layar ponsel `360 × 740 px`.

## Hal yang Belum Tertulis atau Menunggu Keputusan

1. **Nomor WhatsApp tujuan (`whatsapp_number`):** Sementara memakai nomor contoh prototipe (`6281234567890`) di `src/config.ts` dan dapat diganti pemilik toko kapan saja.
2. **Keputusan desain proyek (Tahap 2):** Menunggu pilihan pengguna untuk kesan visual (font), warna aksen, sapaan (Anda/Kamu), dan susunan halaman sebelum membuat `DESIGN.md` dan membangun aplikasi.

## Di Luar Lingkup (Sesuai PRD v0.1)

- Pembayaran daring atau payment gateway.
- Pelacakan progres cucian berbasis database atau backend.
- Login atau pendaftaran akun pelanggan.
- Perhitungan ongkos kirim dinamis berbasis Google Maps.

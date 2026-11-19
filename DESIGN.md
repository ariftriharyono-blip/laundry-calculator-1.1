# DESIGN.md — LaundryCalc

Dokumen ini mencatat keputusan tampilan dari pengguna serta aturan visual yang dipakai pada seluruh komponen aplikasi.

## Keputusan Desain Pengguna

| Aspek | Pilihan Disepakati | Implementasi Teknis |
| :--- | :--- | :--- |
| Kesan visual | Ramah dan hangat | `@fontsource/plus-jakarta-sans` (400, 500, 600) |
| Warna aksen | Biru (`blue`) | Tombol utama `bg-blue-700 hover:bg-blue-800`, pilihan aktif `border-blue-700 bg-blue-50`, teks aksen `text-blue-700` |
| Sapaan pengguna | Anda | Kalimat aktif sopan dalam EYD V |
| Susunan halaman | Satu halaman bergulir | Alur vertikal dari katalog, berat, add-on, sampai data pemesan (dua kolom di layar lebar) |
| Posisi aksi utama | Bar yang menempel di bawah layar | Sticky bottom bar pada layar kecil; panel ringkasan menempel di sisi kanan pada layar desktop |
| Gambar layanan | Tanpa gambar | Kartu layanan fokus pada nama, tarif per kg, durasi, dan deskripsi |

## Token Visual

- **Permukaan:**
  - Latar halaman: `bg-neutral-50`
  - Kartu dan panel: `bg-white`
  - Pemisah, tabel, dan tepi input: `border-neutral-200`
  - Sudut: kartu `rounded-2xl`, tombol dan input `rounded-xl`
  - Bayangan elemen melayang (bar bawah): `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`
- **Tipografi:**
  - Judul halaman: `text-2xl` (24 px, `font-semibold`)
  - Judul bagian: `text-lg` (18 px, `font-semibold`)
  - Teks isi dan input: `text-base` (16 px)
  - Label dan bantuan: `text-sm` (14 px)
  - Angka total utama: `text-2xl sm:text-3xl font-semibold tabular-nums`
  - Semua nominal dan berat memakai `tabular-nums`
- **Status & Aksesibilitas:**
  - Informasi / peringatan minimum charge: `bg-amber-50 text-amber-800` dengan ikon
  - Error validasi: `bg-red-50 text-red-800` dengan ikon, fokus pindah ke kolom error pertama saat submit
  - Cincin fokus: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`
  - Area sentuh seluruh tombol, kartu pilihan, dan checkbox minimal `44 × 44 px`
  - Gerak transisi hanya memakai `transform` dan `opacity` (`150ms ease-out`) serta menghormati `motion-reduce:`

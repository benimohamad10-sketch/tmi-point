# TMI Point

TMI Point adalah aplikasi web edukasi untuk siswa SMK Teknik Mesin Industri (TMI) yang berbasis gamifikasi. Aplikasi ini membantu siswa belajar, mengerjakan misi, mengirim bukti pengerjaan, dan melihat progres serta ranking berdasarkan poin.

## Fitur utama
- Formulir pendaftaran siswa
- Pilihan kelas:
  - X TMI (Kerja Bangku & Pekakas Tangan)
  - XI TMI (Kelistrikan Mesin Industri)
  - XII TMI (Proses Produksi)
- Materi berdasarkan kelas
- Misi pembelajaran dengan sistem poin
- Upload bukti pengerjaan berupa foto/screenshot
- Status bukti:
  - MENUNGGU
  - DITERIMA
  - DITOLAK
- Dashboard siswa:
  - Total poin
  - Level siswa
  - Progress poin
  - Summary misi
- Ranking otomatis berdasarkan total poin
- Panel guru untuk validasi tugas
- Data disimpan di Google Sheets
- Bukti foto/screenshot disimpan di Google Drive
- Backend menggunakan Google Apps Script
- Dapat di-hosting di GitHub Pages

## Teknologi yang digunakan
- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Apps Script
- Google Sheets
- Google Drive
- GitHub Pages

## Struktur project
```
tmi-point/
├── index.html          # Aplikasi siswa
├── guru.html           # Panel guru
├── style.css           # Styling
├── script.js           # JavaScript logic
├── Code.gs             # Google Apps Script backend
├── README.md           # Dokumentasi
└── .gitignore          # Git ignore file
```

## Kelas dan Materi

### X TMI - Kerja Bangku & Pekakas Tangan
- Kerja Bangku
- Keselamatan Kerja
- Pengukuran Teknik
- Pekakas Tangan
- Mesin Perkakas

**Misi X TMI:**
- Identifikasi Alat Bengkel — 50 poin
- Keselamatan Kerja — 75 poin
- Baca Materi Teknik Mesin — 40 poin
- Pengukuran Teknik — 60 poin
- Worksheet Kerja Bangku — 100 poin

### XI TMI - Kelistrikan Mesin Industri
- Kelistrikan Mesin Industri
- NCB
- Tombol ON/OFF
- Kontaktor
- Overload
- Rangkaian Kontrol Dasar
- Komponen Kelistrikan Mesin

**Misi XI TMI:**
- Pengenalan NCB — 75 poin
- Instalasi Tombol ON/OFF — 80 poin
- Pengenalan Kontaktor — 100 poin
- Overload Safety Check — 100 poin
- Rangkaian Kontrol Dasar — 125 poin

### XII TMI - Proses Produksi
- Proses Produksi
- Gambar Teknik Mesin
- CNC Dasar
- Kontrol Kualitas
- Proyek Akhir

**Misi XII TMI:**
- Proses Produksi Industri — 125 poin
- Membaca Gambar Teknik — 125 poin
- CNC Dasar — 150 poin
- Kontrol Kualitas — 100 poin
- Proyek Akhir — 200 poin

## Cara Setup

### 1. Persiapan Google Sheets

1. Buat spreadsheet baru di Google Sheets
2. Beri nama: `TMI Point Database`
3. Buat 2 sheet dengan nama:
   - `Data`
   - `Siswa`

### 2. Persiapan Google Apps Script

1. Buka spreadsheet yang sudah dibuat
2. Klik menu: **Extensions → Apps Script**
3. Hapus file default `Code.gs` jika ada
4. Copy-paste seluruh isi file `Code.gs` dari repository ini
5. Ganti bagian ini:
   ```javascript
   const SPREADSHEET_ID = "PASTE_ID_SPREADSHEET_DISINI";
   ```
   dengan ID spreadsheet Anda. Cara mendapatkan ID:
   - URL spreadsheet: `https://docs.google.com/spreadsheets/d/1ABC123XYZ/edit`
   - ID-nya: `1ABC123XYZ`

6. Simpan file (Ctrl+S)
7. Klik **Deploy** → **New deployment**
8. Pilih type: **Web app**
9. Execute as: **Me** (akun Anda)
10. Who has access: **Anyone**
11. Klik **Deploy**
12. Copy URL Web App yang muncul dan simpan

### 3. Hubungkan Frontend ke Backend

1. Buka file `index.html` di editor
2. Cari baris ini:
   ```javascript
   const API_URL = "PASTE_WEB_APP_URL_DISINI";
   ```
3. Ganti dengan URL Web App hasil deploy di langkah sebelumnya
4. Lakukan hal yang sama pada file `guru.html`

### 4. Upload ke GitHub Pages

1. Commit semua file:
   ```bash
   git add .
   git commit -m "Initial commit: TMI Point application"
   git push origin main
   ```

2. Buka Settings repository
3. Scroll ke bagian **Pages**
4. Pilih branch: **main**
5. Pilih folder: **/ (root)**
6. Klik **Save**

### 5. Akses Aplikasi

**Siswa:**
```
https://username.github.io/tmi-point/
```

**Guru:**
```
https://username.github.io/tmi-point/guru.html
```

## Panel Guru

**Password Default:**
```
TMI2025
```

Untuk mengubah password, edit file `guru.html`:
```javascript
const GURU_PASS = "TMI2025";
```

## Fitur Aplikasi

### Untuk Siswa

1. **Pendaftaran**
   - Masukkan nama lengkap
   - Pilih kelas (X TMI, XI TMI, atau XII TMI)
   - Masukkan nomor absen
   - Klik "Masuk ke Dashboard"

2. **Dashboard Beranda**
   - Tampilkan sambutan personalisasi
   - Statistik total poin
   - Jumlah misi yang disetujui
   - Jumlah misi yang menunggu
   - Progress poin dalam persentase
   - Summary misi dengan status

3. **Menu Misi**
   - Tampilkan semua misi sesuai kelas
   - Setiap misi bisa di-klik untuk upload bukti
   - Status misi (BELUM, MENUNGGU, DITERIMA, DITOLAK)
   - Link untuk melihat bukti yang sudah diupload

4. **Menu Materi**
   - Tampilkan daftar materi sesuai kelas
   - Materi berbeda untuk setiap kelas

5. **Menu Prestasi**
   - Tampilkan ranking siswa berdasarkan total poin
   - Menampilkan medal untuk 3 peringkat teratas
   - Nama, kelas, dan total poin siswa

6. **Menu Profil**
   - Tampilkan data siswa
   - Nama, kelas, nomor absen, total poin

### Untuk Guru

1. **Login Panel Guru**
   - Masukkan password guru
   - Klik "Masuk"

2. **Dashboard Guru**
   - Tampilkan statistik:
     - Total pengajuan
     - Menunggu review
     - Sudah diproses
   - Tabel daftar pengumpulan tugas dengan kolom:
     - Nama siswa
     - Kelas
     - Nomor absen
     - Nama misi
     - Poin
     - Bukti (link ke file)
     - Status
     - Catatan
     - Tombol TERIMA/TOLAK

3. **Proses Validasi**
   - Klik tombol **TERIMA**:
     - Status berubah menjadi DITERIMA
     - Poin otomatis ditambahkan ke akun siswa
     - Ranking diperbarui
     - Sistem mencegah double point
   - Klik tombol **TOLAK**:
     - Status berubah menjadi DITOLAK
     - Poin tidak diberikan
     - Siswa bisa upload ulang bukti

## Catatan Penting

1. **Poin hanya diberikan setelah guru menyetujui bukti**
   - Status awal pengajuan adalah MENUNGGU
   - Poin hanya masuk ketika status berubah menjadi DITERIMA

2. **Ranking otomatis berdasarkan total poin**
   - Ranking diupdate setiap kali guru approve tugas
   - Data dari sheet Siswa di Google Sheets

3. **Pencegahan double point**
   - Jika guru klik TERIMA lebih dari satu kali untuk misi yang sama
   - Sistem akan mencegah poin bertambah dua kali
   - Sistem cek apakah sudah ada status DITERIMA sebelumnya

4. **Data tersimpan di Google Sheets**
   - Semua data pengajuan di sheet Data
   - Total poin siswa di sheet Siswa
   - Data persist meskipun browser direfresh

5. **Bukti tersimpan di Google Drive**
   - Folder otomatis dibuat: TMI Point Bukti
   - Semua file bukti upload tersimpan di folder ini
   - File dapat diakses via link di aplikasi

## Troubleshooting

### Error: "API_URL not configured"
- Pastikan Anda sudah mengganti `API_URL` dengan URL Web App yang benar
- Pastikan URL tanpa trailing slash

### Error: "SPREADSHEET_ID not configured"
- Pastikan Anda sudah mengganti `SPREADSHEET_ID` di `Code.gs`
- Pastikan format ID benar (tanpa `/` atau tanda lain)

### Data tidak muncul
- Pastikan sheet `Siswa` dan `Data` sudah dibuat
- Pastikan header di sheet sudah sesuai
- Refresh halaman atau clear browser cache

### Upload bukti tidak berhasil
- Pastikan file size tidak terlalu besar (max 5MB)
- Pastikan format file didukung (PNG, JPG, PDF)
- Pastikan Google Drive tidak penuh

### Ranking tidak update
- Refresh halaman aplikasi
- Pastikan guru sudah klik tombol TERIMA
- Cek data di sheet Siswa di Google Sheets

## Tips Penggunaan

1. **Untuk Guru:**
   - Review bukti tugas dengan teliti
   - Berikan feedback melalui catatan jika ditolak
   - Monitor ranking untuk memberikan motivasi

2. **Untuk Siswa:**
   - Upload bukti yang jelas dan terlihat dengan baik
   - Jangan lupa untuk submit bukti setelah mengerjakan misi
   - Perhatikan progress poin untuk motivasi belajar

3. **Untuk Admin/Kepala Sekolah:**
   - Monitor data siswa melalui Google Sheets
   - Buat backup data secara berkala
   - Customize password guru jika diperlukan

## Pengembangan Lanjutan

Aplikasi ini bisa dikembangkan lebih lanjut dengan:
- Sistem notifikasi email
- Export data ke Excel/PDF
- Analytics dan dashboard admin
- Leaderboard real-time
- Mobile app dengan React Native
- Integrasi dengan sistem akademik sekolah

## Lisensi
Proyek ini dibuat untuk kebutuhan pembelajaran dan pengembangan aplikasi edukasi di SMK.

## Support
Untuk pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ untuk siswa SMK Teknik Mesin Industri**
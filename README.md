# :bangbang: Involuntir - Frontend Intern Assessment :bangbang:

## 🛠️ Tech Stack
Project ini dibangun menggunakan teknologi modern sesuai instruksi:

* **Core:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Icons:** React Icons

## 🚀 Cara Menjalankan Project
1.  **Clone Repository:** :
    ```bash
    git clone https://github.com/Louis3112/lumbaUmbah
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Jalankan Development Server:**
    ```bash
    npm run dev
    ```
4.  Buka browser dan akses `http://localhost:5173`.

> **Catatan Login:** Karena endpoint `POST /api/login` dan `POST /api/logout` merespon 404. Sehingga, gunakan email `test@gmail.com` dan password `123` (atau kredensial apapun) untuk masuk.

## 📂 Struktur Folder
Struktur project disusun secara modular untuk memisahkan logika aplikasi dan *UI Project*:
```text
src/
├── components/       # Reusable UI components
│   ├── ErrorCard.jsx          # Tampilan Error ketika terjadi kesalahan
│   ├── EventCard.jsx          # Kartu event untuk list view
│   ├── LoadingAnimation.jsx   # Animasi Loading ketika digunakan di state Loading
│   ├── ProtectedRoute.jsx     # HOC untuk proteksi halaman
├── pages/            # Halaman aplikasi
│   ├── EventList.jsx      # Halaman Home (List + Search + Filter)
│   ├── EventDetail.jsx    # Halaman Detail Event
│   └── Login.jsx          # Halaman Login
├── services/         # Integrasi API & Logic
│   └── api.js             # Konfigurasi Axios & Fetch functions
├── App.jsx           # Routing configuration
└── main.jsx          # Entry point

✨ Fitur Utama
Event List & Detail: Mengambil data real-time dari API publik yang disediakan.

Responsive Design: Layout grid adaptif (Mobile 1 kolom, Tablet 2 kolom, Desktop 3 kolom).

Search & Filter: Fitur pencarian client-side berdasarkan nama event dan filter kategori.

UX Enhancements:

Skeleton Loading saat mengambil data.

Error Handling yang informatif jika API gagal.

Empty State jika data pencarian tidak ditemukan.

Bonus Features (Auth Flow):

Halaman Login dengan validasi.

Protected Routes: User tidak bisa akses halaman event tanpa login.

Simulasi penyimpanan token di localStorage.

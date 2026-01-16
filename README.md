# :bangbang: Involuntir - Frontend Intern Assessment :bangbang:

## 🛠️ Tech Stack
Project ini dibangun menggunakan teknologi modern sesuai instruksi:

* **Core:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Icons:** React Icons
<br/>

## 🚀 Cara Menjalankan Project
1.  **Clone Repository:** :
    ```bash
    git clone https://github.com/Louis3112/involuntir-test
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
<br/>

## 📂 Struktur Folder
Struktur project disusun secara modular untuk memisahkan logika aplikasi dan *UI Project*:
```text
src/
├── components/           # Reusable UI components
│   ├── ErrorCard.jsx          # Tampilan Error ketika terjadi kesalahan
│   ├── EventCard.jsx          # Kartu event untuk list view
│   ├── LoadingAnimation.jsx   # Animasi Loading ketika digunakan di state Loading
│   ├── ProtectedRoute.jsx     # HOC untuk proteksi halaman
├── pages/                # Halaman aplikasi
│   ├── EventList.jsx          # Halaman Home (List + Search + Filter)
│   ├── EventDetail.jsx        # Halaman Detail Event
│   └── Login.jsx              # Halaman Login
├── services/             # Integrasi API & Logic
│   └── api.js                 # Konfigurasi Axios & Fetch functions
├── App.jsx           # Routing configuration
└── main.jsx          # Entry point
```
<br/>

## ✨ Fitur Utama
- *Event List* & Detail: Mengambil data *real-time* dari API publik yang disediakan.
- *Responsive Design*: Layout grid adaptif untuk *Event List page* (Mobile 1 kolom, Tablet 2 kolom, Desktop 3 kolom).
- *Search & Filter*: Fitur pencarian *client-side* berdasarkan nama event dan filter kategori.
- *UX Enhancements*:
    - Animasi *Loading* saat mengambil data.
    - *Error Notif* yang informatif jika API gagal.
    - *Empty State* jika data pencarian tidak ditemukan.
- *Bonus Features (Auth Flow)*:
    - Halaman *Login* dengan validasi.
    - *Protected Routes*: User tidak bisa akses halaman event tanpa login (simulasi).
    - Simulasi penyimpanan token di *localStorage*.
 <br/>
 
## 💡 Jawaban Pertanyaan Wajib (Refleksi)
Berikut adalah jawaban saya atas pertanyaan refleksi yang diminta dalam brief:

### 1. Bagian tersulit apa dari sisi frontend?
Menurut saya, bagian tersulitnya adalah cara menerima *fetching data* dari *endpoint* lalu menampilkannya pada *UI*.
Saya harus mengetahui bagaimana *API*  mengembalikan data dan menyesuaikannya dengan *Front-End*. 

Sebagai contoh :
`GET /api/events` mengembalikan :
```JSON
{
    "data": [
        {
            "id": 1,
            "event_name": ...,
            "event_date": ...,
            "event_location": ...,
        },
    ...
    ]
}
```
Yang dimana, cara pengembalian *API* ini sudah benar, karena *API* mengembalikan *object* dengan data berupa *array*.

Namun di endpoint lain (`GET /api/events:id/detail`), *API* mengembalikan *object* data yg sama. 
```JSON
{
    "data": [
        {
            "id": 1,
            "event_name": ...,
            "event_date": ...,
            "event_location": ...,
        },
    ]
}
```
Yang dimana, seharusnya *API* mengembalikan object dengan data berupa *object* saja (karena hanya 1 data yang dikembalikan).
```JSON
{
    "data": 
        {
            "id": 1,
            "event_name": ...,
            "event_date": ...,
            "event_location": ...,
        },
}
```
Dari tantangan tersebut, saya beradaptasi dan harus menyesuaikan *output coding* di EventList.jsx dan EventDetail.jsx untuk mendeteksi struktur data agar aplikasi dapat membaca data yang diberikan.

Selain itu, endpoint `POST /api/login` dan `POST /api/logout` mengembalikan 404 Not Found. Solusinya, saya berinisiatif membuat *mock service* di api.js yang mensimulasikan proses login agar fitur autentikasi dan *Protected Route* tetap bisa didemonstrasikan.
<br/><br/>

### 2. Jika diberi waktu 1 minggu, apa yang akan kamu tingkatkan?
Saya akan melakukan beberapa hal berikut : 
1. Migrasi ke TypeScript: Untuk meningkatkan keamanan tipe data dan mencegah *bug* saat runtime, terutama karena struktur API yang dinamis.
2. Menambahkan *dark mode theme* : Untuk meningkatkan *UX* sehingga lebih nyaman dalam mengakses aplikasi
3. Menambahkan *database* : Untuk menyimpan data *user*, seperti *event* yang diikuti, *cache* , dan manajemen *auto-refetch* agar tidak perlu *request* setiap saat.
4. Membuat *wireframe* dan *UI/UX design: Untuk menyesuaikan dengan *personal branding* dari involuntir.
<br/>

### 3. Asumsi UX apa yang kamu ambil?
Asumsi *UX* yang saaya ambil adalah : 
1. Wajib *Login*: Saya berasumsi platform involuntir bersifat eksklusif bagi anggota terdaftar, terutama apabila anggota sudah mendaftar suatu *event* yang dia inginkan. Oleh karena itu, *page* `EventList.js` dan `EventDetail.js` perlu di *protected* terlebih dahulu dengan cara melakukan *login*.
2. *Feedback* Visual: Saya berasumsi pengguna membutuhkan *feedback* apakah *website* sedang *loading* atau tidak responsif. Oleh karena itu, saya membuat *loading animation* dan *error card* agar pengguna tahu bahwa *website* responsif.
3. Navigasi: Menambahkan tombol "Kembali" di *page* `EventDetail.js` dan indikator status *login/logout* di navbar untuk kejelasan status pengguna.


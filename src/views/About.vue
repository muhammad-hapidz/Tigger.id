<template>
  <div class=" text-slate-700">
    <!-- Section: Introduction -->
    <div class="flex flex-wrap lg:flex-nowrap mt-16 lg:mt-36 pb-4">
      <!-- Image Section -->
      <div class="lg:flex-1 ml-12">
        <img src="../assets/img/1.jpeg" class="rounded" alt="Chery Community">
      </div>

      <!-- Text Content Section -->
      <div class="lg:flex-1 lg:mr-10 mt-5 lg:mt-0 text-lg p-10 lg:p-0 lg:px-10">
        <h1 class="text-2xl text-slate-700 font-semibold mb-4">CHERY COMMUNITY INDONESIA</h1>
        <p class="mt-1 text-justify">
          <span class="text-slate-800 font-semibold text-2xl">Tigger.id</span> adalah Komunitas Eksklusif khusus pengguna dan pemilik Chery Tiggo Series di Indonesia. Berdiri pada tanggal 19 Juli 2024 dengan dukungan dari pihak Chery Sales Indonesia (CSI).
          <p>Berdiri pada tanggal 19 Juli 2024 oleh beberapa pengguna Chery Tiggo dengan dukungan dari pihak Chery Sales Indonesia (CSI).      
          Komunitas Tigger.id berbentuk non-profit yang bertujuan sebagai wadah berkumpul, tukar pikiran, diskusi, dan
          having fun bagi seluruh Tiggo owners di Indonesia.</p>
        </p>
        <div v-if="showFullText" class="mt-1 text-justify">
    
          <p>Keanggotaan Tigger dibatasi hanya kepada pemilik kendaraan Chery Tiggo (Tiggo 5, Tiggo 7, Tiggo 8, Tiggo 9, dll), dan nomor rangka/VIN akan dicatat dalam database.

Kepengurusan komunitas Tigger mengutamakan kedaulatan dan tanggung jawab anggota, di mana kuasa terbesar berada di tangan para anggota melalui Rapat Anggota. Dalam melaksanakan tugas harian, komunitas menunjuk Koordinator Harian (KoHar), wakil, sekretaris, serta bendahara. KoHar dan timnya yang akan menjalankan komunitas termasuk mengelola medsos dan WAG/Telegram. Apabila ada kegiatan/event, KoHar dapat menunjuk salah satu anggota menjadi Korlap.

Penanggung jawab dari komunitas ini ditanggung bersama oleh semua anggota, sehingga partisipasi aktif namun santai dari seluruh anggota sangat diperlukan.

Kegiatan Tigger akan mengarah pada sharing, diskusi, touring, aksi sosial dengan suasana kekeluargaan.</p>
        </div>
        <div class="text-end mt-5">
        <button
        @click="toggleFullText"
        class="mt-4 px-4 py-2 bg- text-white bg-primary rounded hover:bg-white hover:text-primary border border-primary transition">
        {{ showFullText ? 'Tutup' : 'Baca Selengkapnya' }}
        </button>
      </div>
      </div>
    </div>

    <!-- Section: Activities -->
    <div class="mx-4 lg:mx-16 mt-10">
      <h1 class="text-xl font-semibold mb-4">Kegiatan Komunitas</h1>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Meet and Greet</h2>
          <p class="text-sm text-gray-600">Acara pertemuan antar anggota untuk saling berkenalan dan berbagi pengalaman berkendara dengan mobil Chery Tiggo.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Road Trips</h2>
          <p class="text-sm text-gray-600">Perjalanan berkendara bersama untuk mengunjungi lokasi menarik dan mengadakan kegiatan sosial.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Workshop dan Seminar</h2>
          <p class="text-sm text-gray-600">Acara edukasi tentang pemeliharaan mobil dan teknologi terbaru.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Event Sponsorship</h2>
          <p class="text-sm text-gray-600">Mendukung berbagai acara komunitas seperti lomba berkendara dan acara amal.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Diskusi Online</h2>
          <p class="text-sm text-gray-600">Forum online untuk berbagi masukan, pertanyaan, dan tips.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Kegiatan CSR</h2>
          <p class="text-sm text-gray-600">Program amal dan bakti sosial yang melibatkan anggota.</p>
        </div>
      </div>
    </div>

    <!-- Section: Models -->
    <div class="mx-4 lg:mx-16 mt-10">
      <h1 class="text-xl font-semibold mb-4">Model Chery Tiggo di Indonesia</h1>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Tiggo 5X</h2>
          <p class="text-sm text-gray-600">SUV entry-level dengan harga terjangkau dan fitur memadai.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Tiggo 7 Pro</h2>
          <p class="text-sm text-gray-600">SUV kompak dengan fitur canggih dan kenyamanan tinggi.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Tiggo 8</h2>
          <p class="text-sm text-gray-600">SUV 7-penumpang dengan desain stylish dan fitur canggih.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Tiggo 8 Pro</h2>
          <p class="text-sm text-gray-600">SUV premium dengan fitur keselamatan tinggi dan performa unggul.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Tiggo 8 Pro Max</h2>
          <p class="text-sm text-gray-600">Varian premium dari Tiggo 8 Pro dengan performa terbaik.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Tiggo 8 Hybrid</h2>
          <p class="text-sm text-gray-600">SUV PHEV ramah lingkungan dengan efisiensi bahan bakar.</p>
        </div>
      </div>
    </div>

    <!-- Section: Touring Activities -->
    <div class="mx-4 lg:mx-16 mt-10 pb-12">
      <h1 class="text-xl font-semibold mb-4">Kegiatan Touring</h1>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Road Trips</h2>
          <p class="text-sm text-gray-600">Perjalanan berkendara ke berbagai destinasi menarik di Indonesia.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Jelajah Alam</h2>
          <p class="text-sm text-gray-600">Touring ke area alam seperti hutan dan pegunungan.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Event Gathering</h2>
          <p class="text-sm text-gray-600">Acara berkumpul di lokasi tertentu untuk berbagi cerita.</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h2 class="font-semibold text-lg mb-2">Lomba Berkendara</h2>
          <p class="text-sm text-gray-600">Mengadakan lomba berkendara untuk menantang kemampuan berkendara dan kecepatan anggota, sering kali dengan tema tertentu atau lintas kota.</p>
        </div>
      </div>
    </div>
    <!-- Section: Segment Khusus Mobil Chery -->
<div class="mx-4 lg:mx-20 mt-3">
  <h1 class="text-2xl font-bold mb-6 text-slate-800">Segment Khusus Mobil Chery</h1>
  <div class="space-y-6 px-5 pb-10">
    <!-- Chery Tiggo 5X -->
    <div class="p-6 bg-gray-100 shadow-lg rounded-lg border border-gray-200">
      <h2 class="text-xl font-semibold text-accent1 mb-2">Chery Tiggo 5X</h2>
      <p class="text-justify">
        Ditargetkan untuk segmen keluarga muda dan profesional muda yang mencari SUV kompak dengan harga terjangkau.
        Cocok untuk mobilitas sehari-hari dengan desain stylish dan fitur keselamatan lengkap.
      </p>
    </div>

    <!-- Chery Tiggo 7 Pro -->
    <div class="p-6 bg-gray-100 shadow-lg rounded-lg border border-gray-200">
      <h2 class="text-xl font-semibold text-accent1 mb-2">Chery Tiggo 7 Pro</h2>
      <p class="text-justify">
        Menyasar profesional muda dan keluarga urban dengan kenyamanan dan fitur canggih. Ideal untuk penggunaan sehari-hari maupun perjalanan jarak jauh dengan desain modern dan teknologi terkini.
      </p>
    </div>

    <!-- Chery Tiggo 8 Series -->
    <div class="p-6 bg-gray-100 shadow-lg rounded-lg border border-gray-300">
      <h2 class="text-xl font-semibold text-accent1 mb-2">Chery Tiggo 8 Series</h2>
      <div class="pl-4">
        <p class="mb-2">
          <strong>Tiggo 8:</strong> SUV 7-penumpang untuk keluarga besar yang membutuhkan kapasitas dan kenyamanan.
        </p>
        <p class="mb-2">
          <strong>Tiggo 8 Pro:</strong> Untuk keluarga urban yang mengutamakan fitur canggih dan keamanan.
        </p>
        <p>
          <strong>Tiggo 8 Pro Max:</strong> Segmen premium dengan performa dan fitur terbaik, termasuk sistem ADAS dan interior mewah.
        </p>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
import {ref} from 'vue'
const showFullText= ref(false);

const toggleFullText = () => {
  showFullText.value = !showFullText.value;
};

</script>
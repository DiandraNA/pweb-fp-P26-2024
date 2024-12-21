<script lang="ts" setup>
useSeoMeta({
    title: 'Operator',
    description: 'Ini adalah dasboard operator, tempat dimana Anda mengatur segalanya'
})
</script>

<template>
    <main 
      class="min-h-screen bg-cover bg-center text-center"
      style="background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20230620/pngtree-luxurious-contemporary-office-room-rendered-in-3d-image_3649059.jpg');"
    >
      <div class="flex justify-center items-center min-h-screen bg-black/50">
        <div class="shadow-lg rounded-lg p-8 space-y-6 w-full max-w-2xl"
        style="border: 2px solid gray; backdrop-filter: blur(10px); border-radius: 20px;">
          <h1 class="font-extrabold text-4xl text-gray-200 mb-8">
            🛠️ Dashboard Operator
          </h1>
          <p class="text-center text-gray-200 py-4">
            Selamat datang di Dashboard Operator! Silakan pilih menu di bawah ini
          </p>
    
          <!-- Button Links -->
          <router-link
            to="/operator/book-equipment"
            class="block bg-blue-600 text-white text-center py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:bg-blue-800 hover:ring-4 hover:ring-blue-500 hover:ring-opacity-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            📚 Form Peminjaman Barang
          </router-link>
          <router-link
            to="/operator/all-equipment"
            class="block bg-blue-600 text-white text-center py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:bg-blue-800 hover:ring-4 hover:ring-blue-500 hover:ring-opacity-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            🛠️ Data Barang
          </router-link>
          <router-link
            to="/operator/all-borrowers"
            class="block bg-blue-600 text-white text-center py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:bg-blue-800 hover:ring-4 hover:ring-blue-500 hover:ring-opacity-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            📋 Data Peminjam Barang
          </router-link>
        </div>
      </div>
    </main>
  </template>

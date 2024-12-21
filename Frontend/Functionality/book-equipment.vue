<template>
  <main class="mt-16 mx-auto pb-24 max-w-4xl">
    <h1 class="font-extrabold text-4xl text-center text-gray-800 mb-8">
      📚 Form Peminjaman Barang
    </h1>
    <form
      @submit.prevent="submitForm"
      class="max-w-3xl rounded-2xl mx-auto bg-gray-100 p-10 shadow-2xl"
    >
      <!-- Nama Barang -->
      <div class="mb-6">
        <label for="namaBarang" class="block text-lg font-bold text-gray-700 mb-2">
          Nama Barang
        </label>
        <input
          id="namaBarang"
          type="text"
          v-model="form.namaBarang"
          placeholder="Masukkan nama barang"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <!-- Jumlah Pinjam -->
      <div class="mb-6">
        <label for="jumlahPinjam" class="block text-lg font-bold text-gray-700 mb-2">
          Jumlah Pinjam
        </label>
        <input
          id="jumlahPinjam"
          type="number"
          v-model="form.jumlahPinjam"
          placeholder="Masukkan jumlah pinjam"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <!-- Tanggal Pengembalian -->
      <div class="mb-6">
        <label for="tglKembali" class="block text-lg font-bold text-gray-700 mb-2">
          Tanggal Pengembalian
        </label>
        <input
          id="tglKembali"
          type="date"
          v-model="form.tglKembali"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <!-- Nama Peminjam -->
      <div class="mb-6">
        <label for="namaPeminjam" class="block text-lg font-bold text-gray-700 mb-2">
          Nama Peminjam
        </label>
        <input
          id="namaPeminjam"
          type="text"
          v-model="form.namaPeminjam"
          placeholder="Masukkan nama peminjam"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <!-- Nama Petugas -->
      <div class="mb-6">
        <label for="namaPetugas" class="block text-lg font-bold text-gray-700 mb-2">
          Nama Petugas
        </label>
        <input
          id="namaPetugas"
          type="text"
          v-model="form.namaPetugas"
          placeholder="Masukkan nama petugas"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:bg-blue-800 hover:scale-110 hover:ring-4 hover:ring-blue-500 hover:ring-opacity-50 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import Notiflix from "notiflix";

const form = ref({
  namaBarang: "",
  jumlahPinjam: "",
  tglKembali: "",
  namaPeminjam: "",
  namaPetugas: "",
});

const submitForm = () => {
  // Validasi Contoh
  if (
    !form.value.namaBarang ||
    !form.value.jumlahPinjam ||
    !form.value.tglKembali ||
    !form.value.namaPeminjam ||
    !form.value.namaPetugas
  ) {
    Notiflix.Notify.failure("Harap isi semua kolom!");
    return;
  }

  // Menampilkan Notifikasi Berhasil
  Notiflix.Notify.success("Form berhasil disubmit!");

  // Reset Form
  form.value = {
    namaBarang: "",
    jumlahPinjam: "",
    tglKembali: "",
    namaPeminjam: "",
    namaPetugas: "",
  };
};
</script>

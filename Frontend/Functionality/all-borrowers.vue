<template>
  <main class="mt-16 mx-auto pb-24 max-w-4xl">
    <h1 class="font-extrabold text-4xl text-center text-gray-800 mb-8">
      📋 Data Peminjam Barang
    </h1>

    <div class="flex justify-between mb-5">
      <button
        @click="toggleSortMenu"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
      >
        Sort
      </button>
      <div v-if="showSortMenu" class="absolute bg-white border rounded-lg shadow-lg mt-12 z-10">
        <div class="p-4">
          <p class="font-bold text-gray-700 mb-2">Sort By:</p>
          <ul>
            <li
              v-for="option in sortOptions"
              :key="option.key"
              class="cursor-pointer py-1 hover:bg-gray-200 transition-colors duration-200 ease-in-out rounded-lg"
              @click="setSortKey(option.key)"
            >
              <span :class="{'text-blue-500': sortKey === option.key}" class="flex items-center">

                <span v-if="sortKey === option.key" class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {{ option.label }}
              </span>
            </li>
          </ul>
          <hr class="my-2 border-gray-300" />
          <div>
            <ul class="space-y-2">
              <li
                class="cursor-pointer py-1 hover:bg-gray-200 transition-colors duration-200 ease-in-out rounded-lg"
                @click="setSortOrder('asc')"
                @mouseenter="showTooltip('Mengurutkan item dengan nilai terkecil di atas.')"
                @mouseleave="hideTooltip"
              >
                <span class="flex items-center">
                  <span
                    v-if="sortOrder === 'asc'"
                    class="w-2 h-2 bg-blue-500 rounded-full mr-2"
                  ></span>
                  Ascending
                </span>
              </li>
              <li
                class="cursor-pointer py-1 hover:bg-gray-200 transition-colors duration-200 ease-in-out rounded-lg"
                @click="setSortOrder('desc')"
                @mouseenter="showTooltip('Mengurutkan item dengan nilai terbesar di atas.')"
                @mouseleave="hideTooltip"
              >
                <span class="flex items-center">
                  <span
                    v-if="sortOrder === 'desc'"
                    class="w-2 h-2 bg-blue-500 rounded-full mr-2"
                  ></span>
                  Descending
                </span>
              </li>
            </ul>
          </div>
          <button
            @click="applySort"
            class="bg-blue-600 text-white mt-2 py-2 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:bg-blue-800 hover:scale-110 hover:ring-4 hover:ring-blue-500 hover:ring-opacity-50 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Apply
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="tooltip"
      class="absolute bg-gray-500 text-white p-2 rounded-lg text-sm mt-1 z-20 transition-opacity duration-500 opacity-0 shadow-lg"
      :class="{'opacity-100': tooltipVisible}"
    >
      {{ tooltip }}
    </div>

    <div class="bg-gray-100 p-4 rounded-2xl shadow-2xl" style="border-radius: 20px; overflow: hidden;">
      <table
        class="table-auto w-full border-collapse border border-gray-200 overflow-hidden"
        style="border-radius: 16px; overflow: hidden;">
        <thead>
          <tr class="bg-blue-100">
            <th class="border px-4 py-2 text-left text-gray-800">No</th>
            <th class="border px-4 py-2 text-left text-gray-800">Nama Barang</th>
            <th class="border px-4 py-2 text-left text-gray-800">Jumlah Pinjam</th>
            <th class="border px-4 py-2 text-left text-gray-800">Tgl. Pinjam</th>
            <th class="border px-4 py-2 text-left text-gray-800">Tgl. Kembali</th>
            <th class="border px-4 py-2 text-left text-gray-800">Peminjam</th>
            <th class="border px-4 py-2 text-left text-gray-800">Petugas</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(peminjam, index) in sortedPeminjamList"
            :key="index"
            class="hover:bg-blue-50 transition-colors"
          >
            <td class="border px-4 py-2 text-gray-700">{{ index + 1 }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.namaBarang }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.jumlahPinjam }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.tglPinjam }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.tglKembali }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.peminjam }}</td>
            <td class="border px-4 py-2 text-gray-700">{{ peminjam.petugas }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

// Data peminjam
const peminjamList = ref([
  {
    namaBarang: "Laptop",
    jumlahPinjam: 2,
    tglPinjam: "2024-12-10",
    tglKembali: "2024-12-15",
    peminjam: "John Doe",
    petugas: "Jane Smith",
  },
  {
    namaBarang: "Proyektor",
    jumlahPinjam: 1,
    tglPinjam: "2024-12-11",
    tglKembali: "2024-12-16",
    peminjam: "Alice",
    petugas: "Bob",
  },
]);

const showSortMenu = ref(false);
const sortKey = ref("");
const sortOrder = ref("asc");

// Opsi Sorting
const sortOptions = [
  { key: "namaBarang", label: "Nama Barang" },
  { key: "jumlahPinjam", label: "Jumlah Pinjam" },
  { key: "tglPinjam", label: "Tgl. Pinjam" },
  { key: "tglKembali", label: "Tgl. Kembali" },
  { key: "peminjam", label: "Peminjam" },
];

const tooltip = ref("");
const tooltipVisible = ref(false);
let tooltipTimeout;

// Fungsi untuk Membuka-Tutup Menu
const toggleSortMenu = () => {
  showSortMenu.value = !showSortMenu.value;
};

// Fungsi untuk Memilih Key Sort
const setSortKey = (key) => {
  sortKey.value = key;
};

// Fungsi untuk Memilih Order Sort
const setSortOrder = (order) => {
  sortOrder.value = order;
};

// Fungsi untuk Apply Sorting
const applySort = () => {
  showSortMenu.value = false;
};

const showTooltip = (text) => {
  tooltipTimeout = setTimeout(() => {
    tooltip.value = text;
    tooltipVisible.value = true;
  }, 800);
};

const hideTooltip = () => {
  clearTimeout(tooltipTimeout);
  tooltipVisible.value = false;
};

// Data yang Sudah Disortir
const sortedPeminjamList = computed(() => {
  if (!sortKey.value) return peminjamList.value;
  return [...peminjamList.value].sort((a, b) => {
    const order = sortOrder.value === "asc" ? 1 : -1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * order;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * order;
    return 0;
  });
});
</script>

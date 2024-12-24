<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <div class="flex-1 flex flex-col justify-center items-center pb-24"> <!-- Add Padding Bottom -->
      <div class="max-w-7xl w-full p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Operator Dashboard</h1>

        <!-- Form Peminjaman -->
        <form @submit.prevent="submitBorrow" class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-700">Form Peminjaman</h2>

          <div class="space-y-4">
            <label class="block">
              <span class="text-gray-700">Nama Barang:</span>
              <input v-model="borrowForm.item_name" type="text" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200">
            </label>

            <label class="block">
              <span class="text-gray-700">Jumlah Pinjam:</span>
              <input v-model.number="borrowForm.amount" type="number" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200">
            </label>

            <label class="block">
              <span class="text-gray-700">Nama Peminjam:</span>
              <input v-model="borrowForm.borrower_name" type="text" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200">
            </label>

            <label class="block">
              <span class="text-gray-700">Tanggal Pengembalian:</span>
              <input v-model="borrowForm.return_date" type="date" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200">
            </label>

            <button type="submit"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
              Submit
            </button>
          </div>
        </form>

        <!-- Table -->
        <div class="overflow-x-auto mt-12">
          <table class="table-fixed w-full max-w-[900px] mx-auto divide-y divide-gray-200">
            <thead class="bg-indigo-600 text-white">
              <tr>
                <th class="w-16 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                <th class="w-56 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Barang</th>
                <th class="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah</th>
                <th class="w-40 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tanggal Pinjam</th>
                <th class="w-40 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tanggal Kembali</th>
                <th class="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Peminjam</th>
                <th class="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Petugas</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in paginatedItems" :key="item._id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ item.item_name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ item.amount }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ new Date(item.borrow_date).toLocaleDateString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ new Date(item.return_date).toLocaleDateString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ item.borrower_name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ item.officer_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
            Previous
          </button>
          <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage * itemsPerPage >= borrowedItems.length"
            class="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import axios from 'axios';

export default {
  data() {
    return {
      borrowForm: {
        item_name: '',
        amount: 1,
        return_date: '',
        borrower_name: '',
        officer_name: 'Operator',
      },
      borrowedItems: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.borrowedItems.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.borrowedItems.length / this.itemsPerPage);
    },
  },
  methods: {
    async submitBorrow() {
      try {
        await axios.post('http://localhost:3000/borrow/book-equipment', this.borrowForm);
        alert('Peminjaman berhasil!');
        this.fetchBorrowedItems();
      } catch (error) {
        alert('Terjadi kesalahan saat mengirim data.');
      }
    },
    async fetchBorrowedItems() {
      try {
        const response = await axios.get('http://localhost:3000/borrow/all-equipment');
        this.borrowedItems = response.data;
      } catch (error) {
        alert('Error fetching data: ' + error.message);
      }
    },
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.borrowedItems.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    this.fetchBorrowedItems();
  },
};
</script>

<style>
/* General Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #333;
}

/* Container */
.op-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Headings */
.op-heading-primary {
  text-align: center;
  color: #444;
}

.op-heading-secondary {
  color: #555;
  margin-top: 20px;
}

/* Form Styles */
.op-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.op-form label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.op-form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60%;
}

.op-form button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.op-form button:hover {
  background-color: #0056b3;
}

/* Table Styles */
.op-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.op-table th,
.op-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.op-table thead {
  background-color: #007BFF;
  color: white;
}

.op-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.op-table tbody tr:hover {
  background-color: #f1f9ff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .op-form label {
    flex-direction: column;
    align-items: flex-start;
  }

    .op-form input {
      width: 100%;
  }

  .op-table {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  table {
    font-size: 14px;
    max-width: 900px;
  margin: 0 auto;
  }
  th, td {
    padding: 8px;
  }
}

</style>

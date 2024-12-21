<template>
  <div>
    <Navbar :user="user" />
    <div class="text-center">
      <h1>Selamat Datang di Website Peminjaman Barang P26</h1>
      <p>Please login to proceed.</p>
      <router-link to="/login">
        <button>Login</button>
      </router-link>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

const user = null;
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="flex-grow flex items-center justify-center space-x-16"> 
      <div class="flip-card" @click="flipCard('rules')">
        <div :class="['flip-card-inner', { flipped: flippedCard === 'rules' }]">
          <div class="flip-card-front bg-gradient-to-tr from-blue-200 to-blue-400 p-12 rounded-lg shadow-lg w-full max-w-2xl h-[450px] flex items-center justify-center">
            <h1 class="text-2xl font-bold text-center mb-5 text-gray-800">Ketentuan Peminjaman</h1>
          </div>
          <div class="flip-card-back bg-blue-100 p-12 rounded-lg shadow-lg w-full max-w-2xl h-[450px]"> 
            <ul class="list-disc pl-8 text-base text-left text-gray-800 font-medium">
              <li>Formulir peminjaman wajib diisi setidaknya 3 hari sebelum pemakaian dengan dokumen pendukung</li>
              <li>Jaminan berupa kartu identitas diperlukan, dan pengguna bertanggung jawab atas alat</li>
              <li>Penggunaan laboratorium maksimal 8 jam per hari sesuai jadwal</li>
              <li>Keterlambatan pengembalian dikenakan denda Rp10.000/hari</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flip-card" @click="flipCard('flow')">
        <div :class="['flip-card-inner', { flipped: flippedCard === 'flow' }]">
          <div class="flip-card-front bg-gradient-to-tr from-blue-200 to-blue-400 p-12 rounded-lg shadow-lg w-full max-w-2xl h-[450px] flex items-center justify-center">
            <h1 class="text-2xl font-bold text-center mb-5 text-gray-800">Prosedur Peminjaman</h1>
          </div>
          <div class="flip-card-back bg-blue-100 p-12 rounded-lg shadow-lg w-full max-w-2xl h-[450px]">
            <ul class="list-disc pl-8 text-base text-left text-gray-800 font-medium">
              <li><strong>Pengajuan</strong> – Isi formulir online dan unggah dokumen pendukung</li>
              <li><strong>Verifikasi</strong> – Petugas lab memeriksa dan menyetujui permohonan</li>
              <li><strong>Pengambilan</strong> – Serahkan jaminan untuk mengambil alat</li>
              <li><strong>Pengembalian</strong> – Kembalikan alat tepat waktu untuk menerima kembali jaminan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  components: { Footer },
  data() {
    return {
      flippedCard: null,
    };
  },
  methods: {
    flipCard(card) {
      this.flippedCard = this.flippedCard === card ? null : card;
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.flip-card {
  background-color: transparent;
  width: 450px;
  max-width: 500px;
  height: 300px; 
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
}

.flip-card-front {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>

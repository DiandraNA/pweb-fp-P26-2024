<template>
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="username" type="text" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <div>
          <label for="role">Role:</label>
          <select id="role" v-model="role" required>
            <option value="" disabled selected>Select Role</option>
            <option value="admin">Admin</option>
            <option value="petugas">Petugas</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  
  const dummyUsers = [
    { username: 'admin', password: '1234', role: 'admin' },
    { username: 'petugas', password: '5678', role: 'petugas' },
  ];
  
  const username = ref('');
  const password = ref('');
  const role = ref('');
  const error = ref(null);
  const router = useRouter();
  
  const handleLogin = () => {
    const user = dummyUsers.find(
      (u) => u.username === username.value && u.password === password.value && u.role === role.value
    );
  
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      router.push('/');
    } else {
      error.value = 'Invalid credentials. Please try again.';
    }
  };
  </script>

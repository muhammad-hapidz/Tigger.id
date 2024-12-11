<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
// import NewsEvent from './components/NewsEvent.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar/>
  <RouterView />
  <!-- <NewsEvent/> -->
  <Footer />
</template>

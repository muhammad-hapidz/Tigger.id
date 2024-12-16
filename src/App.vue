<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
// import NewsEvent from './components/NewsEvent.vue'
import Footer from '@/components/Footer.vue'
import ToTop from './components/ToTop.vue';
</script>

<template>
  <Navbar/>
  <RouterView />
  
  <!-- <NewsEvent/> -->
   <ToTop/>
  <Footer />
</template>

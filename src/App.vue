<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue';
// import NewsEvent from './components/NewsEvent.vue'
import Footer from '@/components/Footer.vue'
// import ToTop from './components/ToTop.vue';

const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`,
)
</script>

<template>
  <component :is="layout">
    <Navbar v-if="$route.meta.showNavbar" />
    <RouterView />
    <Footer v-if="$route.meta.showFooter" />
    <!-- <ToTop /> -->
  </component>
</template>
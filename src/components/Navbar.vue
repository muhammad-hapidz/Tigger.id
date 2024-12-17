<template>
    <header class="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div class="container mx-auto flex items-center justify-between px-4 py-3">
        <!-- Logo -->
        <div class="text-2xl font-bold text-gray-800">
          <a href="#">TIGGER.ID</a>
        </div>
  
        <!-- Hamburger Menu -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden flex flex-col justify-center items-center focus:outline-none"
        >
          <span
            class="hamburger-line"
            :class="{'rotate-45 translate-y-1.5': isMenuOpen}"
          ></span>
          <span
            class="hamburger-line"
            :class="{'opacity-0': isMenuOpen}"
          ></span>
          <span
            class="hamburger-line"
            :class="{'-rotate-45 -translate-y-1.5': isMenuOpen}"
          ></span>
        </button>
  
        <!-- Navbar Menu -->
        <nav
          :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}"
          class="absolute top-full left-0 w-full bg-white lg:bg-transparent shadow-lg lg:shadow-none lg:static lg:block lg:w-auto"
        >
          <ul class="flex flex-col lg:flex-row lg:space-x-6 px-4 lg:px-0">
            <li>
              <RouterLink
                to="/"
                class="block text-gray-800 hover:text-blue-500 py-2"
              >Home</RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="block text-gray-800 hover:text-blue-500 py-2"
              >About Us</RouterLink>
            </li>
            <li>
              <RouterLink
                to="/news-and-event"
                class="block text-gray-800 hover:text-blue-500 py-2"
              >News & Event</RouterLink>
            </li>
            <li>
              <RouterLink
                to="/article"
                class="block text-gray-800 hover:text-blue-500 py-2"
              >Article</RouterLink>
            </li>
            <li>
              <RouterLink
                to="/tips-and-trick"
                class="block text-gray-800 hover:text-blue-500 py-2"
              >Tips & Trick</RouterLink>
            </li>
            <li>
              <RouterLink
                to="/join-us"
                class="block text-gray-800 hover:text-blue-500 py-2"
              >Join Us</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </template>

<script setup>
import { ref } from "vue";

// State untuk mengontrol menu terbuka/tutup
const isMenuOpen = ref(false);
</script>
  
<style scoped>
/* Hamburger menu lines */
/* Hamburger menu lines */
.hamburger-line {
  @apply w-6 h-[2px] bg-gray-800 my-[3px] transition-all duration-300 ease-in-out;
}

/* Transformasi saat menu aktif */
.hamburger-line.rotate-45 {
  transform: rotate(45deg) translateY(11px);
}

.hamburger-line.-rotate-45 {
  transform: rotate(-45deg) translateY(-12px);
}

.hamburger-line.opacity-0 {
  opacity: 0;
}

</style>
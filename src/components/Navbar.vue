<template>
  <header class="bg-primary h-[70px] fixed top-0 left-0 w-full z-50 shadow-md">
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo -->
      <div>
        <a href="/">
          <img src="../assets/img/3alogo.png" alt="3a Logo">
        </a>
      </div>

      <!-- Hamburger Menu -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="lg:hidden flex flex-col justify-center items-center focus:outline-none text-white">
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
        class="absolute top-full left-0 w-full  lg:bg-transparent shadow-lg lg:shadow-none lg:static lg:block lg:w-auto bg-primary"
      >
        <ul class="flex flex-col lg:flex-row lg:space-x-6 px-4 lg:px-0">
          <li>
            <RouterLink
              to="/"
              :class="getNavClass('/')"
              @click="scrollToTop"
              class="block text-slate-900 hover:text-button py-2"
            >Home</RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              @click="scrollToTop"
              :class="getNavClass('/about')"
              class="block text-slate-900 hover:text-button py-2"
            >About Us</RouterLink>
          </li>
          <li>
            <RouterLink
              to="/portofolio"
              @click="scrollToTop"
              :class="getNavClass('/portofolio')"
              class="block text-slate-900 hover:text-button py-2"
            >Portofolio</RouterLink>
          </li>
          <!-- <li>
            <RouterLink
              to="/article"
              @click="scrollToTop"
              :class="getNavClass('/article')"
              class="block text-slate-900 hover:text-button py-2"
            >Article</RouterLink>
          </li>
           -->
          <li>
            <RouterLink
              to="/contact-us"
              @click="scrollToTop"
              :class="getNavClass('/contact-us')"
              class="block text-slate-900 hover:text-button py-2"
            >Contact Us</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

// State untuk mengontrol menu terbuka/tutup
const isMenuOpen = ref(false);

// Ambil informasi rute saat ini
const route = useRoute();

// Fungsi untuk menentukan kelas navigasi aktif
const getNavClass = (path) => {
  return route.path === path ? "text-button font-semibold" : "";
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped>
/* Hamburger menu lines */
.hamburger-line {
  @apply w-6 h-[2px] bg-gray-200 my-[3px] transition-all duration-300 ease-in-out;
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

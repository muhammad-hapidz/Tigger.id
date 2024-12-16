<template>
    <div>
        <!-- Tombol "Back to Top" -->
        <!-- <a
            id="to-top"
            href=""
            class="hidden justify-center items-center fixed z-50 bottom-4 right-4 h-12 w-12 bg-primary rounded-full">
            <span class="block h-4 w-4 rotate-45 border-t-2 border-l-2 mt-2"></span>
        </a> -->

        <!-- Header -->
        <header
            class="bg-transparent absolute top-0 left-0 w-full flex items-center z-10 justify-evenly dark:bg-dark">
            <div class="container">
                <div class="flex items-center justify-between relative">
                    <!-- Logo -->
                    <div class="px-4 flex">
                        <!-- <img src="../assets/img/logotigger.png" width="50" height="5px" alt=""> -->
                        <a href="/" class="font-bold tracking-wider text-2xl text-slate-950 block py-6">TIGGER.ID</a>
                    </div>

                    <!-- Elemen Kanan -->
                    <div class="flex items-center">
                        <!-- Tombol Hamburger -->
                        <button
                            id="hamburger"
                            type="button"
                            class="block absolute right-4 lg:hidden z-[10000] bg-blue-500">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>


                        <!-- Navbar -->
                        <nav
                            id="nav-menu"
                            class="hidden py-5 shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:max-w-full lg:bg-transparent lg:shadow-none lg:rounded-none lg:dark:bg-transparent dark:bg-dark dark:shadow-slate-500 fixed">
                            <ul class="block lg:flex">
                                <li class="group">
                                    <RouterLink to="/" class="text-lg font-semibold text-slate-500 py-2 mx-8 flex group-hover:text-slate-400 lg:mx-4">Home</RouterLink>
                                </li>
                                <li class="group">
                                    <RouterLink to="/about" class="text-lg font-semibold text-slate-500 py-2 mx-8 flex group-hover:text-slate-400 lg:mx-4">About Us</RouterLink>
                                </li>
                                <li class="group">
                                    <RouterLink to="/news-and-event" class="text-lg font-semibold text-slate-500 py-2 mx-8 flex group-hover:text-slate-400 lg:mx-4">News & Event</RouterLink>
                                </li>
                                <li class="group">
                                    <RouterLink to="/article" class="text-lg font-semibold text-slate-500 py-2 mx-8 flex group-hover:text-slate-400 lg:mx-4">Article</RouterLink>
                                </li>
                                <li class="group">
                                    <RouterLink to="/tips-and-trick" class="text-lg font-semibold text-slate-500 py-2 mx-8 flex group-hover:text-slate-400 lg:mx-4">Tips & Trick</RouterLink>
                                </li>
                                <li class="group">
                                    <RouterLink to="/join-us" class="text-lg font-semibold text-slate-500 py-2 mx-8 flex group-hover:text-slate-400 lg:mx-4">Join Us</RouterLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script setup>
// import { onMounted, onUnmounted } from 'vue';

// onMounted(() => {
//     const handleScroll = () => {
//         const header = document.querySelector('header');
//         const toTop = document.querySelector('#to-top');

//         if (header) {
//             const fixedNav = header.offsetTop;

//             if (window.pageYOffset > fixedNav) {
//                 header.classList.add('navbar-fixed');
//                 if (toTop) {
//                     toTop.classList.remove('hidden');
//                     toTop.classList.add('flex');
//                 }
//             } else {
//                 header.classList.remove('navbar-fixed');
//                 if (toTop) {
//                     toTop.classList.remove('flex');
//                     toTop.classList.add('hidden');
//                 }
//             }
//         }
//     };

//     // Tambahkan event listener untuk scroll
//     window.addEventListener('scroll', handleScroll);

//     // Hapus event listener saat komponen dilepas
//     onUnmounted(() => {
//         window.removeEventListener('scroll', handleScroll);
//     });

//     const hamburger = document.querySelector('#hamburger');
//   if (!hamburger) {
//     console.error('Hamburger button not found!');
//   }

// });
</script>



<style scoped>
.hamburger-line {
  @apply w-[30px] h-[2px] my-[6px] bg-gray-900 transition-all duration-300 ease-in-out;
}

.hamburger-active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-active span:nth-child(2) {
    opacity: 0;
}

.hamburger-active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}
</style>


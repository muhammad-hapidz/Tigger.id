<template>
  <div class="mt-32">
    <CardNewsEvent :newsAndEvents="newsAndEvents" />
  </div>
  <div class="my-8 border-t border-gray-300"></div>
  
  <div class="m-32 flex flex-wrap justify-center gap-5">
    <iframe
      width="560"
      class="rounded-md"
      height="315"
      src="https://www.youtube.com/embed/heZ_f6_9FV0?si=CVDe05g0tGr20HK3"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    <iframe
      width="560"
      class="rounded-md"
      height="315"
      src="https://www.youtube.com/embed/mZj37lmOhZQ?si=AKhni1IIMvfV9EzE"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    
    <iframe
      width="560"
      class="rounded-md"
      height="315"
      src="https://www.youtube.com/embed/Cq9IRCKqPnA?si=YDT-u22PXhXZ90Hw"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import CardNewsEvent from '@/components/CardNewsEvent.vue';
import axios from 'axios';

export default {
  components: {
    CardNewsEvent,
  },
  data() {
    return {
      newsAndEvents: [], // Menyimpan data dari API
    };
  },
  mounted() {
    this.fetchNewsAndEvents(); // Memanggil API saat komponen dimuat
  },
  methods: {
    async fetchNewsAndEvents() {
      try {
        const response = await axios.get(
          'https://apitiggerid.tri3a.com/api/NewsAndEvent/latest'
        );
        this.newsAndEvents = response.data; // Menyimpan data dari API ke dalam newsAndEvents
      } catch (error) {
        console.error('Error fetching news and events:', error);
      }
    },
  },
};
</script>

<template>
    <div class="container mx-auto p-6">
      <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <p class="text-center text-blue-500 text-xl font-semibold animate-pulse">
          Memuat Data ....
        </p>
      </div>
  
      <div v-else-if="detailCategory" class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Detail Kategori
        </h1>
        <ul class="space-y-4">
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Menu:</span>
            <span class="text-gray-800">{{ detailCategory.segment.segmentName }}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Category Name:</span>
            <span class="text-gray-800">{{ detailCategory.category.categoryName }}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Created By:</span>
            <span class="text-gray-800">{{ detailCategory.createdBy }}</span>
          </li>
          <li class="flex">
            <span class="font-semibold text-gray-600 w-40">Created Date:</span>
            <span class="text-gray-800">{{ formatDate (detailCategory.createdDate) }}</span>
          </li>
        </ul>
        <div class="pt-16 flex justify-end">
         <RouterLink to="" class="px-3 py-2 bg-blue-500 rounded-md text-white hover:opacity-80">
            Edit
            </RouterLink>
        </div>  
    </div>
  
      <div v-else class="flex justify-center items-center min-h-screen">
        <p class="text-center text-red-500 text-xl font-semibold">
          Gagal memuat data. Silakan coba lagi nanti.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJBZG1pbmlzdHJhdG9yQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIyYjdhOTgzOS1jN2E4LTQ1YTUtOTMzNy0yNzgwZDQ5NWU2M2QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiZXhwIjoxNzM3NDY0MjExLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNDIvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTQyLyJ9.62vyBOeneTUhpBAs6HMct9HgGEZ0RVwczbvwaWhbUWc";
  
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        detailCategory: null,
        isLoading: true,
      };
    },
    mounted() {
      this.fetchdetailCategory();
    },
    methods: {
      async fetchdetailCategory() {
        try {
          const response = await axios.get(
            `https://apitiggerid.tri3a.com/api/SegmentCategory/cms/${this.id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          this.detailCategory = response.data;
          console.log(this.detailCategory);
        } catch (error) {
          console.error("Error Fetching Data Detail Category:", error);
          this.detailCategory = null;
        } finally {
          this.isLoading = false;
        }
      },
      formatDate(dateString){
        if(!dateString) return "Unknown Date"
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year:"numeric",
            month:"long",
            day:"numeric"
        }).format(date);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan animasi atau gaya tambahan jika diperlukan */
  </style>
  
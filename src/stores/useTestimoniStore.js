import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useTestimoniStore = defineStore ("testimoni", () =>{
    const testimonis = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchTestimonis = async () =>{
        loading.value = true;
        error.value = null;
        try{
            const response = await axios.get("https://apiweb3a.tri3a.com/api/Contents/BySegmentArticle");
            testimonis.value = response.data;
        }catch(err){
            error.value = "Gagal Mengambil Data Testimoni";
        }finally{
            loading.value = false;
        }
    }
    return{
        testimonis,
        loading,
        error,
        fetchTestimonis
    };
})
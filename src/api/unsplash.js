import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  },
});

export default unsplashApi;

export const fetchPhotos= async (query='fashion',total_pages=20) => {
    console.log(import.meta.env.VITE_UNSPLASH_ACCESS_KEY)
  try {
    const response = await unsplashApi.get("/search/photos", {
      params: {
        query,
        
        total_pages
      },
      
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

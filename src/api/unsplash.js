import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  },
});

export default unsplashApi;

export const fetchPhotos= async (query='fashion', page) => {
    console.log(import.meta.env.VITE_UNSPLASH_ACCESS_KEY)
  try {
    const response = await unsplashApi.get("/search/photos", {
      params: {
        query,
        page,
       
      },
      
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

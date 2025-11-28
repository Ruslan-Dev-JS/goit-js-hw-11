import axios from "axios";


// ПОМІТКА: постав свій ключ тут або підключай через змінні оточення
const PIXABAY_API_KEY = "53445349-55a99b0310e27289c38888bf9"; // <-- заміни на свій ключ
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query) {
 
  const params = {
    key: PIXABAY_API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 50,
  };

  const response = await axios.get(BASE_URL, { params });

  return response.data;
}

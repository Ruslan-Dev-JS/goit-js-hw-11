import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";

const form = document.getElementById("search-form");
const input = form.elements["search-text"];


form.addEventListener("submit", onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();


  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query",
      timeout: 3000,
    });
    return;
  }
  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then((data) => {
      if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
        iziToast.info({
          title: "No results",
          message: "Sorry, there are no images matching your search query. Please try again!",
          timeout: 4000,
        });
        return;
      }

      
      createGallery(data.hits);

      iziToast.success({
        title: "Success",
        message: `Found ${data.totalHits} images`,
        timeout: 2500,
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
      iziToast.error({
        title: "Error",
        message: "Something went wrong while fetching images.",
        timeout: 3000,
      });
    })
    .finally(() => {
    
      hideLoader();
    });

  
   form.reset();
}

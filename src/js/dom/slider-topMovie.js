import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/swiper.scss';

const topMovieEll = document.querySelector('.swiper-wrapper');
const API_KEY = 'e57746b2e4fe98cb5cc839cb405a15f1';
const BASE_URL = 'https://api.themoviedb.org/3';

renderTopFilms();
async function renderTopFilms() {
  const data = await getTopFilms();
  renderGallery(data.results);
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay: {
      delay: 2000,
    },
  });
}
async function getTopFilms() {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.error('getTopFilms error' + error);
  }
}
function renderGallery(data) {
  let markup = '';
  for (let i = 0; i <= 15; i += 5) {
    markup += '<div  class="topMovieGallery_slide swiper-slide">';
    for (let j = 0 + i; j <= i + 4; j += 1) {
      markup += `<div class="topMovie_container">
                  <img class="topMovie_img"  src= "https://image.tmdb.org/t/p/original${
                    data[j].poster_path
                  }" alt="${data[j].original_title}" loading="lazy">
            
            <div class="topMovie_description movie__description">
                <p class="topMovie_title movie__title">${
                  data[j].original_title
                }</p>
                 <p class="topMovie_date">${data[j].release_date.slice(
                   0,
                   4
                 )}</p>
                 <p class="topMovie_vote movie__rate">${
                   data[j].vote_average
                 }</p>
            </div></div>`;
    }
    markup += '</div>';
    console.log('markup' + markup);
  }

  topMovieEll.insertAdjacentHTML('beforeend', markup);
}

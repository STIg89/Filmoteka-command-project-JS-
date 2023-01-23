import { refs } from './refs';
const { moviesOnInputList } = refs;
import { activeMovieModal } from './movieModal';
import { getGenres } from '../api/fetchAPI';
import myImageUrl from '../../images/sorry.png';
import sprite from '../../images/sprite.svg';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const noPosterImg = myImageUrl;

export async function renderGallery(data) {
  const genres = await getGenres().then(({ genres }) => {
    if (data) {
      data.forEach(movie => {
        const { genre_ids, release_date } = movie;
        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1, 'Other');
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          movie.genre_names = genre_ids.join(', ');
          if (movie.release_date) {
            movie.release_date = release_date.slice(0, 4);
          }
        });
      });
    }
  });

  const markupGallery = data
    .map(
      ({
        original_title,
        poster_path,
        id,
        genre_names,
        release_date,
        vote_average,
      }) => {
        return `<li class="movie__item" data-id="${id}">
                <div class="movie__container">
                <img class="movie__img"  src= "${
                  poster_path === null
                    ? noPosterImg
                    : BASE_IMG_URL + poster_path
                }" alt="${original_title}" loading="lazy">
        </div>
                <div class="movie__description">
                  <p class="movie__title">${original_title}</p>
                  <div class="movie__meta">
                    <p class="movie__genres">${genre_names} | ${release_date}</p>
                    <span class='movie__rate'>${vote_average.toFixed(
                      1
                    )}</span>                    
                  </div>
                </div>
            </li>`;
      }
    )
    .join('');
  moviesOnInputList.innerHTML = markupGallery;
  activeMovieModal();
}

export function renderLibraryGallery(data) {
  const markupGallery = data
    .map(
      ({
        original_title,
        poster_path,
        id,
        genre_names,
        release_date,
        vote_average,
      }) => {
        return `<li class="movie__item" data-id="${id}">
                <div class="movie__container">
                <img class="movie__img"  src= "${
                  poster_path === null
                    ? noPosterImg
                    : BASE_IMG_URL + poster_path
                }" alt="${original_title}" loading="lazy">
        </div>
                <div class="movie__description">
                  <p class="movie__title">${original_title}</p>
                  <div class="movie__meta">
                    <p class="movie__genres">${genre_names} | ${release_date}</p>
                    <span class='movie__rate'>${vote_average.toFixed(
                      1
                    )}</span>                    
                  </div>
                </div>
            </li>`;
      }
    )
    .join('');
  if (!markupGallery[0]) {
    const main = document.querySelector('main');
    const svgImage = `<svg width='750' height='500'><use href='${sprite}#nothing-here-space'></use></svg>`;
    main.innerHTML = svgImage;
    main.style.margin = '0';
    main.style.margin = '0';
    main.style.padding = '0';
    main.style.padding = '0';
    const message =
      "<p class='movie-detail__title'>Oops, there are no movies in here!</p>";
    main.insertAdjacentHTML('beforeend', message);
    const messageElem = main.querySelector('p');
    main.style.display = 'flex';
    main.style.color = 'inherit';
    main.style.justifyContent = 'center';
    main.style.flexDirection = 'column';
    main.style.alignItems = 'center';
    messageElem.style.marginTop = '20px';
  } else {
    moviesOnInputList.innerHTML = markupGallery;
    activeMovieModal();
  }
}

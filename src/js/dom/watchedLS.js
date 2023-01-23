import { getMovieDetails } from '../api/fetchAPI';
import { renderLibraryGallery } from '../dom/renderMovies';
import { refs } from './refs';
import { checkForLoginState } from './checkForLoginState-lib';
import sprite from '../../images/sprite.svg';

const keyWatchedLS = 'arrayWatched';
//Перевіряємо є чи є в нас сховище з таким ключем і якщо немає створюємо
let arrayWatched = JSON.parse(localStorage.getItem(keyWatchedLS));
if (arrayWatched === null) {
  arrayWatched = [];
  localStorage.setItem(keyWatchedLS, JSON.stringify(arrayWatched));
}
function addListenerAddWatched() {
  refs.watchedAddBtn = document.querySelector('#add-watched-btn');
  refs.watchedAddBtn.addEventListener('click', OnAddWatchedClick);
}

async function OnAddWatchedClick(event) {
  event.preventDefault();
  if (localStorage.getItem('uid') && localStorage.getItem('username')) {
    let movieID = Number(refs.modalMovieContent.getAttribute('data-id'));
    //--

    let indexID = arrayWatched.findIndex(x => x.id === movieID);

    if (indexID < 0) {
      const movieDetails = await getMovieDetails(movieID);

      //Вибираємо з масиву обєктів тільки імена жанрів
      let genre_names = movieDetails.genres.map(x => (x = x.name));
      // якщо жанрів більше ніж обрізаємо їх залишаючи лише три замінючи третій словом Other
      if (genre_names.length > 3) {
        genre_names.splice(2, genre_names.length - 1, 'Other');
      }
      genre_names = genre_names.join(', ');
      //З дати беремо лише рік
      let release_date = '';
      if (movieDetails.release_date) {
        release_date = movieDetails.release_date.slice(0, 4);
      }

      let movieOb = {
        id: movieDetails.id,
        backdrop_path: movieDetails.backdrop_path,
        genre_names: genre_names,
        poster_path: movieDetails.poster_path,
        release_date: release_date,
        original_title: movieDetails.original_title,
        vote_average: movieDetails.vote_average,
      };

      arrayWatched.push(movieOb);
      localStorage.setItem(keyWatchedLS, JSON.stringify(arrayWatched));
    } else {
      arrayWatched.splice(indexID, 1);

      localStorage.setItem(keyWatchedLS, JSON.stringify(arrayWatched));
    }
    checkStatusBTN(movieID);
  } else {
    checkForLoginState();
  }
}
///Перевіряє чи є такий фільм в local storage і якщо є то змінює кнопку на Remove
function checkStatusBTN(movieID) {
  // let arrayWatched = JSON.parse(localStorage.getItem(keyWatchedLS));
  let indexID = arrayWatched.findIndex(x => x.id === movieID);
  if (localStorage.getItem('uid') && localStorage.getItem('username')) {
    if (indexID < 0) {
      refs.watchedAddBtn.textContent = 'Add to watched';
      refs.watchedAddBtn.dataset.action = 'add';
      return;
    }
    refs.watchedAddBtn.textContent = 'Remove from watched';
    refs.watchedAddBtn.dataset.action = 'remove';
  } else {
    refs.watchedAddBtn.textContent = 'Add to watched';
    refs.watchedAddBtn.dataset.action = 'add';
  }
}

/// watched
// refs.watchedGallery = false;

const watchedBtn = document.querySelector('.library__button--watched');
if (watchedBtn !== null) {
  watchedBtn.addEventListener('click', onClickWatched);
  watchedBtn.classList.add('activeLS');
  renderWatched();
}

function onClickWatched(event) {
  if (localStorage.getItem('uid') && localStorage.getItem('username')) {
    document.querySelector('.queue-btn').classList.remove('activeLS');
    event.currentTarget.classList.add('activeLS');
    //refs.watchedGallery = true;
    renderWatched();
  } else {
    checkForLoginState();
  }
}
// ренедрить фільми з сховища
function renderWatched() {
  if (localStorage.getItem('uid') && localStorage.getItem('username')) {
    if (watchedBtn && watchedBtn.classList.contains('activeLS')) {
      refs.moviesOnInputList.innerHTML = '';
      renderLibraryGallery(arrayWatched);
    }
  } else {
    const main = document.querySelector('main');
    const svgImage = `<svg width='750' height='500'><use href='${sprite}#nothing-here-space'></use></svg>`;
    main.insertAdjacentHTML('beforeend', svgImage);
    const image = main.querySelector('svg');
    const list = document.querySelector('ul.movie__gallery');
    main.style.margin = '0';
    list.style.margin = '0';
    list.style.padding = '0';
    main.style.padding = '0';
    // main.style.backgroundOrigin = 'content-box';
    const message =
      "<p class='movie-detail__title'>Oops, there are no movies in here!</p>";
    main.insertAdjacentHTML('beforeend', message);
    const messageElem = main.querySelector('p');
    main.style.display = 'flex';
    main.style.justifyContent = 'center';
    main.style.flexDirection = 'column';
    main.style.alignItems = 'center';
    messageElem.style.marginTop = '20px';
    // body.style.backgroundPosition = center;
    return;
  }
}

export {
  // додає слухача події на кнопку add watched на модалці
  addListenerAddWatched,
  // ренедрить фільми з сховища
  renderWatched,
  // переіряє чи фільм в сховищі і змінює текст кнопки
  checkStatusBTN,
};

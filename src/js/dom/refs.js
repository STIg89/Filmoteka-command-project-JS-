export const refs = {
  moviesOnInputList: document.querySelector('.movie__gallery'),
  inputEl: document.querySelector('.search-form'),
  pagePreloader: document.getElementById('page-preloader'),
  headerUserNoLoginContainer: document.getElementById('div-sign-up'),
  headerLoginBtn: document.querySelector('[login-data-modal-open]'),
  headerSignupBtn: document.querySelector('[signup-data-modal-open]'),
  headerUserLogedinContainer: document.getElementById('div-sign-out'),
  headerUserEmailDiv: document.getElementById('header-useremail-div'),
  headerSignoutBtn: document.querySelector('[signout-data-modal-open]'),
  loginModal: document.querySelector('[login-data-modal]'),
  loginForm: document.getElementById('login-form'),
  divLoginEmailError: document.getElementById('loginemail-error-message'),
  divLoginPassError: document.getElementById('loginpassword-error-message'),
  signupModal: document.querySelector('[signup-data-modal]'),
  signupForm: document.getElementById('signup-form'),
  divSignUpError: document.getElementById('signup-error-message'),
  signupBtn: document.querySelector('.signup-modal__button'),
  signupBtnOnLoginModal: document.querySelector('.login-modal__button--signup'),
  policyCheckbox: document.querySelector('[name="policy-checkbox"]'),
  signoutModal: document.querySelector('[signout-data-modal]'),
  topMovieEll: document.querySelector('.swiper-wrapper'),
  scrollUp: document.querySelector('.up-btn__wrapper'),
  scrollUpSvgPath: document.querySelector('.up-btn__svg-path'),
  watchedAddBtn: '',
  watchedBtn: document.querySelector('#watched-btn'),
  modalMovieContent: document.querySelector('.modal-movie__content'),
};

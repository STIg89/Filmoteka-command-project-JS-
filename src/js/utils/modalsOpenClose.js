const refs = {
  closeModalBtn: document.querySelector('[login-data-modal-close]'),
  modalLogIn: document.querySelector('[login-data-modal]'),
};

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.modalLogIn.addEventListener("click", onBackdropClick);
window.addEventListener("keydown", onEscKeyPress);

function onCloseModal() {
  refs.modalLogIn.classList.toggle('is-hidden');
  window.removeEventListener("keydown", onEscKeyPress);
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    onCloseModal();
  }
}

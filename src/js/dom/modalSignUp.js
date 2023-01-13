import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../api/firebase-config.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { showSignUpError } from './showErrors.js';
import { showSuccessModal, onCloseModal } from './showSuccess.js';

const signUpFormRef = document.getElementById('signup-form');
const signUpBtnRef = document.querySelector('.signup-modal__button');
const policyCheckboxRef = document.querySelector('[name="policy-checkbox"]');
const signUpModalRef = document.querySelector('[signup-data-modal]');

async function createAccount(event) {
  event.preventDefault();
  const email = event.currentTarget.elements.useremail.value;
  const password = event.currentTarget.elements.userpassword.value;
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    signUpModalRef.classList.toggle('is-hidden');
    const delay = setTimeout(showSuccessModal(user.email), 500);
    signUpFormRef.removeEventListener('submit', createAccount);
    policyCheckboxRef.removeEventListener('click', toggleBtnProperty);
    clearTimeout(delay);
  } catch (error) {
    showSignUpError(error);
  }
}

signUpFormRef.addEventListener('submit', createAccount);

policyCheckboxRef.addEventListener('click', toggleBtnProperty);

function toggleBtnProperty(evt) {
  if (evt.target.checked) {
    signUpBtnRef.disabled = false;
  } else {
    signUpBtnRef.disabled = true;
  }
}
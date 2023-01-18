addEventListener('DOMContentLoaded', () => {
  changeYear();
  load();
  handleLogin();
  handleForgotPassword();
  handleRegister();
});

function changeYear() {
  const year = new Date().getFullYear();
  const elements = document.querySelectorAll('.year');
  elements.forEach(e => {
    e.textContent = year;
  });
}

function load() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('overflow-hidden');
  const queue = new createjs.LoadQueue(true);
  queue.loadManifest([
    'assets/images/icons/loading.gif',
    'assets/images/landing/background_desktop.jpg',
    'assets/images/landing/background_mobile.jpg',
    'assets/images/landing/carousel_1.png',
    'assets/images/landing/carousel_2.png',
    'assets/images/landing/carousel_3.png',
    'assets/images/landing/ribbon.png',
    'assets/images/landing/chest.png',
    'assets/images/landing/discord.png',
    'assets/images/landing/download_android_en.png',
    'assets/images/landing/download_android_pt.png',
    'assets/images/landing/facebook.png',
    'assets/images/landing/background_about.jpg',
    'assets/images/landing/charles_studio.png',
    'assets/images/logo/logo.png',
    'assets/images/app_logo.png',
    'assets/images/favicon.png',
    'assets/images/icons/credits_default.png',
    'assets/images/icons/news_default_2.png',
  ]);
  queue.addEventListener('complete', handleComplete);
}

function handleComplete() {
  const body = document.getElementsByTagName('body')[0];
  document.getElementById('loader').style.display = 'none';
  body.classList.remove('overflow-hidden');
}

const instance = axios.create({
  baseURL: API_URL,
});

function handleLogin() {
  const logged = localStorage.getItem('logged');
  if (logged === 'true') {
    redirectToGame();
  }
  if (
    localStorage.getItem('emailLogin') &&
    localStorage.getItem('passwordLogin')
  ) {
    document.getElementById('email').value = localStorage.getItem('emailLogin');
    document.getElementById('password').value =
      localStorage.getItem('passwordLogin');
  }
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    loading();
    instance
      .post('/user/login', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      })
      .then(response => {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('logged', true);
        localStorage.setItem(
          'emailLogin',
          document.getElementById('email').value
        );
        localStorage.setItem(
          'passwordLogin',
          document.getElementById('password').value
        );
        redirectToGame();
      })
      .catch(error => {
        hideLoading();
        if (error.response) {
          toast(error.response.data.message, 'error');
          return;
        }
        toast(error.message, 'error');
      })
      .finally(() => {});
  });
}

function handleForgotPassword() {
  document
    .getElementById('forgotPasswordForm')
    .addEventListener('submit', e => {
      e.preventDefault();
      toast('Em breve');
    });
}

function handleRegister() {
  document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    loading();
    instance
      .post('/user', {
        email: document.getElementById('emailRegister').value,
        password: document.getElementById('passwordRegister').value,
        passwordConfirmation: document.getElementById(
          'passwordConfirmationRegister'
        ).value,
      })
      .then(() => {
        document.getElementById('email').value =
          document.getElementById('emailRegister').value;
        document.getElementById('password').value =
          document.getElementById('passwordRegister').value;
        document.getElementById('login').click();
      })
      .catch(error => {
        hideLoading();
        if (error.response) {
          toast(error.response.data.message, 'error');
          return;
        }
        toast(error.message, 'error');
      })
      .finally(() => {});
  });
}

function redirectToGame() {
  window.location.href = 'game.html';
}

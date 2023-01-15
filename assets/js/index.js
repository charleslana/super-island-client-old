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

function handleLogin() {
  const logged = localStorage.getItem('logged');
  if (logged === 'true') {
    redirectToGame();
  }
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    loading();
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      localStorage.setItem('logged', true);
      redirectToGame();
    }, 1000);
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
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      hideLoading();
    }, 1000);
  });
}

function redirectToGame() {
  window.location.href = 'game.html';
}

function loading() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('overflow-hidden');
  document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.remove('overflow-hidden');
  document.getElementById('loading').style.display = 'none';
}

function toast(message, type = 'default') {
  const toastEl = document.getElementById('toast');
  toastEl.classList.remove('toast-error', 'toast-success');
  if (type === 'error') {
    toastEl.classList.add('toast-error');
  }
  if (type === 'success') {
    toastEl.classList.add('toast-success');
  }
  document.getElementById('toast-text').textContent = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
  toastBootstrap.show();
  document.getElementById('toastClose').addEventListener('click', () => {
    btnClose();
  });
}

function hideToast() {
  const myToastEl = document.getElementById('toast');
  const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
  myToast.hide();
}

function handleError(error) {
  if (error.response) {
    if (error.response.data.validation) {
      toast(error.response.data.validation.body.message);
      return;
    }
    toast(error.response.data.message, 'error');
    return;
  }
  toast(error.message, 'error');
}

const API_URL = 'https://super-island-server.onrender.com'; //http://192.168.0.102:5000 | https://super-island-server.onrender.com

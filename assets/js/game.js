// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   e.returnValue = '';
// });

addEventListener('DOMContentLoaded', async () => {
  load();
  // document.getElementById('loader').style.display = 'none';
  checkLogged();
  draggable();
  tooltip();
  feedNewsBox();
  chestAFK();
  checkInternet();
  settings();
  floatMenu();
  await getHome();
  footerMenu();
  questToggle();
  menuLeftToggle();
});

function load() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('overflow-hidden');
  const queue = new createjs.LoadQueue(true);
  queue.loadManifest([
    'assets/images/favicon.png',
    'assets/images/icons/loading.gif',
    'assets/images/icons/button_close.png',
    'assets/images/icons/vip.png',
    'assets/images/icons/meat.png',
    'assets/images/icons/belly.png',
    'assets/images/icons/gem.png',
    'assets/images/icons/plus.png',
    'assets/images/icons/news_feed.png',
    'assets/images/icons/exp.png',
    'assets/images/icons/quest_progress.png',
    'assets/images/icons/quest_complete.png',
    'assets/images/avatars/01.png',
    'assets/images/background/home.png',
    'assets/images/footer/home.png',
    'assets/images/footer/crew.png',
    'assets/images/footer/menu.png',
    'assets/images/boats/01.gif',
    // 'assets/images/boats/02.gif',
    // 'assets/images/boats/03.gif',
    // 'assets/images/boats/04.gif',
    // 'assets/images/boats/05.gif',
    // 'assets/images/boats/06.gif',
    // 'assets/images/boats/07.gif',
    // 'assets/images/boats/08.gif',
    // 'assets/images/boats/09.gif',
    // 'assets/images/boats/10.gif',
    // 'assets/images/boats/11.gif',
    // 'assets/images/boats/12.gif',
    // 'assets/images/boats/13.gif',
    'assets/images/menu/reward_bg.png',
    'assets/images/menu/menu.png',
    'assets/images/npc/01.png',
    'assets/images/left-menu/menu.png',
    'assets/images/icons/settings/option_gathering.png',
    'assets/images/icons/settings/option_eggs.png',
    'assets/images/icons/settings/option_raid.png',
    'assets/images/icons/settings/option_pm.png',
    'assets/images/icons/settings/option_friends.png',
    'assets/images/icons/settings/option_expedition.png',
    'assets/images/icons/settings/option_auto_sleep.png',
    'assets/images/icons/settings/option_auto_repeat.png',
    'assets/images/icons/settings/option_party.png',
    'assets/images/icons/settings/option_global.png',
    'assets/images/icons/settings/option_sound.png',
    'assets/images/icons/settings/option_language.png',
  ]);
  //sound
  createjs.Sound.alternateExtensions = ['mp3'];
  queue.installPlugin(createjs.Sound);
  queue.loadFile({
    id: 'btnClick',
    src: 'assets/sounds/btn_click.mp3',
  });
  queue.loadFile({
    id: 'btnClose',
    src: 'assets/sounds/btn_close.mp3',
  });
  queue.loadFile({
    id: 'bgmHome',
    src: 'assets/sounds/home.mp3',
  });
  queue.addEventListener('complete', handleComplete);
}

function handleComplete() {
  bgmHome();
  const body = document.getElementsByTagName('body')[0];
  document.getElementById('loader').style.display = 'none';
  body.classList.remove('overflow-hidden');
}

function draggable() {
  interact('.draggable').draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        endOnly: true,
      }),
    ],
    listeners: {
      move: dragMoveListener,
      end(event) {
        var textEl = event.target.querySelector('p');
        textEl &&
          (textEl.textContent =
            'moved a distance of ' +
            Math.sqrt(
              (Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2)) |
                0
            ).toFixed(2) +
            'px');
      },
    },
  });

  function dragMoveListener(event) {
    hideTooltip();
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    if (window.innerWidth < 1312) {
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }
  window.dragMoveListener = dragMoveListener;
}

function tooltip() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(tooltipTriggerEl => {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      html: true,
      delay: { show: 250, hide: 100 },
    });
  });
}

function hideTooltip() {
  const tooltips = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltips.forEach(tooltip => {
    const instance = bootstrap.Tooltip.getInstance(tooltip);
    instance.hide();
  });
}

function updateTooltip(id, title) {
  const element = document.getElementById(id);
  element.title = title;
  tooltip();
}

function numberFormatter(number) {
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function checkInternet() {
  const failed = document.getElementById('failedInternet');
  const success = document.getElementById('successInternet');
  const child = success.firstElementChild;
  window.addEventListener('offline', () => {
    failed.style.display = 'block';
    child.classList.add('animate__slideInDown');
    child.classList.remove('animate__fadeOut');
  });
  window.addEventListener('online', () => {
    failed.style.display = 'none';
    success.style.display = 'block';
    child.addEventListener('animationend', () => {
      child.classList.remove('animate__slideInDown');
      child.classList.add('animate__fadeOut');
      const interval = setInterval(() => {
        clearInterval(interval);
        success.style.display = 'none';
      }, 1000);
    });
  });
}

function abbreviateNumber(number) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
}

const instance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token') ?? ''}` },
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      removeSession();
      return;
    }
    return Promise.reject(error);
  }
);

function feedNewsBox() {
  const box = document.getElementById('newsFeedBox');
  box.classList.remove('animate__fadeOut');
  box.classList.add('animate__fadeIn');
  const interval = setInterval(() => {
    box.classList.add('animate__fadeOut');
    box.addEventListener('animationend', () => {
      box.style.setProperty('display', 'none', 'important');
    });
    clearInterval(interval);
  }, 15000);
  box.addEventListener('click', () => {
    box.classList.add('animate__fadeOut');
    box.addEventListener('animationend', () => {
      box.style.setProperty('display', 'none', 'important');
    });
  });
}

function chestAFK() {
  const chest = document.getElementById('chestAFK');
  const spin = document.getElementById('chestAFKSpin');
  spin.addEventListener('click', () => {
    spin.classList.remove('spin');
    spin.classList.add('animate__fadeOut');
    chest.classList.add('animate__fadeOut');
    chest.classList.remove('animate__infinite');
    spin.style.pointerEvents = 'none';
  });
}

function checkBrowserTabs() {
  const tabCount = +localStorage.getItem('tabCount');
  window.addEventListener('storage', storageChanged, false);
  localStorage.setItem('tabCount', tabCount + 1);
  function storageChanged(event) {
    if (event.newValue <= tabCount) {
      window.location.href = 'about:blank';
      return;
    }
    localStorage.setItem('tabCount', tabCount + 1);
  }
}

function settings() {
  const modalSettings = document.getElementById('modalSettings');
  document.getElementById('userLogged').addEventListener('click', () => {
    btnClick();
    const myModal = new bootstrap.Modal(modalSettings);
    myModal.show();
  });
  document.getElementById('logout').addEventListener('click', () => {
    removeSession();
  });
  modalSettings.addEventListener('hidden.bs.modal', () => {
    btnClose();
  });
  document.getElementById('settingsBtnClose').addEventListener('click', () => {
    btnClose();
  });
  sound();
}

function isSound() {
  return JSON.parse(localStorage.getItem('sound') ?? true);
}

function sound() {
  const switchSound = document.getElementById('switchSound');
  switchSound.addEventListener('click', () => {
    if (switchSound.checked) {
      createjs.Sound.play('btnClick');
      localStorage.setItem('sound', 'true');
      return;
    }
    localStorage.setItem('sound', 'false');
    createjs.Sound.stop();
  });
  if (isSound()) {
    switchSound.click();
  }
}

function checkLogged() {
  const logged = localStorage.getItem('logged');
  if (logged === null || logged === 'false') {
    removeSession();
    return;
  }
  checkBrowserTabs();
}

function removeSession() {
  localStorage.removeItem('tabCount');
  localStorage.removeItem('logged');
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

function floatMenu() {
  const menuShow = document.getElementById('floatMenuShow');
  const menuHide = document.getElementById('floatMenuHide');
  const menuLeftList = document.querySelectorAll('.float-menu-left');
  const menuRightList = document.querySelectorAll('.float-menu-right');
  const menuStorage = localStorage.getItem('menuToggle');
  menuHide.addEventListener('click', () => {
    menuLeftList.forEach(m => {
      m.classList.remove('animate__slideInDown');
      m.classList.add('animate__slideOutUp');
    });
    menuRightList.forEach(m => {
      m.classList.remove('animate__slideInDown');
      m.classList.add('animate__slideOutUp');
    });
    menuHide.style.setProperty('display', 'none', 'important');
    menuShow.classList.remove('animate__fadeOut');
    menuShow.style.removeProperty('display');
    localStorage.setItem('menuToggle', 'hide');
  });
  menuShow.addEventListener('click', () => {
    menuLeftList.forEach(m => {
      m.classList.remove('animate__slideOutUp');
      m.classList.add('animate__slideInDown');
    });
    menuRightList.forEach(m => {
      m.classList.remove('animate__slideOutUp');
      m.classList.add('animate__slideInDown');
    });
    menuShow.style.setProperty('display', 'none', 'important');
    menuHide.classList.remove('animate__fadeOut');
    menuHide.style.removeProperty('display');
    localStorage.setItem('menuToggle', 'show');
  });
  if (menuStorage === 'hide') {
    menuHide.click();
  }
}

async function loaderHTML(page) {
  loading();
  await axios
    .get(`pages/${page}.html`, { responseType: 'text' })
    .then(function (response) {
      const root = document.getElementById('root');
      root.innerHTML = response.data;
      root.dataset.page = page;
    })
    .catch(function (error) {
      toast(error.message, 'error');
    })
    .finally(() => {
      hideLoading();
    });
}

async function getHome() {
  await loaderHTML('home').then(() => {
    draggable();
    tooltip();
    loading();
    instance
      .get('/user/profile/detail')
      .then(response => {
        mountHome(response.data);
      })
      .catch(error => {
        handleError(error);
      })
      .finally(() => {
        hideLoading();
      });
  });
}

function mountHome(data) {
  document.getElementById('user').textContent = data.name ?? data.email;
  document.getElementById('level').textContent = data.level;
  document.getElementById('minStamina').textContent = abbreviateNumber(
    data.stamina
  );
  document.getElementById('maxStamina').textContent = abbreviateNumber(100);
  updateTooltip(
    'staminaTooltip',
    `Carne<br>${numberFormatter(data.stamina)}/100`
  );
  document.getElementById('belly').textContent = abbreviateNumber(data.belly);
  document.getElementById('gold').textContent = abbreviateNumber(data.gold);
  document.getElementById('experience').style.width = `${
    (data.experience * 100) / 100
  }%`;
  if (data.name === null) {
    showChangeName();
  }
}

function showChangeName() {
  const myModal = new bootstrap.Modal(
    document.getElementById('changeNameModal')
  );
  myModal.show();
  document.getElementById('changeNameForm').addEventListener('submit', e => {
    e.preventDefault();
    loading();
    instance
      .put('/user/change-name', {
        name: document.getElementById('name').value,
      })
      .then(response => {
        document.getElementById('user').textContent =
          document.getElementById('name').value;
        toast(response.data.message, 'success');
        myModal.hide();
      })
      .catch(error => {
        handleError(error);
      })
      .finally(() => {
        hideLoading();
      });
  });
}

function footerMenu() {
  const page = document.getElementById('root').getAttribute('data-page');
  document.getElementById('homeMap').addEventListener('click', () => {
    if (page !== 'home') {
      btnClick();
      getHome();
    }
  });
  document.getElementById('crewMap').addEventListener('click', () => {
    if (page !== 'crew') {
      btnClick();
      getCrew();
    }
  });
}

async function getCrew() {
  await loaderHTML('crew');
}

function questToggle() {
  document.getElementById('questToggle').addEventListener('click', () => {
    const questBox = document.getElementById('questBox');
    const questToggleIcon = document.getElementById('questToggleIcon');
    if (questToggleIcon.getAttribute('quest-toggle-icon') === 'hide') {
      questToggleIcon.classList.remove('fa-angle-right');
      questToggleIcon.classList.add('fa-angle-left');
      questToggleIcon.removeAttribute('quest-toggle-icon');
      questBox.classList.remove('animate__slideOutLeft');
      questBox.classList.add('animate__slideInLeft');
      return;
    }
    questToggleIcon.classList.remove('fa-angle-left');
    questToggleIcon.classList.add('fa-angle-right');
    questToggleIcon.setAttribute('quest-toggle-icon', 'hide');
    questBox.classList.remove('animate__slideInLeft');
    questBox.classList.add('animate__slideOutLeft');
  });
}

function menuLeftToggle() {
  const show = document.getElementById('leftMenuBarShow');
  const hide = document.getElementById('leftMenuBarHide');
  const menu = document.getElementById('menuLeftExpandedBar');
  show.addEventListener('click', () => {
    menu.classList.remove('animate__slideOutLeft');
    menu.classList.add('animate__slideInLeft');
  });
  hide.addEventListener('click', () => {
    menu.classList.remove('animate__slideInLeft');
    menu.classList.add('animate__slideOutLeft');
  });
}

function btnClick() {
  if (isSound()) {
    createjs.Sound.play('btnClick');
  }
}

function btnClose() {
  if (isSound()) {
    createjs.Sound.play('btnClose');
  }
}

function bgmHome() {
  if (isSound()) {
    createjs.Sound.play('bgmHome', { loop: -1 });
  }
}

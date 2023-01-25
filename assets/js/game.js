// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   e.returnValue = '';
// });

let homeInstance;
let shopInstance;

includeJs('assets/js/home.js');
includeJs('assets/js/crew.js');
includeJs('assets/js/inventory.js');
includeJs('assets/js/shop.js');
includeJs('assets/js/chapter.js');

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
  questToggle();
  menuLeftToggle();
  viewHeight();
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
    'assets/images/icons/arrow_left.png',
    'assets/images/icons/ship.png',
    'assets/images/icons/lock.png',
    'assets/images/avatars/01.png',
    'assets/images/background/home.png',
    'assets/images/background/chapter.jpg',
    'assets/images/footer/home.png',
    'assets/images/footer/crew.png',
    'assets/images/footer/inventory.png',
    'assets/images/footer/chapter.png',
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
    'assets/images/characters/1.png',
    'assets/images/characters/2.png',
    'assets/images/items/1.png',
    'assets/images/items/2.png',
    'assets/images/banner/shop.jpg',
    'assets/images/chapters/1.png',
    'assets/images/chapters/2.png',
    'assets/images/chapters/3.png',
    'assets/images/chapters/4.png',
    'assets/images/chapters/5.png',
    'assets/images/chapters/6.png',
    'assets/images/rarity/a.png',
    'assets/images/rarity/b.png',
    'assets/images/rarity/c.png',
    'assets/images/rarity/d.png',
    'assets/images/rarity/s.png',
    'assets/images/rarity/ss.png',
    'assets/images/rarity/sss.png',
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
  queue.loadFile({
    id: 'bgmShop',
    src: 'assets/sounds/shop.mp3',
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
        const textEl = event.target.querySelector('p');
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
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    if (window.innerWidth < 1312) {
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      localStorage.setItem('mapX', x);
      localStorage.setItem('mapY', y);
    }
  }
  window.dragMoveListener = dragMoveListener;
}

function dragMove() {
  if (window.innerWidth < 1312) {
    const x = localStorage.getItem('mapX');
    const y = localStorage.getItem('mapY');
    const target = document.querySelector('.draggable');
    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
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
    btnClose();
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
    btnClick();
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

async function loaderHTML(page, hasFooter = true) {
  loading();
  await axios
    .get(`pages/${page}.html`, { responseType: 'text' })
    .then(function (response) {
      const root = document.getElementById('root');
      root.innerHTML = response.data;
      root.dataset.page = page;
      if (hasFooter) {
        changeMenuFooterActive(`${page}Map`);
      }
    })
    .catch(function (error) {
      toast(error.message, 'error');
    })
    .finally(() => {
      hideLoading();
    });
}

function helpModal() {
  document.getElementById('help').addEventListener('click', () => {
    const helpModal = document.getElementById('helpModal');
    const myModal = new bootstrap.Modal(helpModal);
    myModal.show();
    btnClick();
    helpModal.addEventListener('hidden.bs.modal', () => {
      btnClose();
    });
    document.getElementById('close').addEventListener('click', () => {
      myModal.hide();
      btnClose();
    });
  });
}

function questToggle() {
  const questToggle = document.getElementById('questToggle');
  questToggle.addEventListener('click', () => {
    const questToggleIcon = document.getElementById('questToggleIcon');
    if (questToggleIcon.getAttribute('quest-toggle-icon') === 'hide') {
      btnClick();
      showQuestToggle();
      return;
    }
    btnClose();
    hideQuestToggle();
  });
  if (localStorage.getItem('questBox') === 'hide') {
    hideQuestToggle();
  }
}

function showQuestToggle() {
  const questBox = document.getElementById('questBox');
  const questToggleIcon = document.getElementById('questToggleIcon');
  questToggleIcon.classList.remove('fa-angle-right');
  questToggleIcon.classList.add('fa-angle-left');
  questToggleIcon.removeAttribute('quest-toggle-icon');
  questBox.classList.remove('animate__slideOutLeft');
  questBox.classList.add('animate__slideInLeft');
  localStorage.setItem('questBox', 'show');
}

function hideQuestToggle() {
  const questBox = document.getElementById('questBox');
  const questToggleIcon = document.getElementById('questToggleIcon');
  questToggleIcon.classList.remove('fa-angle-left');
  questToggleIcon.classList.add('fa-angle-right');
  questToggleIcon.setAttribute('quest-toggle-icon', 'hide');
  questBox.classList.remove('animate__slideInLeft');
  questBox.classList.add('animate__slideOutLeft');
  localStorage.setItem('questBox', 'hide');
}

function menuLeftToggle() {
  const show = document.getElementById('leftMenuBarShow');
  const hide = document.getElementById('leftMenuBarHide');
  const menu = document.getElementById('menuLeftExpandedBar');
  show.addEventListener('click', () => {
    btnClick();
    menu.classList.remove('animate__slideOutLeft');
    menu.classList.add('animate__slideInLeft');
  });
  hide.addEventListener('click', () => {
    btnClose();
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
    homeInstance = createjs.Sound.play('bgmHome', { loop: -1 });
  }
}

function bgmShop() {
  if (isSound()) {
    shopInstance = createjs.Sound.play('bgmShop', { loop: -1 });
  }
}

function hideMenu() {
  const leftMenu = document.querySelectorAll('.float-menu-left');
  leftMenu.forEach(lm => {
    lm.classList.add('d-none');
  });
  const rightMenu = document.querySelectorAll('.float-menu-right');
  rightMenu.forEach(rm => {
    rm.classList.add('d-none');
  });
  document.querySelector('.bonus-box').classList.add('d-none');
  document.getElementById('leftMenuBarShow').classList.add('d-none');
  document.getElementById('floatMenuHide').classList.add('d-none');
  document.getElementById('floatMenuShow').classList.add('d-none');
}

function showMenu() {
  const leftMenu = document.querySelectorAll('.float-menu-left');
  leftMenu.forEach(lm => {
    lm.classList.remove('d-none');
  });
  const rightMenu = document.querySelectorAll('.float-menu-right');
  rightMenu.forEach(rm => {
    rm.classList.remove('d-none');
  });
  document.querySelector('.bonus-box').classList.remove('d-none');
  document.getElementById('leftMenuBarShow').classList.remove('d-none');
  document.getElementById('floatMenuHide').classList.remove('d-none');
  document.getElementById('floatMenuShow').classList.remove('d-none');
}

function changeMenuFooterActive(id) {
  const actives = document.querySelectorAll('#footer .active');
  actives.forEach(active => {
    active.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function hideFooter() {
  document.getElementById('footer').style.display = 'none';
}

function showFooter() {
  document.getElementById('footer').style.removeProperty('display');
}

function viewHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}

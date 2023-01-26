document.getElementById('chapterMap').addEventListener('click', () => {
  if (document.getElementById('root').getAttribute('data-page') !== 'chapter') {
    btnClick();
    getChapter();
  }
});

// document.getElementById('chapterMap').click(); //remove here

async function getChapter() {
  await loaderHTML('chapter').then(() => {
    hideMenu();
    findAllChapter();
  });
}

function findAllChapter() {
  loading();
  instance
    .get('/chapter')
    .then(response => {
      mountChapter(response.data);
    })
    .catch(error => {
      handleError(error);
    })
    .finally(() => {
      hideLoading();
    });
}

function mountChapter(data) {
  data.reverse().forEach((d, index) => {
    if (index < data.length - 1) {
      document.getElementById('chapter').insertAdjacentHTML(
        'beforeend',
        `
      <div id="chapter-${d.id}">
        <div class="d-flex flex-column align-items-center grayscale">
          <div class="position-relative">
            <img src="assets/images/chapters/${d.image}.png" alt="Chapter image" width="154" />
            <img
              src="assets/images/icons/lock.png"
              alt="Lock image"
              height="55"
              class="position-absolute bottom-0 start-50 translate-middle-x"
            />
          </div>
          <div class="mt-2">
            <div class="card">
              <div class="card-body flex-column">
                <h5 class="card-title">${d.name}</h5>
                <p class="card-text color-blue-2">Nível recomendado: ${d.level}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
      );
      return;
    }
    document.getElementById('chapter').insertAdjacentHTML(
      'beforeend',
      `
    <div id="chapter-${d.id}">
      <div class="d-flex flex-column align-items-center" role="button" onclick="getPhase(${d.id})">
        <div class="position-relative">
          <img src="assets/images/chapters/${d.image}.png" alt="Chapter image" width="154" />
          <img
            src="assets/images/icons/ship.png"
            alt="Ship image"
            height="55"
            class="position-absolute bottom-0 start-50 floating"
          />
        </div>
        <div class="mt-2">
          <div class="card">
            <div class="card-body flex-column">
              <h5 class="card-title">${d.name}</h5>
              <p class="card-text color-blue-2">Nível recomendado: ${d.level}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    );
  });
  const interval = setInterval(() => {
    document.getElementById('worldScroll').scrollTo({
      top: document.getElementById('chapter-1').offsetTop - 50,
      behavior: 'smooth',
    });
    clearInterval(interval);
  }, 200);
}

function getPhase(id) {
  btnClick();
  loading();
  instance
    .get(`/phase/chapter/${id}`)
    .then(response => {
      showPhaseModal(response.data);
    })
    .catch(error => {
      handleError(error);
    })
    .finally(() => {
      hideLoading();
    });
}

function showPhaseModal(data) {
  mountPhase(data);
  const modal = document.getElementById('phaseModal');
  const myModal = new bootstrap.Modal(modal);
  myModal.show();
  modal.addEventListener('hidden.bs.modal', () => {
    btnClose();
  });
  document.getElementById('close').addEventListener('click', () => {
    myModal.hide();
    btnClose();
  });
}

function mountPhase(data) {
  document.getElementById('titleChapter').textContent = data[0].chapter.name;
  const phase = document.getElementById('phase');
  phase.replaceChildren();
  data.forEach((d, index) => {
    phase.insertAdjacentHTML(
      'beforeend',
      `<div class="d-flex position-relative card-phase mb-2" role="button">
        <img
          src="assets/images/battle/${d.image}.jpg"
          alt="Phase image"
          width="100"
          height="56"
          class="me-2"
        />
        <span
          class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger d-flex justify-content-center"
          >${index + 1}</span
        >
        <div class="font-12 d-flex justify-content-center flex-column">
          <p class="font-600 font-12 text-uppercase m-0">${d.name}</p>
          <div>
            <i class="fa-solid fa-star color-orange"></i>
            <i class="fa-solid fa-star color-orange"></i>
            <i class="fa-regular fa-star"></i>
          </div>
        </div>
      </div>
      `
    );
  });
  phase.insertAdjacentHTML(
    'beforeend',
    `
  <div class="d-flex position-relative card-phase mb-2 grayscale">
    <img
      src="assets/images/battle/1.jpg"
      alt="Phase image"
      width="100"
      height="56"
      class="me-2"
    />
    <span
      class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger d-flex justify-content-center"
      >3</span
    >
    <div class="font-12 d-flex justify-content-center flex-column">
      <p class="font-600 font-12 text-uppercase m-0">Fase 3</p>
      <div>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
      <div class="position-absolute top-50 end-0 translate-middle">
        <i class="fa-solid fa-lock"></i>
      </div>
    </div>
  </div>
  `
  );
  tooltip();
}

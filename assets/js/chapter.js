document.getElementById('chapterMap').addEventListener('click', () => {
  if (document.getElementById('root').getAttribute('data-page') !== 'chapter') {
    btnClick();
    getChapter();
  }
});

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
        <div class="d-flex flex-column align-items-center grayscale" role="button">
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
      <div class="d-flex flex-column align-items-center" role="button">
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

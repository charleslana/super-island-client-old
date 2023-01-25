document.getElementById('crewMap').addEventListener('click', () => {
  if (document.getElementById('root').getAttribute('data-page') !== 'crew') {
    btnClick();
    getCrew();
  }
});

async function getCrew() {
  await loaderHTML('crew').then(() => {
    hideMenu();
    findAllCrew();
    helpModal();
  });
}

function findAllCrew() {
  loading();
  instance
    .get('/user-character')
    .then(response => {
      mountCrew(response.data);
    })
    .catch(error => {
      handleError(error);
    })
    .finally(() => {
      hideLoading();
    });
}

function mountCrew(data) {
  document.getElementById('count').textContent = `(${data.length}/100)`;
  if (data.length === 0) {
    document.getElementById('empty').classList.remove('d-none');
    return;
  }
  data.forEach(d => {
    document.getElementById('characters').insertAdjacentHTML(
      'beforeend',
      `
      <div class="col-auto text-start separate-column d-flex flex-column align-items-center">
        <div class="card item-character-card d-flex align-items-center" role="button">
          <div class="card-body">
            <img
              src="assets/images/characters/${d.character.image}.png"
              alt="Character image"
              height="103"
              class="slide-in"
            />
            <div class="position-absolute bottom-0 start-0 ms-1 rarity">
              <img
                src="assets/images/rarity/${d.character.rarity.toLowerCase()}.png"
                alt="Rarity image"
                height="15"
              />
            </div>
          </div>
        </div>
        <h6 class="text-truncate mt-1 item-character-card-detail">${
          d.character.name
        }</h6>
      </div>
      `
    );
  });
}

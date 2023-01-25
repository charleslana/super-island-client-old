function clickShop() {
  document.getElementById('shop').addEventListener('click', () => {
    btnClick();
    getShop();
  });
}

async function getShop() {
  await loaderHTML('shop', false).then(() => {
    hideMenu();
    hideFooter();
    backHome();
    loading();
    homeInstance.stop();
    bgmShop();
    instance
      .get('/shop')
      .then(response => {
        mountShop(response.data);
      })
      .catch(error => {
        handleError(error);
      })
      .finally(() => {
        hideLoading();
      });
  });

  function backHome() {
    document.getElementById('back').addEventListener('click', async () => {
      btnClose();
      await getHome().then(() => {
        dragMove();
        shopInstance.stop();
        bgmHome();
      });
      showFooter();
    });
  }
}

function mountShop(data) {
  data.forEach(d => {
    document.getElementById('first').insertAdjacentHTML(
      'beforeend',
      `
      <div class="d-flex justify-content-between align-items-center item-border container">
        <div
          class="d-flex align-items-center"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="<div class='tooltip-custom'>${d.item.name}<br><small>${
        d.item.rarity
      }</small><br><img src='assets/images/items/${
        d.item.image
      }.png' alt='Item image' height='32'><br><span>Nível requerido: <span class='color-green'>${
        d.userLevel
      }</span></span><div class='container'>Status<br><div class='color-blue-3'>Ataque físico: +1</div></div></div>"
        >
          <div
            class="item d-flex align-items-center justify-content-center me-2 position-relative"
          >
            <img src="assets/images/items/${
              d.item.image
            }.png" alt="Item image" height="32" />
            <i
              class="fa-solid fa-link color-red-3 position-absolute top-0 start-0"
            ></i>
          </div>
          <div class="d-flex flex-column">
            <div>${d.item.name}</div>
            <div class="d-flex">
              <div class="me-2">
                <img
                  src="assets/images/icons/belly.png"
                  alt="Belly image"
                  width="16"
                />
                ${numberFormatter(+d.belly)}
              </div>
              <div>
                <img src="assets/images/icons/gem.png" alt="Gem image" width="16" />
                ${numberFormatter(+d.gem)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-success shadow-none"
            data-bs-toggle="modal"
            data-bs-target="#confirmModal"
          >
            Comprar
          </button>
        </div>
    </div>
    `
    );
  });
  tooltip();
}

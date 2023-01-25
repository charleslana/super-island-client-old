document.getElementById('inventoryMap').addEventListener('click', () => {
  if (
    document.getElementById('root').getAttribute('data-page') !== 'inventory'
  ) {
    btnClick();
    getInventory();
  }
});

async function getInventory() {
  await loaderHTML('inventory').then(() => {
    hideMenu();
    findAllInventory();
    helpModal();
  });
}

function findAllInventory() {
  loading();
  instance
    .get('/user-item')
    .then(response => {
      mountInventory(response.data);
    })
    .catch(error => {
      handleError(error);
    })
    .finally(() => {
      hideLoading();
    });
}

function mountInventory(data) {
  document.getElementById('count').textContent = `(${data.length}/100)`;
  if (data.length === 0) {
    document.getElementById('empty').classList.remove('d-none');
    return;
  }
  data.forEach(d => {
    document.getElementById('items').insertAdjacentHTML(
      'beforeend',
      `
      <div class="col-auto text-start separate-column d-flex flex-column align-items-center">
        <div class="card item-card d-flex align-items-center" role="button">
          <div class="card-body">
            <img
              src="assets/images/items/${d.item.image}.png"
              alt="Item image"
              height="72"
            />
            <div class="position-absolute bottom-0 start-0 ms-1 rarity">
              <img
                src="assets/images/rarity/${d.item.rarity.toLowerCase()}.png"
                alt="Rarity image"
                height="15"
              />
            </div>
          </div>
        </div>
        <h6 class="text-truncate mt-1 item-card-detail">${d.item.name}</h6>
      </div>
      `
    );
  });
}

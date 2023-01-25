getHome();

document.getElementById('homeMap').addEventListener('click', () => {
  if (document.getElementById('root').getAttribute('data-page') !== 'home') {
    btnClick();
    getHome();
  }
});

async function getHome() {
  await loaderHTML('home').then(() => {
    showMenu();
    draggable();
    tooltip();
    clickShop();
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
  updateTooltip('bellyTooltip', `Berries<br>${numberFormatter(+data.belly)}`);
  updateTooltip('gemTooltip', `Gema<br>${numberFormatter(+data.gem)}`);
  document.getElementById('belly').textContent = abbreviateNumber(data.belly);
  document.getElementById('gem').textContent = abbreviateNumber(data.gem);
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

function stopHomeBgm() {
  if (homeInstance !== undefined) {
    homeInstance.stop();
  }
}

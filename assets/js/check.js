document.addEventListener('DOMContentLoaded', () => {
  checkBrowserVersion();
  checkBrowserLanguage();
  checkBrowserPlatform();
});

function checkBrowserVersion() {
  const name = navigator.browserSpecs.name;
  const version = navigator.browserSpecs.version;
  console.log(name);
  console.log(version);
  if (
    (name == 'Chrome' && version < 101) ||
    (name == 'Safari' && version < 7) ||
    (name == 'Firefox' && version < 95) ||
    (name == 'Opera' && version < 90)
  ) {
    location.href = 'unsupported.html';
  }
  if (
    name === 'Chrome' ||
    name === 'Safari' ||
    name === 'Firefox' ||
    name === 'Opera'
  ) {
    return;
  }
  location.href = 'unsupported.html';
}

navigator.browserSpecs = (function () {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: tem[1] || '' };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null)
      return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return { name: M[0], version: M[1] };
})();

function checkBrowserLanguage() {
  const language = navigator.language || navigator.userLanguage;
  console.log(language);
}

function checkBrowserPlatform() {
  console.log(window.navigator.platform);
}

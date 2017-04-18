'use strict';

window.Map = (function () {

  var ads = window.Ads;
  // var dialogPanel = document.querySelector('.dialog__panel');
  var dialog = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    pinFragment.appendChild(window.Pin.render(ads[i], i));
  }

  pinMap.appendChild(pinFragment);

  dialog.style.display = 'none';

  var pins = document.getElementsByClassName('pin');

  for (var l = 0; l < pins.length; l++) {
    pins[l].addEventListener('click', function (e) {
      window.Card.open(e.currentTarget, ads);
    });
    pins[l].addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        window.Card.open(evt.currentTarget, ads);
      }
    });
  }

  dialogClose.addEventListener('click', function () {
    window.Card.close();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      window.Card.close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      window.Card.close();
    }
  });

  document.querySelector('.pin').style.display = 'none';

})();

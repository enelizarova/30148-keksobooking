'use strict';

window.Map = (function () {

  var ads = window.Ads;
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
      window.showCard.open(e.currentTarget, ads);
    });
    pins[l].addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        window.showCard.open(evt.currentTarget, ads);
      }
    });
  }

  dialogClose.addEventListener('click', function () {
    window.showCard.close();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      window.showCard.close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      window.showCard.close();
    }
  });

  // document.querySelector('.pin').style.display = 'none';
  var pinHandle = document.querySelector('.pin__main');

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';

      var addressInput = document.querySelector('#address');
      addressInput.value = (pinHandle.offsetTop - shift.y) + 'px' + ', ' + (pinHandle.offsetLeft - shift.x) + 'px';

    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  pinHandle.addEventListener('dragstart', function (evt) {
    if (evt.target.className.toLowerCase() === 'pin__main') {
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var mapElement = document.querySelector('.tokyo');

  mapElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

})();

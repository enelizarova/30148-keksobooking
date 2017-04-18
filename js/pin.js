'use strict';

window.pins = (function() {
  return {
    function renderPin(ad, index) {
    var pin = similarPinTemplate.cloneNode(true);
    pin.dataset.index = index;
    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    return pin;
    }
  }
}
var pinFragment = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  pinFragment.appendChild(renderPin(ads[i], i));
}

pinMap.appendChild(pinFragment);

similarPinTemplate.style.display = 'none';

var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var pins = document.getElementsByClassName('pin');

dialog.style.display = 'none';

window.elementsVisibility = (function () {
  function openDialog(context) {
  var adToRender = ads[context.dataset.index];
  closeDialog();
  renderDialog(adToRender);
  context.classList.add('pin--active');
  dialog.style.display = 'block';
}
function closeDialog() {
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
  dialog.style.display = 'none';
}
dialogClose.addEventListener('click', function () {
  closeDialog();
});
dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeDialog();
  }
});
document.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    closeDialog();
  }
});
})

for (var l = 0; l < pins.length; l++) {
  pins[l].addEventListener('click', function (e) {
    openDialog(e.currentTarget);
  });
  pins[l].addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      openDialog(evt.currentTarget);
    }
  });
}

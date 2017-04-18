'use strict';

window.Pin = (function () {

  var similarPinTemplate = document.querySelector('.pin');

  function renderPin(ad, index) {
    var pin = similarPinTemplate.cloneNode(true);
    pin.dataset.index = index;
    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.classList.remove('pin__main');
    return pin;
  }

  return {
    render: renderPin
  };

})();

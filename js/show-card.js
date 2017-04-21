'use strict';

window.showCard = (function () {
  function openDialog(context, ads) {

    var dialog = document.querySelector('.dialog');
    var adToRender = ads[context.dataset.index];

    closeDialog();
    renderDialog(adToRender);
    context.classList.add('pin--active');
    dialog.style.display = 'block';
  }

  function closeDialog() {

    var pins = document.getElementsByClassName('pin');
    var dialog = document.querySelector('.dialog');

    for (var k = 0; k < pins.length; k++) {
      pins[k].classList.remove('pin--active');
    }
    dialog.style.display = 'none';
  }

  function renderDialog(ad) {

    var dialogPanel = document.querySelector('.dialog__panel');
    var fragment = document.createDocumentFragment();
    if (typeof ad !== 'undefined') {
      fragment.appendChild(window.Card.render(ad));

      dialogPanel.innerHTML = '';
      dialogPanel.appendChild(fragment);

      document.querySelector('.dialog__title img').src = ad.author.avatar;
    }
  }

  return {
    close: closeDialog,
    open: openDialog
  };
})();



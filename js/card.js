'use strict';


window.Card = (function () {

  var flatDict = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  function renderAds(ad) {

    var similarAdsTemplate = document.querySelector('#lodge-template').content;
    var adsElement = similarAdsTemplate.cloneNode(true);
    var featureFragment = document.createDocumentFragment();

    for (var i = 0; i < ad.offer.features.length; i++) {
      var featuresSpan = document.createElement('span');
      featuresSpan.className = 'feature__image feature__image--' + ad.offer.features[i];
      featureFragment.appendChild(featuresSpan);
    }

    adsElement.querySelector('.lodge__title').textContent = ad.offer.title;
    adsElement.querySelector('.lodge__address').textContent = ad.offer.address;
    adsElement.querySelector('.lodge__price').textContent = ad.offer.price + '\u20bd' + '/ночь';
    adsElement.querySelector('.lodge__type').textContent = flatDict[ad.offer.type];
    adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
    adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adsElement.querySelector('.lodge__features').appendChild(featureFragment);
    adsElement.querySelector('.lodge__description').textContent = ad.offer.description;
    adsElement.querySelector('.lodge__photos').textContent = ad.offer.photos;

    return adsElement;
  }

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

    fragment.appendChild(renderAds(ad));

    dialogPanel.innerHTML = '';
    dialogPanel.appendChild(fragment);

    document.querySelector('.dialog__title img').src = ad.author.avatar;
  }

  return {
    render: renderAds,
    close: closeDialog,
    open: openDialog
  };

})();

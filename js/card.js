'use strict';


window.Card = (function () {

  var flatDict = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  function renderAds(ad) {

    var similarAdsTemplate = document.querySelector('#lodge-template').content;
    var adsElement = similarAdsTemplate.cloneNode(true);
    var featureFragment = document.createDocumentFragment();

    if (typeof ad !== 'undefined') {
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
    }
    return adsElement;
  }

  return {
    render: renderAds,
  };

})();

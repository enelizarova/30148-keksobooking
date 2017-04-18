'use strict';


window.ads = (function () {
  return {
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
  }
})
window.dialog = (function () {
  return {
    function renderDialog(ad) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(renderAds(ad));
      dialogPanel.innerHTML = '';
      dialogPanel.appendChild(fragment);
      document.querySelector('.dialog__title img').src = ad.author.avatar;
    }
  }
})


for (var j = 1; j <= 8; j++) {
  ads.push(createAds(j));
}

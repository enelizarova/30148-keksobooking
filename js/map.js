'use strict';

var ads = [];
var dialogPanel = document.querySelector('.dialog__panel');
var pinMap = document.querySelector('.tokyo__pin-map');
var similarPinTemplate = document.querySelector('.pin');
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var roomType = ['flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var flatDict = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

function getRandomNum(min, max) {
  return (Math.random() * (max - min) + min).toFixed(0);
}

function getRandomValues(arr) {
  var result = [];
  var count = getRandomNum(1, arr.length);
  var index = 0;

  for (var i = 0; i < count; i++) {
    index = ((arr.length - 1) * Math.random()).toFixed(0);
    if (result.indexOf(arr[index]) === -1) {
      result.push(arr[index]);
    }
  }
  return result;
}

function getRandomValue(arr) {
  var index = ((arr.length - 1) * Math.random()).toFixed(0);
  return arr[index];
}

function createAds(index) {
  var x = getRandomNum(300, 900);
  var y = getRandomNum(100, 500);

  return {
    author: {
      avatar: 'img/avatars/user0' + (index) + '.png',
    },
    offer: {
      title: title[index],
      address: x + ',' + y,
      price: getRandomNum(1000, 1000000),
      type: getRandomValue(roomType),
      rooms: getRandomNum(1, 5),
      guests: getRandomNum(1, 11),
      checkin: getRandomValue(time),
      checkout: getRandomValue(time),
      features: getRandomValues(features),
      description: '',
      photos: [],
    },
    location: {
      x: x,
      y: y,
    }
  };
}

function renderPin(ad, index) {
  var pin = similarPinTemplate.cloneNode(true);
  pin.dataset.index = index;
  pin.style.left = ad.location.x + 'px';
  pin.style.top = ad.location.y + 'px';
  pin.querySelector('img').src = ad.author.avatar;
  return pin;
}

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

function renderDialog(ad) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderAds(ad));
  dialogPanel.innerHTML = '';
  dialogPanel.appendChild(fragment);
  document.querySelector('.dialog__title img').src = ad.author.avatar;
}

for (var j = 1; j <= 8; j++) {
  ads.push(createAds(j));
}

var pinFragment = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  pinFragment.appendChild(renderPin(ads[i], i));
}

pinMap.appendChild(pinFragment);

// ------------------------------------- Личный проект: подробности ----------------------------------------

similarPinTemplate.style.display = 'none';

var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var pins = document.getElementsByClassName('pin');

dialog.style.display = 'none';

function openDialog(context) {
  var adToRender = ads[context.dataset.index];
  closeDialog();
  renderDialog(adToRender);
  context.classList.add('pin--active');
  dialog.style.display = 'block';
}

function closeDialog() {
  for (var k = 0; k < pins.length; k++) {
    pins[k].classList.remove('pin--active');
  }
  dialog.style.display = 'none';
}

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

// ------------------------------- Личный проект: доверяй, но проверяй ----------------------------------------

var noticeForm = document.querySelector('.notice__form');
var formTime = document.getElementById('time');
var timeout = document.getElementById('timeout');

formTime.addEventListener('change', function () {
  timeout.selectedIndex = formTime.selectedIndex;
});

var type = document.getElementById('type');

type.addEventListener('change', function () {
  var price = 0;
  switch (roomType[type.selectedIndex]) {
    case 'flat':
      price = 1000;
      break;
    case 'bungalo':
      price = 0;
      break;
    case 'house':
      price = 1000000;
      break;
  }
  document.getElementById('price').value = price;
});

var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');

roomNumber.addEventListener('change', function () {
  var index = roomNumber.selectedIndex;
  capacity.selectedIndex = [1, 2].indexOf(index) !== -1 ? 0 : 1;
});

noticeForm.addEventListener('submit', function (e) {

  e.preventDefault();

  var formTitle = document.getElementById('title');
  var titleVal = formTitle.value;

  if (!titleVal || titleVal.length < 30 || titleVal.length > 100) {
    title.style.border = '1px solid red';
  }

  var price = document.getElementById('price');
  var priceVal = parseInt(price.value, 10);

  if (!priceVal || priceVal < 1000 || priceVal > 1000000) {
    price.style.border = '1px solid red';
  }

  noticeForm.reset();

}, false);

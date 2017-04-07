'use strict';


var ads = [];
var dialogPanel = document.querySelector('.dialog__panel');
var pinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();
var pin = document.querySelector('.pin');
var pinImg = pin.querySelector('.rounded');
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var roomType = ['flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var imageNumber = 1;
var flatDict = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

function countPrice() {
  var price = Math.ceil(Math.random() * 999000) + 1000;
  return price;
}
function countRooms() {
  var room = Math.ceil(Math.random() * 5);
  return room;
}
function countGuests() {
  var guest = Math.floor(Math.random() * 11);
  return guest;
}
function getRandomValue(arr) {
  var index = ((arr.length - 1) * Math.random()).toFixed(0);
  return arr[index];
}
function countLocationX() {
  var x = Math.ceil(Math.random() * 600) + 300;
  return x;
}
function countLocationY() {
  var y = Math.ceil(Math.random() * 400) + 100;
  return y;
}

function createAds() {
  return {
    author: {
      avatar: 'img/avatars/user0' + (imageNumber++) + '.png',
    },
    offer: {
      title: getRandomValue(title),
      address: 'location.x, location.y',
      price: countPrice(),
      type: getRandomValue(roomType),
      rooms: countRooms(),
      guests: countGuests(),
      checkin: getRandomValue(time),
      checkout: getRandomValue(time),
      features: getRandomValue(features),
      description: '',
      photos: [],
    },
    location: {
      x: countLocationX(),
      y: countLocationY(),
    }
  };
}
function renderPin() {
  var pinElement = similarPinTemplate.cloneNode(true);
  pin.style.left = 'location.x' + 'px';
  pin.style.top = 'location.y' + 'px';
}

function renderPinImg() {
  var pinImgElement = similarPinImgTemplate.cloneNode(true);
  pinImg.setAttribute('src', 'author.avatar');
}

function renderAds(ad) {
  var similarAdsTemplate = document.querySelector('#lodge-template').content;
  var adsElement = similarAdsTemplate.cloneNode(true);
  var featuresSpan = document.createElement('span');
  featuresSpan.className = 'feature__image feature__image--' + getRandomValue(features);
  adsElement.querySelector('.lodge__title').textContent = ads[i].offer.title;
  adsElement.querySelector('.lodge__address').textContent = ads[i].offer.address;
  adsElement.querySelector('.lodge__price').textContent = ads[i].offer.price + '\u20bd' + '/ночь';
  adsElement.querySelector('.lodge__type').textContent = ads[i].offer.type;
  adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ads[i].offer.guests + ' гостей в ' + ads[i].offer.rooms + ' комнатах';
  adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ads[i].offer.checkin + ', выезд до ' + ads[i].offer.checkout;
  adsElement.querySelector('.lodge__features').appendChild(featuresSpan);
  adsElement.querySelector('.lodge__description').textContent = ads[i].offer.description;
  adsElement.querySelector('.lodge__photos').textContent = ads[i].offer.photos;

  return adsElement;
}

for (var j = 1; j <= 8; j++) {
  ads.push(createAds());

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderAds(ads[i]));
}

dialogPanel.appendChild(fragment);

pinMap.appendChild(fragment);

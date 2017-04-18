'use strict';

window.Ads = (function () {

  var ads = [];
  var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var roomType = ['flat', 'house', 'bungalo'];
  var time = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

  for (var j = 1; j <= 8; j++) {
    ads.push(createAds(j));
  }

  return ads;

})();

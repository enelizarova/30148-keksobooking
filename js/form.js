'use strict';

window.Form = (function () {

  var noticeForm = document.querySelector('.notice__form');
  var formTime = document.getElementById('time');
  var timeout = document.getElementById('timeout');

  formTime.addEventListener('change', function () {
    timeout.selectedIndex = formTime.selectedIndex;
  });

  var type = document.getElementById('type');

  type.addEventListener('change', function () {
    var price = 0;
    var roomType = ['flat', 'house', 'bungalo'];
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
      formTitle.style.border = '1px solid red';
    }

    var price = document.getElementById('price');
    var priceVal = parseInt(price.value, 10);

    if (!priceVal || priceVal < 1000 || priceVal > 1000000) {
      price.style.border = '1px solid red';
    }

    noticeForm.reset();

  }, false);

})();

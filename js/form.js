'use strict';

window.Form = (function () {

  var noticeForm = document.querySelector('.notice__form');
  var formTime = document.getElementById('time');
  var timeout = document.getElementById('timeout');
  var type = document.getElementById('type');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var priceElem = document.getElementById('price');
  var timeVal = ['12', '13', '14'];
  var rooms = ['1', '2', '100'];
  var guests = ['0', '3', '3'];
  var housing = ['flat', 'house', 'bungalo'];
  var prices = ['1000', '1000000', '0'];
  priceElem.min = 1000;
  priceElem.max = 1000000;


  function syncValues(element, value) {
    element.value = value;
  }
  function syncValueWithMin(element, value) {
    element.min = value;
  }

  window.synchronizeFields(formTime, timeVal, timeout, timeVal, syncValues);
  window.synchronizeFields(timeout, timeVal, formTime, timeVal, syncValues);
  window.synchronizeFields(roomNumber, rooms, capacity, guests, syncValues);
  window.synchronizeFields(type, housing, priceElem, prices, syncValueWithMin);

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

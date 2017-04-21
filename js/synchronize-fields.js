'use strict';

window.synchronizeFields = (function (indepElem, indepData, dependElem, dependData, callback) {
  indepElem.addEventListener('change', function () {
    for (var i = 0; i < indepData.length; i++) {
      if (indepElem.value === indepData[i]) {
        callback(dependElem, dependData[i]);
        break;
      }
    }
  });

});

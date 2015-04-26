'use strict';
var items = window.items;
angular.module('a', []).
controller('b', function($scope) {
  var range = function(count) {
    var a = [];
    for (var x=0;x<=count;x++) { a.push(x); }
    return a;
  };

  $scope.registry = { items: {} };

  $scope.items = window.items.map(function(item) {
    $scope.registry.items[ item.name ] = 0;
    item.select = range(item.quantity);
    return item;
  });

  $scope.cart = {
    total: 0,
    qty: 0,
    items: []
  };


  $scope.doThis = function() {
    var total = 0;
    var Qty = 0;
    var Items = [];
    angular.forEach($scope.registry.items, function(qty, key) {
      if (qty < 1) { return false; }
      angular.forEach(items, function(i) {
        if (i.name === key) {
          total += +qty * i.price;
          Qty += +qty;
          Items.push({
            price: i.price,
            qty: qty,
            name: i.name
          });
        }
      });
    });
    $scope.cart = {
      total: total,
      qty: Qty,
      items: Items
    };
  };

});

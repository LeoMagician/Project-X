(function(angular) {
  'use strict';
angular.module('eventOrder', [])

.component('eventOrder', {
  templateUrl: 'view/component/eventPage/eventOrder/eventOrder.html',
  controller: EventOrderController,
  bidnings: {
    count: '='
  }
});

function EventOrderController($scope) {
  this.$onInit = function() {
    $scope.orderByDate = 'eventOrderTypeSelected';
    $scope.orderByPrice = 'eventOrderType';
    $scope.orderByHot = 'eventOrderType';
    $scope.orderByDateIcon = 'orderByIconSelected';
    $scope.orderByPriceIcon = 'orderByIcon';
    $scope.orderByHotIcon = 'orderByIcon';
    
    $scope.changeClass = function(type){
        if (type === "date") {
          $scope.orderByDate = "eventOrderTypeSelected";
          $scope.orderByPrice = 'eventOrderType';
          $scope.orderByHot = 'eventOrderType';
          $scope.orderByDateIcon = 'orderByIconSelected';
          $scope.orderByPriceIcon = 'orderByIcon';
          $scope.orderByHotIcon = 'orderByIcon';
          $scope.$parent.oType = 'month';
        }else if(type === "price"){
          $scope.orderByDate = "eventOrderType";
          $scope.orderByPrice = 'eventOrderTypeSelected';
          $scope.orderByHot = 'eventOrderType';
          $scope.orderByDateIcon = 'orderByIcon';
          $scope.orderByPriceIcon = 'orderByIconSelected';
          $scope.orderByHotIcon = 'orderByIcon';
          $scope.$parent.oType = 'price';
        }else{
          $scope.orderByDate = "eventOrderType";
          $scope.orderByPrice = 'eventOrderType';
          $scope.orderByHot = 'eventOrderTypeSelected';
          $scope.orderByDateIcon = 'orderByIcon';
          $scope.orderByPriceIcon = 'orderByIcon';
          $scope.orderByHotIcon = 'orderByIconSelected';
          $scope.$parent.oType = 'hot';
        }
      };
  }
} 

})(window.angular);
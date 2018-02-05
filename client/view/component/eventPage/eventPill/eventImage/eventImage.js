(function(angular) {
  'use strict';
angular.module('eventImage', [])

.component('eventImage', {
  templateUrl: 'view/component/eventPage/eventPill/eventImage/eventImage.html',
  controller: EventImageController,
  bindings: {
      pill: '='
  }
});

function EventImageController($scope) {
  this.$onInit = function() {
    this.normal = this.pill.normal;
    if(this.normal){
      $scope.normal = true;
      $scope.special = false;
    }else{
      $scope.normal = false;
      $scope.special = true;
    }
  }
} 

})(window.angular);
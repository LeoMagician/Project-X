(function(angular) {
  'use strict';
angular.module('eventTime', [])

.component('eventTime', {
  templateUrl: 'view/component/eventPage/eventPill/eventTime/eventTime.html',
  controller: EventTimeController,
  bindings: {
      pill: '='
  }
});

function EventTimeController($scope) {
  this.$onInit = function() {
    this.normal = this.pill.normal;
    $scope.pill = this.pill;
    if(this.normal){
      $scope.normal = true;
      $scope.special = false;
      $scope.date = this.pill.date + "日";
    }else{
      $scope.normal = false;
      $scope.special = true;
    }
  }
} 

})(window.angular);
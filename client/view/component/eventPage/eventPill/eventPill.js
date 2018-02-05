(function(angular) {
  'use strict';
angular.module('eventPill', ['eventImage','eventTime','eventDetails'])

.component('eventPill', {
  templateUrl: 'view/component/eventPage/eventPill/eventPill.html',
  controller: EventPillController,
  bindings: {
      pill: '='
  }
});

function EventPillController($scope,NavigationService) {
  this.$onInit = function() {
    this.normal = this.pill.normal;
    if(this.normal){
      $scope.normal = true;
      $scope.special = false;
    }else{
      $scope.normal = false;
      $scope.special = true;
    }
    $scope.pill = this.pill;

    $scope.go = function(path){
      NavigationService.navigateToNewPageByPath(path);
    }
  }
} 

})(window.angular);
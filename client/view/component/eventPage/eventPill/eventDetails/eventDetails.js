(function(angular) {
  'use strict';
angular.module('eventDetails', ['eventTitle','eventTag'])

.component('eventDetails', {
  templateUrl: 'view/component/eventPage/eventPill/eventDetails/eventDetails.html',
  controller: EventDetailsController,
  bindings: {
      pill: '='
  }
});

function EventDetailsController($scope,NavigationService) {
  this.$onInit = function() {
    $scope.pill = this.pill;
    this.normal = this.pill.normal;
    if(this.normal){
      $scope.normal = true;
      $scope.special = false;
    }else{
      $scope.normal = false;
      $scope.special = true;
    }
    $scope.getStars=function(){
     return new Array($scope.pill.rating);
    };
    $scope.getBlankStars=function(){
      return new Array(5-$scope.pill.rating);
    }

    $scope.go = function(path){
      NavigationService.navigateToNewPageByPath(path);
    }
  }
} 

})(window.angular);
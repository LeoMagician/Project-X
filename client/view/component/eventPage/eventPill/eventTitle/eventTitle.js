(function(angular) {
  'use strict';
angular.module('eventTitle', [])

.component('eventTitle', {
  templateUrl: 'view/component/eventPage/eventPill/eventTitle/eventTitle.html',
  controller: EventTitleController,
  bindings: {
      pill: '='
  }
});

function EventTitleController($scope,NavigationService) {
  this.$onInit = function() {
      $scope.pill = this.pill;
      $scope.selected= "eventTag";
      $scope.like = "showUnlikeIcon";
      
      $scope.changeClass = function(){
        if ($scope.like === "showUnlikeIcon")
          $scope.like = "showLikeIcon";
        else
          $scope.like = "showUnlikeIcon";
      };

      $scope.go = function(path){
        NavigationService.navigateToNewPageByPath(path);
      }
  }
} 

})(window.angular);
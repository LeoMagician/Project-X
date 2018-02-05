(function(angular) {
  'use strict';
angular.module('pageHeader', [])

.component('pageHeader', {
  templateUrl: 'view/component/header/header.html',
  controller: AppHeaderController
});

function AppHeaderController($scope, $location) {
  this.$onInit = function() {
    $scope.searchText = "";
    $scope.search = function(){
        console.log($scope.searchText)
    }
    $scope.isActive = function(route) {
        var path = $location.path().split("/")[1];
        return route === "/" + path;
    }
    $scope.$watch('searchText', function(){ 
        var str = $scope.searchText;
        console.log($scope.searchText)
        if(str.trim().length!=0){
            $scope.showResult = true;
        }else{
            $scope.showResult = false;
        }
    });
  }
} 

})(window.angular);
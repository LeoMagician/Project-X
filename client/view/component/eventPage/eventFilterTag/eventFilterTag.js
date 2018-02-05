(function(angular) {
  'use strict';
angular.module('eventFilterTag', [])

.component('eventFilterTag', {
  templateUrl: 'view/component/eventPage/eventFilterTag/eventFilterTag.html',
  controller: EventFilterTagController,
  bindings: {
    criteria : '='
  }
});

function EventFilterTagController($scope) {
  this.$onInit = function(attrs, element) {
      $scope.criteria = this.criteria;

      $scope.removeFilterTag = function(cri){
        $scope.criteriaMatch(cri);
        for(var i in $scope.$parent.tags){
          if($scope.$parent.tags[i].tag == cri.value){
            if($scope.$parent.tags[i].selected!=null){
              $scope.$parent.tags[i].selected = 'eventTag';
            }
          }else if($scope.$parent.tags[i].free==cri.value){
              console.log($scope.$parent.tags[i]);
              $scope.$parent.tags[i].free = null;
              break;
          }
        }
      };

      $scope.criteriaMatch = function(cri) {
        var index = -1;
        var index2 = -1;
        var boolPorvince = false;
        var boolCity = false;
        if(cri.name=='province') {
          boolPorvince = true;
        }
        if(cri.name=='city'){
          boolCity = true;
        }
        for(var i in $scope.criteria){
          if($scope.criteria[i].value==cri.value){
            index = i;
          }
          if(boolPorvince&&$scope.criteria[i].name=='city'){
              index2 = i
          }
        }
        if(index != -1) {
          $scope.criteria.splice(index, 1);
        }
        if(index2 != -1){
          $scope.criteria.splice(index2-1, 1);
        }
        if(boolPorvince){
          $scope.$parent.GetProvince();
          $scope.$parent.province = "";
          $scope.$parent.cities = "";
          $scope.$parent.citySelector.prop('disabled', 'disabled');
        }
        if(boolCity){
          $scope.$parent.city = "";
        }
        if(cri.name='date') {
          delete $scope.$parent.dt;
        }
    };
  }
} 

})(window.angular);
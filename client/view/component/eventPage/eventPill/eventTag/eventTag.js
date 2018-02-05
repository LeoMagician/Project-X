(function(angular) {
  'use strict';
angular.module('eventTag', [])

.component('eventTag', {
  templateUrl: 'view/component/eventPage/eventPill/eventTag/eventTag.html',
  controller: EventTagController,
  bindings: {
      pill: '=',
      types: '=',
      tag: '=',
  }
});

function EventTagController($scope) {
  this.$onInit = function() {
      $scope.pill = this.pill;
      $scope.types = this.types;
      $scope.selected = "eventTag"
      $scope.tag = this.tag;
      if(this.pill==null){
        if($scope.$parent.tags!=null){
          $scope.$parent.tags.push($scope);
        }
      }
      $scope.changeClass = function(){
        if(this.pill!=null){
        }else{
          if ($scope.selected === "eventTag") {
            $scope.selected = "eventTagSelected";
            if($scope.$parent.criteria!=null){
              $scope.$parent.criteria.push({name:this.tag,value:this.tag});   
            }
          }
          else{
            $scope.selected = "eventTag";
            $scope.$parent.criteriaMatch(this.tag);
          }
        }
      };
      
      $scope.$watch(function(){
        var existed = false;
        for(var i in $scope.$parent.criteria){
            if($scope.$parent.criteria[i].value==$scope.tag){
              $scope.selected = "eventTagSelected";
              existed = true;
              break;
            }
        }
        if(!existed){
          $scope.selected = 'eventTag'
        }
      });

  }
} 

})(window.angular);
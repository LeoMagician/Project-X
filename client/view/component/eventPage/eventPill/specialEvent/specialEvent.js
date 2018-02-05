(function(angular) {
  'use strict';
angular.module('specialEvent', ['eventImage','eventTime','eventTitle'])

.component('specialEvent', {
  templateUrl: 'view/component/eventPage/eventPill/specialEvent/specialEvent.html',
  controller: SpecialEventController,
  bindings: {
      pill: '='
  }
});

function SpecialEventController($scope) {
  this.$onInit = function() {
      $scope.pill = this.pill;
      this.switchValue();
  }

  //Switch Special Event Type
  this.switchValue = function(){
      switch (this.pill.specialType) {
        case 'hitted':
            $scope.specialType = "竞选活动";
            break;
        case 'local':
            $scope.specialType = "当地热门";
            break;
    }
  }
} 

})(window.angular);
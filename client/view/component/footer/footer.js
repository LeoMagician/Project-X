(function(angular) {
  'use strict';
angular.module('pageFooter', [])

.component('pageFooter', {
  templateUrl: 'view/component/footer/footer.html',
  controller: AppFooterController
});

function AppFooterController($scope) {
  this.$onInit = function() {

    jQuery('#followUsqrcode').qrcode({
		text	: "http://google.com",
        width: 120,
        height: 120,
	});	

    $scope.test = function(){
        console.log(1111);
    }
  }
} 

})(window.angular);
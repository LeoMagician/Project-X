(function(angular) {
  'use strict';
angular.module('home-page',['postEvent'])

  .component('homePage', {
    templateUrl: "/view/component/homePage/homePage.html",
    // $routeConfig: [],
    bindings: { $router: '<' },
    controller: HomepageController
  });

  function HomepageController() {

    this.onSelect = function() {
      this.$router.navigate(['EventPage']);
    };

    // this.onSelectPostEvent = function() {
    //   this.$router.navigate(['PostEvent']);
    // }
  }

})(window.angular);
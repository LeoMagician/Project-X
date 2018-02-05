(function (angular) {
  'use strict';
  angular.module('app', ['ngComponentRouter','ngRoute','home-page', 'event-page','pageHeader','pageFooter','event-detail-page'])

  .config(function ($locationProvider, $routeProvider) {    
    $locationProvider.html5Mode(true);
  })

  .value('$routerRootComponent', 'app')

  .component('app', {
    template: '<ng-outlet></ng-outlet>\n',
    $routeConfig: [{
      path: '/',
      name: 'HomePage',
      component: 'homePage',
      useAsDefault: true
    }, {
      path: '/eventPage',
      name: 'EventPage',
      component: 'eventPage'
    }, {
      path: '/postEvent/...',
      name: 'PostEvent',
      component: 'postEvent'
    }, {
      path: '/eventDetail/:eventId',
      name: 'EventDetailPage',
      component: 'eventDetailPage'
    }],
    controller: AppController
  });

  function AppController($scope) {
    this.$onInit = function() {
    
    }
  }

})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
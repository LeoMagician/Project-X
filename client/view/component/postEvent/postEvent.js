(function (angular) {
    'use strict';
    angular.module('postEvent', ['basic-info', 'core-description', 'detailed-info'])

    .component('postEvent', {
        templateUrl: "view/component/postEvent/postEvent.html",
        $routeConfig: [{
            path: '/',
            name: 'BasicInfo',
            component: 'basicInfo',
            useAsDefault: true
        }, {
            path: '/coreDescription',
            name: 'CoreDescription',
            component: 'coreDescription'
        }, {
            path: '/detailedInfo',
            name: 'DetailedInfo',
            component: 'detailedInfo'
        }]
    });

})(window.angular);
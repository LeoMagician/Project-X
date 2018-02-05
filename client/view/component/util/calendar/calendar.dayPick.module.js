(function (angular) {
    'use strict';
    angular.module('dayPick', ['ui.bootstrap'])
        .config(['$provide', Decorate1]);

    function Decorate1($provide) {        

        $provide.decorator('uibDaypickerDirective', function ($delegate) {
            
            var directive = $delegate[0];
            
            directive.templateUrl = "/view/component/util/calendar/calendar.dayPick.template.html";

            return $delegate;
        });
      
    }    
}(window.angular))
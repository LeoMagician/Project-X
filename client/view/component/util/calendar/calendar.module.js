(function (angular) {
    'use strict';
    angular.module('calendar', ['ui.bootstrap'])
        .config(['$provide', Decorate]);

    function Decorate($provide) {
        $provide.decorator('uibDatepickerPopupWrapDirective', function ($delegate) {
            var directive = $delegate[0];
            
            directive.templateUrl = "/view/component/util/calendar/calendar.template.html";

            return $delegate;
        });      

        $provide.decorator('uibDaypickerDirective', function ($delegate) {
            
            var directive = $delegate[0];
            
            directive.templateUrl = "/view/component/util/calendar/calendar.dayPick.template.html";

            return $delegate;
        }); 
      
    }   
    
     
}(window.angular))
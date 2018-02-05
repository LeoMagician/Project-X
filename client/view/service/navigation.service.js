/**
 * Created by wendy on 3/4/16.
 */
(function() {
    angular.module("app")
        .factory("NavigationService", NavigationService);

    function NavigationService($http, $q) {

        var api = {
            navigateToNewPageByPath : navigateToNewPageByPath,
        };
        return api;

        function navigateToNewPageByPath(path){
            window.open(path, '_blank'); // in new tab
        }
       
    }
})();

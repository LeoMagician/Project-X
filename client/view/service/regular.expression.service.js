/**
 * Created by Wenxiao Song on 11/18/16.
 */
(function() {
    angular.module("app")
        .factory("RexService", RexService);

    function RexService($http, $q) {

        var api = {
            rexFromJStoHtml : rexFromJStoHtml,
        };
        return api;

        function rexFromJStoHtml(str){
            var str = $.trim(str);
            str = replaceAll(str, "\n", "<br />");
            return str;
        }

        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        }
       
    }
})();

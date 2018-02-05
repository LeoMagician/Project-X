angular.module("headerSticky", []).directive("headerSticky", function($window) {
  return {
    link: function(scope, element, attrs) {

        var $win = angular.element($window);

        if (scope._stickyElements === undefined) {
            scope._stickyElements = [];

            $win.bind("scroll.sticky", function(e) {
            var pos = $win.scrollTop();
            for (var i=0; i<scope._stickyElements.length; i++) {

                var item = scope._stickyElements[i];
                var init = false;
                if (!item.isStuck && pos > item.start+500) {
                    if(!init){
                        item.element.addClass("headerStuck");
                    }
                item.isStuck = true;
                init = false;
                if (item.placeholder) {
                    item.placeholder = angular.element("<div></div>")
                        .css({height: item.element.outerHeight() + "px"})
                        .insertBefore(item.element);
                }
                runShareEffect();
                }
                else if (item.isStuck && pos < item.start+500) {
                    runShareEffect();
                    // item.element.removeClass("headerStuck");
                    item.isStuck = false;

                    if (item.placeholder) {
                    item.placeholder.remove();
                    item.placeholder = true;
                    }
                    scope.cur = 'eventMain';
                }
                // else if (item.isStuck && pos < item.start+502&& pos > item.start+500) {
                //     runShareEffect();
                // }
            }
            });

            var recheckPositions = function() {
            for (var i=0; i<scope._stickyElements.length; i++) {
                var item = scope._stickyElements[i];
                if (!item.isStuck) {
                item.start = item.element.offset().top;
                } else if (item.placeholder) {
                item.start = item.placeholder.offset().top;
                }
            }
            };
            $win.bind("load", recheckPositions);
            $win.bind("resize", recheckPositions);
        }

        var item = {
            element: element,
            isStuck: false,
            placeholder: attrs.usePlaceholder !== undefined,
            start: element.offset().top
        };

        scope._stickyElements.push(item);

        function runShareEffect(){
            element.slideToggle(200);
        }
    
    }
  };
});
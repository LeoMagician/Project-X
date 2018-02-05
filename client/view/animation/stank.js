angular.module("stank", []).directive("stank", function($window) {
  return {
    link: function(scope, element, attrs) {

      var $win = angular.element($window);

      if (scope._stickyElements === undefined) {
        scope._stickyElements = [];

        $win.bind("scroll.sticky", function(e) {
          var pos = $win.scrollTop();
          for (var i=0; i<scope._stickyElements.length; i++) {

            var item = scope._stickyElements[i];

            if (!item.isStuck && pos > item.start+225 && scope.height>387) {
              if(item.isStuckBottom) {
                item.element.removeClass("specialBottomStuck");
                item.element[0].style.top = null;
              }
              item.element.addClass("specialStuck");
              item.isStuck = true;

              if (item.placeholder) {
                item.placeholder = angular.element("<div></div>")
                    .css({height: item.element.outerHeight() + "px"})
                    .insertBefore(item.element);
              }
            }
            else if (item.isStuck && pos < item.start+225) {
              item.element.removeClass("specialStuck");
              item.isStuck = false;

              if (item.placeholder) {
                item.placeholder.remove();
                item.placeholder = true;
              }
            } else if(item.isStuck && scope.height<387){
              item.element.removeClass("specialStuck");
              item.element.addClass("specialBottomStuck");
              var height = $( "#normalEventSection" ).outerHeight() - 185;
              item.element[0].style.top = ""+height+"px"; 
              item.isStuckBottom = true;
              item.isStuck = false;
            
            }
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
        start: element.offset().top,
        isStuckBottom: false
      };

      scope._stickyElements.push(item);

        $(window).scroll(function () {
          scope.height = $(document).height() - $(window).height() - $(window).scrollTop();
      });
    }
  };
});
angular.module("eventSideSticky", []).directive("eventSideSticky", function($window) {
  return {
    link: function(scope, element, attrs) {

      var $win = angular.element($window);

      if (scope._sideStickyElements === undefined) {
        scope._sideStickyElements = [];

        $win.bind("scroll.sticky", function(e) {
          var pos = $win.scrollTop();
          for (var i=0; i<scope._sideStickyElements.length; i++) {

            var item = scope._sideStickyElements[i];

            if (!item.isStuck && pos >= item.start+22 && scope.sideHeight>=108) {
              if(item.isStuckBottom) {
                item.element.removeClass("sideBottomStuck");
                item.element[0].style.top = null;
                item.element.addClass("sideStuck");
                item.element.addClass("sideStuck2");
                item.isStuck = true;
              }else{
                item.element.addClass("sideStuck");
                item.element.addClass("sideStuck2",100);
                item.isStuck = true;
              }


              if (item.placeholder) {
                item.placeholder = angular.element("<div></div>")
                    .css({sideHeight: item.element.outerheight() + "px"})
                    .insertBefore(item.element);
              }
            }
            else if (item.isStuck && pos < item.start+22) {
              item.element.removeClass("sideStuck2",100);
              item.element.removeClass("sideStuck"); 
              item.isStuck = false;

              if (item.placeholder) {
                item.placeholder.remove();
                item.placeholder = true;
              }
            } else if(item.isStuck && scope.sideHeight<108){
              item.element.removeClass("sideStuck");
              item.element.removeClass("sideStuck2");
              item.element.addClass("sideBottomStuck");
              var sideHeight = $(document).height()-680;
              item.element[0].style.top = ""+sideHeight+"px"; 
              item.isStuckBottom = true;
              item.isStuck = false;
            
            }
          }
        });

        var recheckPositions = function() {
          for (var i=0; i<scope._sideStickyElements.length; i++) {
            var item = scope._sideStickyElements[i];
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

      scope._sideStickyElements.push(item);

        $(window).scroll(function () {
          scope.sideHeight = $(document).height() - $(window).height() - $(window).scrollTop();
          console.log($(document).height());
      });
    }
  };
});
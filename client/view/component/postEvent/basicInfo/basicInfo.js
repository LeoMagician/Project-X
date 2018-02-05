(function (angular) {
    'use strict';
    angular.module('basic-info', ['calendar'])

    .component('basicInfo', {
        templateUrl: "view/component/postEvent/basicInfo/basicInfo.html",
        controller: BasicInfoController
    });

    function BasicInfoController($scope) {
        $scope.hintText = "活动细节页";
        $scope.basicInfo = {
                title: "",
                subtitle: "",
                dt: new Date(),
                dt1: new Date(),
                address: "",
                limitNum: "",
                avgPrice: ""
            }

        //左边栏内容提示
        $scope.showHint = function(section) {
            if (section === 'eventTitle') {
                $scope.hintText = "添加活动标题";
            }
        };


        // 活动名称字数监控
        $scope.$watch("basicInfo.title", function (newValue, oldValue) {
            var titleTemp = $scope.basicInfo.title;
            var titleNum = 0;

            if (titleTemp !== null && !!titleTemp) {
                titleNum = $scope.basicInfo.title.length;
            }
            
            $scope.titleNum = titleNum;
        });

        $scope.$watch("basicInfo.subtitle", function (newValue, oldValue) {
            var subtitleNum = $scope.basicInfo.subtitle.length;
            $scope.subtitleNum = subtitleNum;
        });


        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.open3 = function () {
            $scope.popup3.opened = true;
        };

        $scope.popup3 = {
            opened: false
        };

        $scope.format = "md,y";

        $scope.dateOptions = {            
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };

        $scope.dateOptions1 = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };

        var startDate = "";
        var endDate = "";

        // $scope.dt = new Date();
        // $scope.dt1 = new Date();

        $scope.$watch("basicInfo.dt", function (newValue, oldValue) {
            startDate = $scope.basicInfo.dt;
            $scope.dateOptions1.minDate = new Date(newValue);
            $scope.basicInfo.dt1 = $scope.basicInfo.dt;
        });

        $scope.$watch("basicInfo.dt1", function (newValue, oldValue) {
            endDate = $scope.basicInfo.dt1;
        });                
        
        // initialize input widgets first
        $('#timeRange .time').timepicker({
            'showDuration': true,
            'timeFormat': '  g: i A'
      
        }); 

        // initialize datepair
        $('#timeRange').datepair();

    //    var today = new Date();

        // $('#starttime').timepicker('setTime', '8:00 AM');
        // $('#endtime').timepicker('setTime', '9:00 AM');

        

        // dropdown
        function DropDown(el) {
            this.dd = el;
            this.placeholder = this.dd.children('span');
            this.opts = this.dd.find('ul.dropdown > li');
            this.val = '';
            this.index = -1;
            this.initEvents();
        }

        DropDown.prototype = {
            initEvents: function () {
                var obj = this;

                obj.dd.on('click', function (event) {
                    $(this).toggleClass('active');
                    event.stopPropagation();
                });

                obj.opts.on('click', function () {
                    var opt = $(this);
                    obj.val = opt.text();
                    obj.index = opt.index();
                    obj.placeholder.text(obj.val);
                });
            }
        }

        $(function () {

            var dd = new DropDown($('#dd'));

            $(document).click(function () {
                // all dropdowns
                $('.wrapper-dropdown-2').removeClass('active');
            });

        });

        $scope.nolimit = function() {
            $scope.disableInput = true;
            $scope.basicInfo.limitNum = "";
        }

        $scope.limit = function() {
            $scope.disableInput = false;
        }
    }





})(window.angular);
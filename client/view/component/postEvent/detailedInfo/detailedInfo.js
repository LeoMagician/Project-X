(function (angular) {
    'use strict';
    angular.module('detailed-info', ['froala', 'ui.bootstrap'])

    .value('froalaConfig', {
        toolbarInline: false,
        placeholderText: '请输入您的内容...',
        language: 'zh_cn',
        width: '690',
        height: '242'
    })

    .component('detailedInfo', {
        templateUrl: "view/component/postEvent/detailedInfo/detailedInfo.html",
        controller: DetailedInfoController
    })

    .component('modalComponent', {
        templateUrl: 'eventSubmit.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function ($location) {
            var $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.groupQR = $ctrl.resolve.groupQR;
                $ctrl.shareQR = $ctrl.resolve.shareQR;
            };

            $ctrl.ok = function () {
                $location.path("/eventDetail/1");
                $ctrl.close({
                    // $value: $ctrl.selected.item
                });
            };

            $ctrl.cancel = function () {
                $ctrl.dismiss({
                    $value: 'cancel'
                });
            };
        }
    })

    .directive('coverimgOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.coverimgOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    })

    .directive('sponsorOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.sponsorOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    })

    .directive('guestOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.guestOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    });

    function DetailedInfoController($scope, $uibModal) {

        $scope.guests = [{
            test: 'a'
        }];

        $scope.sponsors = [{
            test: 'a'
        }];

        $scope.detailInfo = {
            titles: [""],
            texts: [""],
            sponsors: [""],
            promo: "",
            participantImg: "",
            sponsorImg: ""
        }

        //add guest listener
        $scope.addGuests = function () {
            var newguesttitle = "titleNum" + this.guests.length - 1;
            this.guests.push({
                newguesttitle: ""
            });
            this.detailInfo.titles.push("");
        };

        //add sponsor listener
        $scope.addSponsors = function () {
            var newsponsortitle = "sponsorNum" + this.sponsors.length - 1;
            this.sponsors.push({
                newsponsortitle: ""
            });
            this.detailInfo.sponsors.push("");
        };

        // 嘉宾字数监控
        $scope.$watch("detailInfo.titles", function (newValue, oldValue) {
            var index;
            for (index in newValue) {
                var titleTemp = $scope.detailInfo.titles[index];
                var titleNum = 0;

                if (titleTemp !== null && !!titleTemp) {
                    titleNum = $scope.detailInfo.titles[index].length;
                }

                $("#guestNameCount" + index).html(titleNum + "/20")

            }
        }, true);

        //嘉宾介绍 字数监控
        $scope.$watch("detailInfo.texts", function (newValue, oldValue) {
            var index;
            for (index in newValue) {

                var textTemp = $scope.detailInfo.texts[index];
                var textNum = 0;

                if (textTemp !== null && !!textTemp) {
                    textNum = $scope.detailInfo.texts[index].length;
                }

                $("#guestIntroCount" + index).html(textNum + "/40")

            }
        }, true);

        //赞助商名称 字数监控
        $scope.$watch("detailInfo.sponsors", function (newValue, oldValue) {
            var index;
            for (index in newValue) {

                var textTemp = $scope.detailInfo.sponsors[index];
                var textNum = 0;

                if (textTemp !== null && !!textTemp) {
                    textNum = $scope.detailInfo.sponsors[index].length;
                }

                $("#sponsorCount" + index).html(textNum + "/20")

            }
        }, true);

        //优惠折扣监控
        $scope.$watch("detailInfo.promo", function (newValue, oldValue) {

            var textTemp = $scope.detailInfo.promo;
            var textNum = 0;

            if (textTemp !== null && !!textTemp) {
                textNum = $scope.detailInfo.promo.length;
            }

            $scope.promoNum = textNum;

        });



        // 文本编辑config
        $scope.froalaOptions = {
            toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertTable', 'undo', 'redo', 'selectAll']
        }

        //封面图片上传
        $scope.uploadCoverImg = function () {
            var input = event.target;
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result)
                    .width(160)
                    .height(90);
            };

            reader.readAsDataURL(input.files[0]);

            $("span.di-lable1").hide();
        };

        //嘉宾图片上传
        $scope.uploadParticipantFile = function () {
            var input = event.target;
            var reader = new FileReader();

            reader.onload = function (e) {
                var fileId = input.id.substring(15);
                $("#participantImg" + fileId)
                    .attr('src', e.target.result)
                    .width(90)
                    .height(90);
            };

            reader.readAsDataURL(input.files[0]);

            // $("span.di-lable3").hide();
        };

        //赞助商图片上传
        $scope.uploadSponsorFile = function () {
            var input = event.target;
            var reader = new FileReader();

            reader.onload = function (e) {
                var fileId = input.id.substring(11);
                $("#sponsorImg" + fileId)
                    .attr('src', e.target.result)
                    .width(90)
                    .height(90);
            };

            reader.readAsDataURL(input.files[0]);

            // $("span.di-lable4").hide();
        };

        //event submit
        var $ctrl = this;
        $ctrl.groupQR = "/../../../images/postEventImg/detailedInfoImg/di-event-pic.png";
        $ctrl.shareQR = "/../../../images/postEventImg/detailedInfoImg/di-event-pic.png";
        $ctrl.animationsEnabled = true;

        $ctrl.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                component: 'modalComponent',
                size: size,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    groupQR: function () {
                        return $ctrl.groupQR;
                    },
                    shareQR: function () {
                        return $ctrl.shareQR;
                    }
                }
            });
        };


    }
})(window.angular);
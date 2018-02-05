(function(angular) {
  'use strict';
angular.module('eventFilter', ['eventTag','sticky','eventFilterTag','calendar'])

.component('eventFilter', {
  templateUrl: 'view/component/eventPage/eventFilter/eventFilter.html',
  controller: EventFilterController,
  bindings: {
    criteria : '='
  }
});

function EventFilterController($scope) {
  this.$onInit = function(attrs, element) {
    $scope.types=[
      "金融","历史","户外","互联网","节日","科技","游戏","美食"
    ];
    $scope.criteria = this.criteria;
    $scope.tags = [];
    $scope.criteriaMatch = function(tag) {
        var index = -1;
        for(var i in $scope.criteria){
          if($scope.criteria[i].name==tag)
            index = i;
        }
        if(index != -1) {
          $scope.criteria.splice(index, 1);
        }
    };
    $scope.tags.push($scope);
    
    //判断是否免费

    $scope.freeOrNot = function(value){
      if($scope.criteria.length==0){
        $scope.criteria.push({name:'free',value:value})
      }else{
        var freeExist = false;
        for(var i in $scope.criteria){
            if($scope.criteria[i].name=='free'){
              freeExist = true;
              if(value=='免费'&& $scope.criteria[i].value=='付费'){          
                $scope.free = '免费';
                $scope.criteria[i].value = '免费';
              }else{
                $scope.free = '付费';
                $scope.criteria[i].value = '付费';
              }
              break;
            }
        }
        if(!freeExist){
            if(value=='免费'){          
              $scope.criteria.push({name:'free',value:value})
              $scope.free = '免费';
              $scope.criteria[$scope.criteria.length-1].value = '免费';
            }else{
              $scope.criteria.push({name:'free',value:value})
              $scope.free = '付费';
              $scope.criteria[$scope.criteria.length-1].value = '付费';
            }
        }
        
      }
    };

        //判断省市筛选

        var provinceSelector = $("#provinceSelector");
        var citySelector = $("#citySelector");
        $scope.citySelector = citySelector;
        $scope.citySelector.prop('disabled', 'disabled');
        $scope.provinceSelector = provinceSelector;
        
        $scope.GetProvince = function() {
            $scope.provinces = provinceInfo;
        }

        $scope.GetProvince();

        $scope.provinceChange = function(){
          var provinceName = $scope.province.name;
            if (provinceName != '') {
                $scope.GetCity(provinceName);
                $scope.citySelector.prop('disabled', false);
                var existed = false;
                for(var i in $scope.criteria){
                  if($scope.criteria[i].name=='province'){
                    $scope.criteria[i].value = provinceName;
                    existed = true;
                  }
                }
                if(!existed){
                  $scope.criteria.push({name:'province',value:provinceName});
                  }
            }
            else{
                citySelector.empty();
            }
        }
        $scope.cityChange = function(){
          if($scope.city!=null){
            var cityName = $scope.city.name;
          if (cityName != '') {
                var existed = false;
                for(var i in $scope.criteria){
                  if($scope.criteria[i].name=='city'){
                    $scope.criteria[i].value = cityName;
                    existed = true;
                  }
                }
                if(!existed){
                  $scope.criteria.push({name:'city',value:cityName});
                  }
            }
          }else{
            var index = -1;
            for(var i in $scope.criteria){
              if($scope.criteria[i].name=='city'){
                index = i;
                break;
              }
            }
            if(index != -1) {
              $scope.criteria.splice(index, 1);
            }
          } 
        }

        $scope.GetCity = function(provinceName) {
            var citySelector = $("#citySelector");
            for (var provinceIndex in provinceInfo) {
                if (provinceInfo[provinceIndex]["name"] == provinceName) {
                    $scope.cities = provinceInfo[provinceIndex]["sub"];
                    break;
                }
            }
            citySelector.empty();
        }
        
        //日期筛选
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.popup2 = {
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

        $scope.initialed = false;

        $scope.$watch("dt", function (newValue, oldValue) {
            $scope.date = $scope.dt;
            var existed = false;
            for(var i in $scope.criteria){
              if($scope.criteria[i].name=='date'){
                var dateStr = $scope.switchDate();
                $scope.criteria[i].value = dateStr;
                existed = true;
              }
            }
            if($scope.initialed) {
              if(!existed){
                if($scope.dt){
                  var dateStr = $scope.switchDate();
                  $scope.criteria.push({name:'date',value:dateStr});
                }
              }
            }else {
              $scope.initialed = true;
            }
            
        });

        $scope.switchDate = function(){
          var date = $scope.date.getDate();
          var month = $scope.date.getMonth()+1;
          var year = $scope.date.getFullYear();
          var dateStr = "" + month + "/" + date + "/" + year;
          return dateStr;
        };


        //展开与收起
        $scope.hide = true;
        $scope.isFolded = '展开';
        $scope.showFilter = function(){
          if($scope.hide){
            $scope.hide = false;
            $scope.isFolded = '收起';
          }else{
            $scope.hide = true;
            $scope.isFolded = '展开';
          }
        };

      
        
  }
} 

})(window.angular);
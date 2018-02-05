(function(angular) {
  'use strict';
angular.module('event-page',['eventPill','specialEvent','eventOrder','eventFilter','stank'])

  .component('eventPage', {
    templateUrl: 'view/component/eventPage/eventPage.html',
    $routeConfig: [
    ],
    controller: EventPageController
  });

function EventPageController($scope,$location,$window) {
  this.$onInit = function() {
   $scope.pills = [
    {
      eventId:1,
      normal: true,
      province: "浙江",
      city: "杭州",
      price: 1000,
      month: 6,
      date: 12,
      registed: 25,
      upper: 50,
      title: '波士顿黑客联谊会',
      subTitle: '波士顿黑客“ 巢 ” 科技社交',
      description: '今晚相约 ZINC 高级公寓一起分享你idea吧~!今晚相约 ZINC 高级公寓一起分享你idea吧~!今晚相约 ZINC 高级公寓一起分享你idea吧~!',
      organization: '中方哥哥的团队',
      rating: 5,
      tags: ["户外","节日"],
      hot:10,
      free: '免费'
    },
    {
      eventId:2,
      normal: true,
      province: "天津",
      city: "天津卫",
      price: 10,
      month: 12,
      date: 1,
      registed: 10,
      upper: 50,
      title: "冬泳",
      subTitle: '冷死你',
      description: '冷死你不偿命。',
      organization: '北京科技会',
      rating: 1,
      tags: ["互联网","科技","VR"],
      hot: 100,
      free: '免费',
    },
    {
      eventId:3,
      normal: false,
      province: "北京",
      city: "东城",
      price: 175,
      month: 7,
      date: 19,
      registed: 17,
      upper: 50,
      title: "2016 中美投融资峰会 VIP 晚宴",
      subTitle: '正能量 相约中秋',
      description: '这里是一到两句话对活动的概要，不知道些什么艾玛，需要限制个字数，同时也要引导用户积极填写。',
      organization: '北京科技会',
      rating: 4,
      tags: ["互联网","科技","VR"],
      specialType: 'local'
    },
    {
      eventId:4,
      normal: false,
      province: "北京",
      city: "东城",
      price: 175,
      month: 1,
      date: 1,
      registed: 17,
      upper: 50,
      title: "MIT：现实，虚拟，黑客马拉松！",
      subTitle: 'Reality, Virtually, Hackathon!',
      description: '这里是一到两句话对活动的概要，不知道些什么艾玛，需要限制个字数，同时也要引导用户积极填写。',
      organization: '北京科技会',
      rating: 4,
      tags: ["互联网","科技","VR"],
      specialType: 'hitted'
    },{
      eventId:5,
      normal: true,
      province: "广东",
      city: "东莞",
      price: 998,
      month: 7,
      date: 7,
      registed: 30,
      upper: 50,
      title: '集体大保健',
      subTitle: '燥起来',
      description: '你值得拥有。',
      organization: '中方哥哥的团队',
      rating: 5,
      tags: ["户外","节日"],
      hot:3,
      free:'付费'
    },{
      eventId:6,
      normal: true,
      province: "北京",
      city: "朝阳",
      price: 20,
      month: 9,
      date: 10,
      registed: 17,
      upper: 50,
      title: "80中返校活动",
      subTitle: '一起吹牛逼',
      description: '你若成功，就来吹牛逼',
      organization: '北京科技会',
      rating: 4,
      tags: ["互联网","美食"],
      hot:2,
      free: '免费'
    }
    ,{
      eventId:7,
      normal: true,
      province: "北京",
      city: "海淀",
      price: 60,
      month: 8,
      date: 31,
      registed: 17,
      upper: 50,
      title: "同一首歌k歌",
      subTitle: '唱起来',
      description: '吼起来',
      organization: '北京科技会',
      rating: 4,
      tags: ["互联网","科技","VR"],
      hot:34,
      free: '免费'
    }
    ];
    $scope.oType = 'month';
    $scope.criteria = [];
    $scope.count = 0;
    $scope.criteriaMatch = function( criteria ) {
      return function( item ) {
        if(criteria.length<=0){
          return item;
        }else{
          var res = $scope.getResult(item, criteria);
          if(res){
            return item;
          }else{
            return;
          }
        }
      };
    };

    $scope.getResult = function(item, criteria) {
      for(var i=0;i<criteria.length;i++){
        switch(criteria[i].name){
          case 'date': {
            var str = criteria[i].value.split('/');
            if(item.month!=str[0]) {
              return false;
            }
            if(item.date!=str[1]){
              return false;
            }
            break;
          }
          case 'free': {
            if(item.free!=criteria[i].value)
            return false;
            break;
          }
          case 'province': {
            if(item.province!=criteria[i].value)
            return false;
            break;
          }
          case 'city': {
            if(item.city!=criteria[i].value)
            return false;
            break;
          }
          default: {
            var mySet = new Set(item.tags);
            if(!mySet.has(criteria[i].value)){
              return false;
            }
            break;
          }
        }      
      }
      return true;
    };

    function navTobyPath(path) {
        window.open(path, '_blank'); // in new tab
    };
  }
} 

})(window.angular);

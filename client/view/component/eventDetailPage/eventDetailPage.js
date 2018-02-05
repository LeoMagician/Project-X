(function(angular) {
  'use strict';
angular.module('event-detail-page',['eventTag','headerSticky','eventSideSticky'])

  .component('eventDetailPage', {
    templateUrl: 'view/component/eventDetailPage/eventDetailPage.html',
    $routeConfig: [
    ],
    controller: EventDetailPageController
  });

function EventDetailPageController($scope, RexService,$window) {
  this.$onInit = function(next) {
    $scope.count = 1;

    $scope.apply = function(){
      console.log('apply');
    }

    $scope.like = "showFavoriteIcon";

    $scope.test = function(){
      console.log('test');
    }
      
    $scope.changeClass = function(){
      if ($scope.like === "showFavoriteIcon")
        $scope.like = "showFavoriteClickedIcon";
      else
        $scope.like = "showFavoriteIcon";
    };

    $scope.share === false
    $( "#shareEffect" ).hide();
    $scope.runShareEffect = function(){
      var options = {};
      if (!$scope.share) {
        //$scope.shareButton = 'hide';
        options = { direction: 'right' };
        $( "#shareEffect" ).show( 'slide', options, 500, callback );
        $scope.share = true;
      }
      else {
        //$scope.shareButton = 'show';
        options = { direction: 'right' };
        $( "#shareEffect" ).hide( 'slide', options, 500, callback );
        $scope.share = false;
      }
    }

    $scope.getStars=function(){
     return new Array($scope.data.rating);
    };
    $scope.getBlankStars=function(){
      return new Array(5-$scope.data.rating);
    }

    function callback(){
      console.log("call back");
    }

    $scope.changeNumber = function(plus){
      if(plus){
        $scope.count += 1;
      }else {
        if($scope.count!=1){
          $scope.count -= 1;
        }
      }
    }

   // $scope.cur = 'eventMain';
    $scope.navigate= function(pos){
      if(pos=='eventDetail'){
        $('html,body').animate({
        scrollTop: $('#'+pos).offset().top-50},
        'slow');
      }else if(pos=='eventMap'){
        $('html,body').animate({
        scrollTop: $('#'+pos).offset().top-50},
        'slow');
      }else {
        $('html,body').animate({
        scrollTop: $('#'+pos).offset().top+30},
        'slow');
      }
    }

    //Get three part top location
    var mapPos = $('#eventMap').offset().top;
    var mainPos = $('#eventMain').offset().top;
    var detailPos = $('#eventDetail').offset().top-50;


      $(window).scroll(function () {
          $scope.distanctToBot = $(document).height() - $(window).height() - $(window).scrollTop();
          $scope.height =$(window).scrollTop();
          if($scope.height<mainPos){
            $( "#main" ).addClass( "show" );
            $( "#map" ).removeClass("show");
            $( "#detail" ).removeClass("show");
          }else if($scope.height>=mainPos&&$scope.height<detailPos){
            $( "#main" ).addClass( "show" );
            $( "#map" ).removeClass("show");
            $( "#detail" ).removeClass("show");
          }else if($scope.height>=detailPos&&$scope.distanctToBot>=134) {
            $( "#detail" ).addClass( "show" );
            $( "#map" ).removeClass("show");
            $( "#main" ).removeClass("show");
          }else if($scope.distanctToBot<134){
           $( "#map" ).addClass( "show" );
           $( "#main" ).removeClass("show");
           $( "#detail" ).removeClass("show");
          }
      });

  }

   this.$routerOnActivate = function(next) {
        $scope.eventId = next.params.eventId;
        $scope.data = $scope.getDataById($scope.eventId);

        //will be changed when figure it out the textarea input
        $scope.data = modifyStr($scope.data);
        showDetailInfo($scope.data);
        mapDisplay($scope.data);
   }

   $scope.getDataById = function(eventId){
     //Will be replaced by http request when we are dealing with the back end and the database
     var fakeData = [
    {
      eventId:1,
      normal: true,
      province: "北京",
      city: "朝阳",
      location: "北京市朝阳区工人体育场北路甲2号",
      price: 1000,
      month: 6,
      date: 12,
      registed: 25,
      upper: 50,
      title: '波士顿黑客联谊会',
      subTitle: '波士顿黑客“ 巢 ” 科技社交',
      description: '今晚相约 ZINC 高级公寓一起分享你idea吧~!今晚相约 ZINC 高级公寓一起分享你idea吧~!今晚相约 ZINC 高级公寓一起分享你idea吧~!',
      organization: '中方哥哥的团队',
      rating: 4,
      tags: ["互联网","社交","VR"],
      hot:10,
      free: '免费',
      detail: {
        process: '黑客“ 巢 ” 将为您提供一个有趣、放松的与科技社区交流的机会。我们的科技社交将在一个友好、谦逊、无议程、无推销的轻松氛围中展开。届时，来自四面八方的极其聪明的科技高手即将汇集在一起，分享自己的科技经验及心路历程。\n 本次活动还会将为您提供免费的矿泉水、啤酒以及红酒。\n \n'+
                '具体时间安排\n' + '8：00 	宾客开始入场 \n ' + '9：00 	活动正式开始 \n ' + '然后就是各种文字啊图片啊 \n ' +
                '识安济适从京包每是效备集解，间资只统计大深速其阶办无，联式深医坝我片列8与枕。组平适林市被响始片，更管		东边养者或三即，儿收求投询适路议。 机口三别示土装据专积，收民例部进率选不，色品孟约伴清奇吹。\n ' +
                '11：00 	里角了龙保王照程说满研，光治史无将节则线计，位约材雨力凝西始始。 就名决育亲速级完，新数以B知书。 无影压13：00	满流区计验育越义共起分，流马达要查电询路明规别制。 料厂风子工头白此，验劳传改革选三证，十届住由能居。指更他准者认及，门立家再全照入，查L歼片兵。\n ' +
                '17：00	接五色提内参公地养社酸因，电观因日我辰1隶前杏。\n\n' +
                '准却属种水手这\n' +
                '识建青共实往劳且，资建4设劫枕。铁色象口这必部无，矿斯地间军新积，月陕抗具扯族。车南极权水状写青说，线酸京市处马第至层一，术面两便惹柜名点。 科际定权群长在却，八设文养须二期名律，一更蠢及界之地。 素研内打改候除提构红，增济军素状斗华科适，做这O皂领茄交展。 历名着验酸务传，少才大军事马，图H可过员。',
        participant: '😈着装【自备Halloween服饰】\n🎃要求👻👹鬼魅内涵+气质性感+品味高雅💘 \n 🎃不符合着装要求的，可以自备三个表演节目😂😂 \n' 
        + '🎃现场投票评出最佳着装奖等，根据情况减免预付款💰😉\n\n' + 
        '识建青共实往劳且，资建4设劫枕。铁色象口这必部无，矿斯地间军新积，月陕抗具扯族。车南极权水状写青说，线酸京市处马第至层一，术面两便惹柜名点。 科际定权群长在却，八设文养须二期名律，一更蠢及界之地。 素研内打改候除提构红，增济军素状斗华科适，做这O皂领茄交展。 历名着验酸务传，少才大军事马，图H可过员。',
        notice: '1 	识建青共实往劳且，资建4设劫枕。铁色象口这必部无，矿斯地间军新积\n2	月陕抗具扯族。车南极权水状写青说，线酸京市处马第至层一，术面两便惹柜名点。 科际定权群长在却，八设文养须二期名律，一更蠢及界之地。 素研内打改候除提构红，增济军素状斗华科适，做这O皂领茄交展。 历名着验酸务传，少才大军事马，图H可过员。',
        discount: '活动开始前3天报名可享受8折早鸟价格',
        discountNum: 'UXDODSGVC',
        guests: [
          {guestName: '马云',guestIntro: '阿里巴巴董事长，阿里巴巴创始人',guestImg:'images/testimg/guest1.jpg'},
          {guestName: '李彦宏',guestIntro: '百度董事长，百度董事长，百度CEO',guestImg:'images/testimg/guest2.jpg'},
          {guestName: '雷军',guestIntro: '雷布斯，知名网红，Are you OK?',guestImg:'images/testimg/guest3.jpg'},
          {guestName: '扎克伯格',guestIntro: 'Facebook创始人',guestImg:'images/testimg/guest4.jpeg'}
        ],
        sponsors: [
          {sponsorName:'恒丰科技什么东西十九',sponsorImg:'images/testimg/xiaomi.png'},
          {sponsorName:'星巴克咖啡，星巴克咖啡有限公司',sponsorImg:'images/testimg/starbucks.jpeg'}
        ]
      }
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
    }]

    var data;
    for(var i = 0;i<fakeData.length;i++){
        if(fakeData[i].eventId == eventId){
          data = fakeData[i];
        }
    }
    return data;
    // replace above
   }

   function modifyStr(data) {
     if(data.detail.process!=null) {
       data.detail.process = RexService.rexFromJStoHtml(data.detail.process);
     }
     if(data.detail.participant!=null) {
       data.detail.participant = RexService.rexFromJStoHtml(data.detail.participant);
     }
     if(data.detail.notice!=null) {
       data.detail.notice = RexService.rexFromJStoHtml(data.detail.notice);
     }
     if(data.detail.discount!=null) {
       data.detail.discount = RexService.rexFromJStoHtml(data.detail.discount);
     }
     return data;
  }

    function showDetailInfo(data) {
        if(data.detail.participant!=null) {
          $scope.participant = true;
          $(".event-detial-info-partial-participant").html($scope.data.detail.participant).show();
        }
        if(data.detail.notice!=null) {
          $scope.notice = true;
          $(".event-detial-info-partial-notice").html($scope.data.detail.notice).show();
        }
        if(data.detail.discount!=null) {
          $scope.discount = true;
          $(".event-detial-info-partial-discount").html($scope.data.detail.discount).show();
          $(".event-detial-info-partial-discountNum").html($scope.data.detail.discountNum).show();
        }
        if(data.detail.guests!=null) {
          $scope.guests = true;
        }
        if(data.detail.sponsors!=null) {
          $scope.sponsors = true;
        }
        $(".event-detial-info-partial-process").html($scope.data.detail.process).show();
    } 

    function mapDisplay(data) {
        var map = new BMap.Map("container");    
        var local = new BMap.LocalSearch("北京市",   
              {renderOptions: {map: map,autoViewport: true},pageCapacity: 8});      
        local.search(data.location);
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}    
        map.addControl(new BMap.NavigationControl(opts));
    }
} 

})(window.angular);

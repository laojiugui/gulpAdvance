//js的入口文件

//引入zepoto
var $ = require('./components/zepto-modules/_custom');

//引入iscroll
var IScroll=require("./components/iscroll/iscroll.js");

$(".swiper-container").hide();
$("#mainContent").hide();

$("#enter").tap(function(){
	// alert("tap")
  $(".swiper-container").hide();
  $("#mainContent").show();
  
  

  $.post('/api/skill', {}, function(response){

      var html="";
      for(var i=0;i<response.length;i++){
        html+="<li>"+response[i].category+"</li>"
      }

        $("#scroller ul").html(html)
    // console.log(html)
  // process response
    //调用iscroll
    myScroll = new IScroll('#wrapper', { scrollbars: true,mouseWheel: true, });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
   
   })
       
})



//引入jq文件
var jq= require('./common/libs/jquery-1.12.4.min.js');
// console.log(jq("p").length);
var swiperSideH=jq(window).height();
	jq(".swiper-container").height(swiperSideH);




//引入swiper
var Swiper=require("./components/swiper/swiper-3.3.1.min.js");

//引入swiper animate
var SwiperAnimate=require("./components/swiper/swiper.animate1.0.2.min.js");

var mySwiper = new Swiper ('.swiper-container', {
	 preventLinksPropagation : false,
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
  })        

// console.log(Swiper);

$("#footer div").tap(function(){
    var apiTarget=$(this).attr("id");

    $.post('/api/'+apiTarget, {}, function(response){

      var html="";
      for(var i=0;i<response.length;i++){
        html+="<li>"+response[i].category+"</li>"

      }

        $("#scroller ul").html(html)
    // console.log(html)
  
   })

})


var interval=setInterval(function(){
  if(document.readyState==="complete"){
    clearInterval(interval);
    $("#preload").hide();
    $(".swiper-container").show();
    mySwiper.updateContainerSize();
    mySwiper.updateSlidesSize();
  }else{
    $("#preload").show();
  }
})







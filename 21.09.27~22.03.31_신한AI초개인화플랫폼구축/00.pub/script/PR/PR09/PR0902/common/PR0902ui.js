 /********************************************************************
* @업무명		: 
* @설명 		: 
* @파일명		: PR0902ui.js
*********************************************************************
* 번호	작업자		작업일			변경내용
*--------------------------------------------------------------------
* 1		노소영
*********************************************************************/




/*********************************************************************
 * list motion 
 * 
 * 화면 안밖 영역 확인 후 화면으로 진입 시 모션적용
*********************************************************************/
var pwmScrMotion = {
	init : function(){
		this.bindEvt();
	},
	bindEvt : function(){
		pwmScrMotion.updownMotion(); // 새로고침 or 화면 진입 시 모션
		$('.contents , .layerCon').on("scroll", function(e){
			$(".pwmListMotion").each(function(inx,ele){
				if(!ele){return}
				if(pwmScrMotion.updownPos(ele, -20)){
					$(ele).css({"opacity":"0", "transform":"translateY(100px)","transition":"transform 0.7s, opacity 1s"});
				}else{
					$(ele).css({"opacity":"1", "transform":"translateY(0px)","transition":"transform 0.7s, opacity 1s"});
				}
			});
		});
	},
	updownPos : function(ele,trigerDiff){
		var posTop = ele.getBoundingClientRect();
		var innerHeight = $(window).height();
		return posTop.top > innerHeight + (trigerDiff || 0);
	},
	updownState : function(ele,trigerDiff){
		var offset = ele.getBoundingClientRect();
		var innerHeight = $(window).height() + $(window).scrollTop();
		var isScrYN = false;
		if(offset.top >= 0) {
			if(offset.bottom <= innerHeight + (trigerDiff || 0) || offset.top < innerHeight) isScrYN = true; 
		}
		return isScrYN;
	},
	updownMotion : function(){
		var pwmListMotionTime = 0;
		$(".pwmListMotion").each(function(inx,ele){
			if(!ele){return}
			var pwmBoxMotion = false;
			if(pwmScrMotion.updownState(ele, 0)){
				pwmBoxMotion = true;
				pwmListMotionTime += 500;
			}
			if(pwmBoxMotion){
				$(ele).animate({
					opacity:0
					},
					{duration : pwmListMotionTime,
					start : function(){
						$(ele).css({"opacity":"0", "transform":"translateY(100px)","transition":"transform 0.7s, opacity 1s"});
					},
					complete : function(){
						$(ele).css({"opacity":"1", "transform":"translateY(0px)","transition":"transform 0.7s, opacity 1s"});
					}
				}, 500);
			}
		});
	}
}

/*********************************************************************
 * Accordian toggle - 체크박스 기능 or 라디오 기능
 * 
 * 체크박스 기능 : wrap class (.pwmChkArea/.pwmChkFtn) / btn class (.pwmClick/.pwmChkClick)
 * 라디오 기능 : wrap class (.pwmRadFtn) / btn class (.pwmRadClick)
*********************************************************************/
var pwmAccordian = {
	init : function(){
		this.bindEvt();
	},
	eventObj : {
		eventChkWrap : '.pwmChkArea',
		eventChkBtWrap : '.pwmChkFtn',
		eventRadBtWrap : '.pwmRadFtn',
	},
	bindEvt : function(){
		var _this = this;
		var clickChkTg = $(_this.eventObj.eventChkWrap);
		var clickChkBt = $(_this.eventObj.eventChkBtWrap);
		var clickRadBt = $(_this.eventObj.eventRadBtWrap);
		for(var i=0;i<clickChkTg.length;i++){
			 var ele = clickChkTg[i];
			 $(ele).off('click').on('click', '.pwmClick', function(e){
				e.preventDefault();
				_this.checkToggle(e);
			});
		}
		for(var i=0;i<clickChkBt.length;i++){
			 var ele = clickChkBt[i];
			 $(ele).off('click').on('click', '.pwmChkClick', function(e){
				e.preventDefault();
				_this.checkBtn(e);
			});
		}
		for(var i=0;i<clickRadBt.length;i++){
			 var ele = clickRadBt[i];
			 $(ele).off('click').on('click', '.pwmRadClick', function(e){
				e.preventDefault();
				_this.radioBtn(e);
			});
		}
	},
	checkToggle : function(e){
		if($(e.target).closest(this.eventObj.eventChkWrap).hasClass('active')){
			$(e.target).closest(this.eventObj.eventChkWrap).removeClass('active');
		}else{
			$(e.target).closest(this.eventObj.eventChkWrap).addClass('active');
		}
	},
	radioBtn : function(e){
		$(e.target).addClass('active').siblings().removeClass("active");
	},
	checkBtn : function(e){
		if($(e.currentTarget).hasClass('active')){
			$(e.currentTarget).removeClass('active');
		}else{
			$(e.currentTarget).addClass('active');
		}
	}
}

/*********************************************************************
 * layer close
 * 
 * small  : 가운데 레이어 딤처리시 닫힘
 * 나머지 이벤트 모두 신한 레이어팝업 이벤트에 따름
*********************************************************************/
var pwmPopEvt = {
	bLoad : false,
	init : function(){
		if(this.bLoad){
			return;
		}
		this.bindEvt();
		this.bLoad = true;
	},
	bindEvt : function(){
		var _this = this;
		// 가운데 열림 레이어시 딤영역 닫힘
		$('.small.hasDim:not([class*="dimNoneClick"])').off('click').on('click', function(e){
			$(this).delay(100).fadeOut('fast');
		});
		// 팝업 중첩 대응
		$(".pwmPopSt").each(function(inx, ele){
			var inx;
			$(ele).find(".btnPopOpen").on('click', function(e){
				inx += 10;
				var objIndex = parseInt($(ele).css('z-index'));
				$($(e.target).attr('href')).css("z-index", inx+objIndex);
			});
		});
	}
}

/*********************************************************************
 * tab Event
 * 
 * pwmTab+class 사용으로 분리 가능
*********************************************************************/
var pwmTab = {
	bLoad : false,
	init : function(){
		if(this.bLoad){
			return;
		}
		this.bindEvt();
		this.bLoad = true;
	},
	bindEvt : function(){
		var _this = this;
		if($('[class^="pwmTab"]').length){
			$(".pwmTab > a.on").attr("title","현재 선택됨");
		}
		$(document).on('click','[class^="pwmTab"] > a', function(e){
			e.preventDefault();
			_this.tabToggle(e);
		});
		// 바닥 페이지에서 레이어 열고 스크롤 후 닫음 ==> 바닥페이지에서 재오픈 시 레이어 스크롤 상단으로 이동
		$(document).on('click', '.contentsWrap .btnPopOpen', function(){
			$(".pwmPopSt .scrInner").scrollTop(0);
			$(".pwmPopSt .layerCon").scrollTop(0);
		});
		// 총자산분석 팝업 (클릭 시 팝업 내 탭이동)
		$('.pwmTabGo li a').off('click').on('click', function(e){
			_this.popOpenTab(e);
		});
	},
	tabToggle : function(e){
		if($('[class^="pwmTab"]').length){
			$("[class^='pwmTab'] > a").removeAttr("title");
			$(e.currentTarget).attr("title","현재 선택됨");
			$(e.currentTarget).addClass("on").siblings().removeClass("on");
			$($(e.currentTarget).attr('href')).addClass("on").siblings().removeClass("on");
			$(".pwmPopSt .scrInner").scrollTop(0);// 레이어팝업 내부 고정된 탭 클릭 시 상단이동
			$(".pwmViewList").closest(".contents").scrollTop(0);
			return false;
		}
	},
	popOpenTab : function(e){
		var idx = 0;
		$('.pwmTabGo li').each(function(idx){
			if($(e.currentTarget).attr('data-tab') == idx){
				$('.pwmTab > a').eq(idx).addClass("on");
				$('.tabView').eq(idx).addClass("on");
			}else{
				$('.pwmTab > a').eq(idx).removeClass("on");
				$('.tabView').eq(idx).removeClass("on");
			}
		});
	}
}

/*********************************************************************
 * DublieSlide motion 
 * 
 * pwmDublieSlide class 분리로 다중 사용
*********************************************************************/
var pwmDublieSlide = {
	init : function(){
		this.bindEvt();
	},
	bindEvt : function(){
		$('.pwmDublieSlide').each(function(inx,ele){
			if(!ele){return}
			var $tabBtn = $('.pwmDublieBtn').eq(inx);
			var $slide = $tabBtn.find('.swiper-slide');
			var $tabCont = $('.pwmDublieCont').eq(inx);
			var pwmDublieTop = new Swiper($tabBtn, {
				observer : true, 
				observeParents : true, 
				slidesPerView : 5,
				resistance:false,
				onInit: function(swiper){
					$($slide).eq(0).addClass("on");
					$($slide).on("click", function(e){
						$(e.target).attr("title", "현재 선택됨").siblings().removeAttr("title");
						pwmDublieCont.slideTo($(e.target).index());
					});
				}
			});
			var pwmDublieCont = new Swiper($tabCont, {
				observer : true,
				observeParents : true,
				slidesPerView : 'auto',
				spaceBetween : 10,
				centeredSlides : true,
				onSlideChangeEnd: function (swiper) {
					$($slide).eq(swiper.activeIndex).addClass('on').attr("title", "현재 선택됨").siblings().removeClass('on').removeAttr("title");
					pwmDublieTop.slideTo(swiper.activeIndex);
				}
			});
		});
	}
}


/*********************************************************************
 * pwmSwiper
 * 
 * 
*********************************************************************/
var pwmSwiper;
var pwmSlide = {
	init : function(){
		this.bindEvt();
	},
	bindEvt : function(){
		$('.swiperBox').each(function(inx,ele){
			var dataSlide = $(ele).attr("data-swiper");
			if(!pwmSwiper)pwmSwiper={};
			var dataSlideObj = {};
			$(".swiper-pagination",ele).addClass("swiper-pagination-"+dataSlide);
			
			if(dataSlide=="pwmMbShipListView"){
				dataSlideObj.slidesPerView="auto";
				dataSlideObj.spaceBetween=20;
				dataSlideObj.centeredSlides=true;
				dataSlideObj.paginationClickable= true;
				dataSlideObj.pagination=".swiper-pagination-"+dataSlide;
			}else if(dataSlide=="pwmListLink"){
				dataSlideObj.slidesPerView="auto";
				dataSlideObj.spaceBetween=8;
				dataSlideObj.observer= true;
				dataSlideObj.observeParents= true;
				dataSlideObj.onInit = function(){
					$(ele).find(".swiper-slide").eq(0).addClass("on");
					$(ele).on("click", ".swiper-slide", function(e){
						$(this).addClass("on").siblings().removeClass("on");
					});
				}
			}
			pwmSwiper[dataSlide] = new Swiper(ele, dataSlideObj);
			pwmSwiper[dataSlide].update();
		});
	}
}

/*********************************************************************
 * 포트폴리오 : 기간선택-기간설정
 * 
 * 
*********************************************************************/
var pwmPeriodSet = {
	init : function(){
		this.bindEvt();
	},
	bindEvt : function(){
		$(document).on('change','.toggleRadWrap :radio',function(e){
			var idx = $(e.target).closest('span').index();
			var evtCont = $(e.target).parents('.toggleRadWrap').next();
			if($(e.target).parents('.toggleRadWrap').hasClass("updownTy")){
				if(idx == 2){
					$(evtCont).addClass("active");
				}else{
					$(evtCont).removeClass("active");
				}
			}
		});
	}
}

/*********************************************************************
 * 포트폴리오 : 목표수익률 알람설정 스크립트
 * 
 * 
*********************************************************************/
var pwmAlarmSet = {
	init : function(){
		this.bindEvt();
	},
	bindEvt : function(){
		$(document).on('change','.toggleRadWrap :radio',function(e){
			var idx = $(e.target).closest('span').index();
			var evtCont = $(e.target).parents().next();
			// 목표수익률 +,- 선택
			if($(e.target).parents('.toggleRadWrap').hasClass("chuTy")){
				if(idx == 0){
					$(evtCont).addClass("plus").removeClass("minus");
				}else{
					$(evtCont).addClass("minus").removeClass("plus");
				}
			}
			// 알람선택
			if($(e.target).parents('.toggleRadWrap').hasClass("alarmTy")){
				if(idx == 1){
					$(evtCont).addClass("disabled");
					$(evtCont).find('input').attr("disabled","disabled");
					$(e.target).parents('.layerCon').next(".btnGroupBox a").attr("disabled","disabled");
				}else{
					$(evtCont).removeClass("disabled");
					$(evtCont).find('input').removeAttr("disabled","");
				}
			}
			return false;
		});
		$(document).on('keyup keydown focus','.toggleRadCont .pwmFormArea input[type=number]',function(e){
			if($(e.target).val().length == 0 || $(e.target).prop('disabled')){
				$(e.target).parents('.layerCon').next().find("a").attr("disabled","disabled");
			}else{
				$(e.target).parents('.layerCon').next().find("a").removeAttr("disabled");
			}
		});
	}
}

/*********************************************************************
 * Floating 스크롤 이벤트 : pwmFloatingSrc
 * 
*********************************************************************/
var pwmLastScrollTop = 0;
var pwmFloatingSrc = {
	init : function(){
		this.bindEvt();
	},
	bindEvt : function(){
		if($(window).height() >= $('.contents .pwmViewList').height()){
			$(".pwmFloatingM").css({"bottom":"0"});//"transition" 제거
		}else{
			$(".pwmFloatingM").css("bottom","");
			$('.contents').scroll(function(e){
				var pwmst = $(e.target).scrollTop();
				var innerHeight = $(e.target).innerHeight();
				var scrollHeight = $(e.target).prop('scrollHeight');
				if(pwmst >= pwmLastScrollTop || pwmst + innerHeight >= scrollHeight){ //down
					$(".pwmFloatingM").css("bottom","0");
				}else{ //up
					$(".pwmFloatingM").css("bottom","");
				}
				pwmLastScrollTop = pwmst;
			});
		}
	}
}

/*********************************************************************
 * 멤버십 화면 스크롤 이벤트 : pwmMbShipScr
 * 
*********************************************************************/
var pwmMbShipScr = {
	init : function(){
		this.bindEvt();
	},
	bindEvt : function(){
		
		// 배너형 : 컨텐츠 영역 변경
		$(".pwmMbShipListView ~ .pwmMbShipCont").css({"padding-top": $(".pwmMbShipTit").outerHeight() + "px" , "top": $(".pwmMbShipSlide").height() + "px"});
		$(".pwmMbShipListView ~ .pwmMbShipTit").css({"position":"absolute","top": $(".pwmMbShipSlide").outerHeight() + $(".pwmMbShipImgFiexd").outerHeight() + "px", "bottom":"initial"});
		
		$('.pwmMbShipScr').off("scroll").on("scroll", function(e){
			var pwmSCR = $(this).scrollTop(),
				pwmHeaderH = $("header").height(),									// header 높이
				pwmMbShipScrH = $(".pwmMbShipScr").height(),						// 전체 내용 스크롤 높이
				PwmMbTitBt = $(".pwmMbShipTit").css("bottom"),						//
				PwmMbTitBT = Number(PwmMbTitBt.substring(0,PwmMbTitBt.length-2)),	// 백그라운드형 시 타이틀 하단 공간
				pwmMbSlideH = $(".pwmMbShipSlide").height(), 						// 슬라이드 높이
				pwmMbTitH = $(".pwmMbShipTit").height(),							// 타이틀 높이
				pwmMbTitOutH = $(".pwmMbShipTit").outerHeight(),					// 타이틀 디자인 높이
				pwmMbTitPos = $(".pwmMbShipTit").offset().top, 						// 타이틀 포지션
				pwmMbShipEmH = $(".pwmMbShipContIn em").outerHeight(),				// 포인트 영역 높이
				pwmMbMinContH = pwmMbTitOutH + pwmMbShipEmH,						// 타이틀 공간높이 + 포인트공간 높이
				pwmImgH = $(".pwmMbShipImgFiexd").outerHeight(),					// 백그라운드 or 배너형 이미지 높이
				pwmBottmBtn = $(".btnGroupBox a").height(),							// 신청하기 버튼 높이
				pwmMbWinH = $(window).height()/2; 
				
			// 슬라이드 덮을 시 이미지 100%
			if(pwmSCR >= pwmMbSlideH){
				$(".pwmMbShipImgFiexd").css({"position":"fixed", "top": pwmHeaderH + "px"});
				$(".pemMbTopBtn").css({"opacity":"1", "bottom": "86px"});
				$(".pwmMbShipListView ~ .pwmMbShipCont").css({"top": pwmMbSlideH + pwmImgH + "px", "padding-top": pwmMbTitOutH + "px"});
				$(".pwmMbShipListView ~ .btnGroupBox").css({"opacity":"1", "bottom": "0"});
			}else{
				$(".pwmMbShipImgFiexd").css({"position":"relative", "top": pwmMbSlideH + "px"});
				$(".pemMbTopBtn").css({"opacity":"0","bottom":"0"});
				$(".pwmMbShipListView ~ .pwmMbShipCont").css({"top": pwmMbSlideH + "px","padding-top": pwmMbTitOutH + "px"}); 
				$(".pwmMbShipListView ~ .btnGroupBox").css({"opacity":"0", "bottom":- pwmBottmBtn + "px"});
			}
			// 타이틀 영역 포지션 후 상세 보이기
			if(pwmSCR > pwmMbSlideH + PwmMbTitBT + 12){ // 디자인 타이틀 여백 : 12 디자인 디테일 맞춤
				$(".pwmMbShipTit").css({"color":"#333"});
			}else{
				$(".pwmMbShipTit").css({"color":"#fff"});
			}
			// 하단 방향표시
			if(pwmSCR > pwmMbSlideH + 20){ // 하단방향아이콘 하단 여백 : 20 디자인 디테일 맞춤
				$(".pwmMbShipArrow").css({"opacity":"0"});
			}else{
				$(".pwmMbShipArrow").css({"opacity":"1"});
			}
			// 백그라운드형일때 상세 상단 높이보다 스크롤이 클때 상세 시작
			if(pwmSCR > pwmMbTitOutH + pwmMbSlideH + 130){// 디자인 타이틀 영역 하단여백 : 130 디자인 변경 시 꼭 변경
				// 스크롤 최상단확인 상세내용영역 내부스크롤
				if(pwmSCR > pwmMbShipScrH + pwmMbSlideH - pwmHeaderH){
					$(".pwmMbShipImg ~ .pwmMbShipTit").css({"position":"fixed","top": pwmHeaderH + "px", "bottom":"initial", "background":"#fff"});
					$(".pwmMbShipImg ~ .pwmMbShipCont .pwmMbShipContIn em").css({"position":"fixed", "top": pwmMbTitOutH + pwmHeaderH  - 1 + "px"});
					$(".pwmMbShipImg ~ .pwmMbShipCont .pwmMbShipInSrc").css({"padding-top": pwmMbShipEmH + "px", "min-height":"calc(100vh - " + pwmMbMinContH + "px)"});
					$(".pwmMbShipImg ~ .pwmMbShipCont .pwmMbShipContIn").css({"min-height": "100vh"});
				}else{
					$(".pwmMbShipImg ~ .pwmMbShipTit").css({"bottom": - (pwmMbTitOutH + 150) + "px","position":"absolute", "top":"initial", "background":"transparent"});
					$(".pwmMbShipImg ~ .pwmMbShipCont .pwmMbShipContIn em").css({"position":"relative","top":"initial"});
					$(".pwmMbShipImg ~ .pwmMbShipCont .pwmMbShipInSrc").css({"padding-top":"0px", "min-height":"calc(100vh - " + pwmMbMinContH + "px)"});
					$(".pwmMbShipImg ~ .pwmMbShipCont .pwmMbShipContIn").css({"min-height": "100vh"});
				}
			}else{
				$(".pwmMbShipImg ~ .pwmMbShipTit").css({"bottom": "130px","position":"fixed"});// 백그라운드형일대 타이틀 : 130 디자인 변경 시 꼭 변경
				$(".pwmMbShipListView ~ .pwmMbShipTit").css({"position":"absolute","top":pwmMbSlideH + pwmImgH + "px", "bottom":"initial"});//배너형일때 타이틀
			}
			// 배너형일때 최상단확인 상세내용영역 내부스크롤
			if(pwmSCR >= pwmImgH + pwmMbSlideH){
				$(".pwmMbShipListView ~ .pwmMbShipTit").css({"position":"fixed","top": pwmHeaderH + "px", "bottom":"initial"});
				$(".pwmMbShipListView ~ .pwmMbShipCont .pwmMbShipContIn em").css({"position":"fixed", "top": pwmMbTitOutH + pwmHeaderH - 1 + "px"});
				$(".pwmMbShipListView ~ .pwmMbShipCont .pwmMbShipInSrc").css({"padding-top": pwmMbShipEmH + "px", "min-height":"calc(100vh - " + pwmMbMinContH + "px)"});
				//$(".pwmMbShipListView ~ .btnGroupBox").css({"bottom":"0"});
			}else{
				$(".pwmMbShipListView ~ .pwmMbShipTit").css({"position":"absolute","top":pwmMbSlideH + pwmImgH + "px", "bottom":"initial"});// 배너형일때 타이틀
				$(".pwmMbShipListView ~ .pwmMbShipCont .pwmMbShipContIn em").css({"position":"relative","top":"initial"});
				$(".pwmMbShipListView ~ .pwmMbShipCont .pwmMbShipInSrc").css({"padding-top":"0px", "min-height":"calc(100vh - " + pwmMbMinContH + "px)"});
				//$(".pwmMbShipListView ~ .btnGroupBox").css({"bottom":- pwmBottmBtn + "px"});
			}
			// 스크롤시 슬라이드 포지션바꿈 : 32 디자인 디테일 맞춤
			if(pwmSCR > 32){
				$(".pwmMbShipScr").css({"z-index":"4"});
			}else{
				$(".pwmMbShipScr").css({"z-index":"1"});
			}
			// 백그라운드형 신청하기
			if(pwmMbWinH > pwmMbTitPos + 32){
				$(".pwmMbShipImg ~ .btnGroupBox").css({"bottom":"0"});
			}else{
				$(".pwmMbShipImg ~ .btnGroupBox").css({"bottom": - pwmBottmBtn + "px"});
			}
			$(".pwmMbShipContIn").css({"padding-top": pwmMbTitOutH}); // 타이틀길이에 따른 상세페이지 상단여백조정
			pwmLastScrollTop = pwmSCR;
		});
		$(".pemMbTopBtn").bind("touchstart", function(){
			$('.pwmMbShipScr').animate({'scrollTop':0});
		});
	},
	setTopScr : function(){
		viewTop = setTimeout(function(){
			$('.pwmMbShipScr').animate({'scrollTop': $(".pwmMbShipSlide").height()});
		},2000);
	}
}

/*********************************************************************
 * init
*********************************************************************/
$(function(){
	
	$(window).load(function(){
		pwmSlide.init();
		pwmMbShipScr.init();
		pwmScrMotion.init();
		pwmFloatingSrc.init();
		pwmAccordian.init(); 
		pwmTab.init();
		pwmPopEvt.init();
	});
	
});

 /********************************************************************
* @업무명		: 
* @설명		: 
* @파일명		: PR0903ui.js
*********************************************************************
* 번호	작업자		작업일			변경내용
*--------------------------------------------------------------------
* 1		윤지혜
*********************************************************************/
 

/* UI Animation */
var solAI = {
	'toggleCheck' : function(){
		$(document).on('change','.toggleCheck :checkbox',function(){
			var chkCont =$(this).parents().next('.toggleChkCont');
			
			if($(this).is(':checked')){
				chkCont.slideDown();
			}else {
				$(this).prop('checked',false)
				chkCont.slideUp();
			}	 
			return false;
		});
	},
	// 라디오버튼 토글기능 - 기존 기능 예외 type
	// (기존에 있는 기능이나 한 페이지에 동일한 클래스가 여러개일 경우 동시 적용됨, 분리 작업)
	'toggleRadioM2' : function(){
		$(document).on('change','.toggleRadioM2 :radio',function(){
			var idx = $(this).index();
			var togBox = $(this).parent().parent().parent('.inputBox').next('.toggleRadioCont');
			
			if(idx == 0) {
				togBox.slideDown();
			}else {
				togBox.slideUp();
			}
			return false;
		});
	}, 
	'tabRadioM' : function(){
		$(document).on('change','.tabRadioM :radio',function(){
			var idx = $(this).index()/2;
			var tabRCont = $(this).parents().next('.tabRCont').find(' > div');
			var trName = $(this).attr('name');
			
			if($(this).is(':checked')) {
				tabRCont.hide();
				tabRCont.eq(idx).show();
								
				if($(this).parent().hasClass('type2') == true) {					
					if(idx === 1) {
						tabRCont.show();
					}else {
						tabRCont.hide();
					}
				}
			}
			return false;
		});
	}, 
	'tabCheckM' : function(){
		$(document).on('change','.tabCheckM :checkbox',function(){
			var idx = $(this).index()/2;
			var tabCCont = $(this).parents().next('.tabChkCont').find('div');
			
			if($(this).is(':checked')) {
				tabCCont.eq(idx).show();
			}else {
				tabCCont.eq(idx).hide();
			}
			return false;
		});
	}, 
	'allMenuBtn' : function(){
		if($('.premierMain').find('> .visualArea').length > 0){
			$('.allMenuBtn > label, .allMenuBtn .back').addClass('filterWhite');
			// console.log('!!!')
		}else{
			// console.log('OK')
		}

		if($('.floatingFixTr').length > 0){
			$('.allMenuBtn').css({'bottom':'105px', /* 'transition':'none' */});
			// $('.allMenuBtn').addClass('type2');
		}
		
		// 전체메뉴 플로팅 버튼 (flip 타입)
		$('.allMenuBtn .flipBox').click(function(){
			$('.allMenuList').addClass('on');
		});

		// 전체메뉴popup 버튼 클릭 시
		$('.allMenuList a').click(function(){
			var parentC = $(this).parents('ul').attr('class');
			// console.log(parentC);
			if($(this).hasClass('btnClose')){
				// $('.allMenuBtn input:checkbox[id="menuBtn"]').prop('checked', false); 기본타입시
				$('.allMenuList').removeClass('on');
			}else if(parentC == "depth2"){
				
			}else{
				if($(this).next('.depth2').length){
					$('.allMenuList > ul > li > a').removeClass('on');
					$(this).addClass('on');
				}
			}
		});

		// scroll 시 전체메뉴, top버튼 교차 노출
		$('#contentsWrap > div').on('scroll', function(){
			var scrollTop = $(this).scrollTop();
			var screenH = $(window).innerHeight();
			var scrollHeight = $(this).prop('scrollHeight');
			// console.log(screenH);
			// console.log(scrollTop);

			/* if(scrollTop <= screenH){
				console.log('OK');
				$('.allMenuBtn').hide();
			}else if(scrollTop === 0){
				$('.allMenuBtn').hide();
			}else{
				console.log('NO');
				$('.allMenuBtn').show();
				// $('.allMenuBtn').show();
			} */

			/* if(scrollTop > screenH){				
				$('.allMenuBtn').show();
			}else {				
				$('.allMenuBtn').hide();
			} */
		

			if(scrollTop <= 10){				
				// $('.allMenuBtn').hide();
				// $('.allMenuBtn').css('opacity','1');
				// void target.offsetWidth,
				$('.flipBox').addClass('effect');
				
			}else{
				$('.flipBox').removeClass('effect');
				// $('.allMenuBtn').show();
				// $('.allMenuBtn').css('opacity','1');
				// $('.flipBox').attr('style','animation-delay:;');
				// $('.flipBox').removeClass('effect');
				/* setTimeout(function(){
					$('.flipBox').removeClass('effect');
				}, 10); */
			} 
		});
	},
	'topBtn' : function(){ // Sol AI 프리미어 메인만 적용(클래스 다름) : 기존 top 버튼 기능 적용
		/* $('#contentsWrap > div').on('scroll', function(){			
			var scrollTop = $(this).scrollTop();
			var screenH = $(window).innerHeight();
			var scrollHeight = $(this).prop('scrollHeight');
			drawTopButtonHtml = '<a href="javascript:;" class="btnTyCircleTop">Top</a>';
			if(scrollTop === 0){				
				$('.topBtn').css('opacity','0');
			}else {
				$('.topBtn').css('opacity','1');
			} 
		}); */
		if($(".btnTyCircleTop").length > 0 ){ $(".btnTyCircleTop").remove() }
		
		var contents = document.querySelector(".contentsS"),
			$btnTyCircleTop = '',
			drawTopButtonHtml = '<a href="javascript:;" class="btnTyCircleTop">Top</a>',
			btnTyCircleTopHeight = 0,
			isSet = false;
	
		
		function set(){
			isSet = true;
			$("#contentsWrap").append(drawTopButtonHtml);
			$btnTyCircleTop = $(".btnTyCircleTop");
			$btnTyCircleTop.css({opacity:0});

			// $btnGroupBoxFix.length && TweenMax.set($btnTyCircleTop, { bottom: '+='+ $btnGroupBoxFix.outerHeight() })
			
			btnTyCircleTopHeight = $btnTyCircleTop.outerHeight(true);			
			// console.log(isSet);
		}

		$(contents).on("scroll", function(){
			var sTop = $(this).scrollTop();
			
			// console.log(sTop);
			// console.log($(window).outerHeight(true));
			if( !isSet ){ set() }

			if(getScrollTop(sTop)){ // 기준 스크롤 탑 보다 클 때
				TweenMax.set($btnTyCircleTop, {opacity:1});			
				$btnTyCircleTop.css('visibility','inherit');
				
			} else { // 작을 때
				TweenMax.set($btnTyCircleTop, {opacity:0});
				$btnTyCircleTop.css('visibility','hidden');
			}
		})

		function getScrollTop(sTop){
			return sTop > $(window).outerHeight(true) /2;
		}

		$(document).on("click", ".btnTyCircleTop", function(){
			$('.contentsS').animate({'scrollTop':0}).focus();
			return false;
		})
	},
	
	// css height 100vh 속성
	'vh' : function(){
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		// console.log(vh);

	},
	'mainSlide' : function(){
		function detectActive(){
			// get active
			var get_active = $('.slider .slideItem:first-child').data('class');
			$('.indicator a').removeClass('on');
			$('.indicator a[data-class='+ get_active +']').addClass('on');
		}
		/* touch */
		var startX, startY, endX, endY;
		$('.slider').on('touchstart', function(event){
			startX = event.originalEvent.changedTouches[0].screenX;
			startY = event.originalEvent.changedTouches[0].screenY;
			
		});
		$('.slider').on('touchend', function(event){
			endX = event.originalEvent.changedTouches[0].screenX;
			endY = event.originalEvent.changedTouches[0].screenY;

			if(startX - endX > 50){
				//console.log('오른쪽에서 왼쪽');
				nextSlide();
				
			}else if(endX - startX > 50){
				// console.log('왼쪽에서 오른쪽');
				prevSlide();
			}
		});

		function nextSlide(){
			var total = $('.slideItem').length;
			$('.slider .slideItem:first-child').hide().appendTo('.slider').fadeIn();
			$.each($('.slideItem'), function(index, slideItem){
				$(slideItem).attr('data-position', index + 1);
			});
			detectActive();
		}

		function prevSlide(){
			var total = $('.slideItem').length;
			$('.slider .slideItem:last-child').hide().prependTo('.slider').fadeIn();
			$.each($('.slideItem'), function(index, slideItem){
				$(slideItem).attr('data-position', index + 1);
			});
			detectActive();
		}

		$('.indicator a').click(function(){
			$('.indicator a').removeClass('on');
			$(this).addClass('on');
			var get_slide = $(this).attr('data-class');
			//console.log(get_slide);
			$('.slider .slideItem[data-class='+ get_slide +']').hide().prependTo('.slider').fadeIn();
			$.each($('.slideItem'), function(index, slideItem){
				$(slideItem).attr('data-position', index + 1);
			});
		});

		$('body').on('click', '.slider .slideItem:not(:first-child)', function(){
			var get_slide = $(this).attr('data-class');
			// console.log(get_slide);
			$('.slider .slideItem[data-class='+ get_slide +']').hide().prependTo('.slider').fadeIn();
			$.each($('.slideItem'), function(index, slideItem){
				$(slideItem).attr('data-position', index + 1);
			});

			detectActive();
		});
	},
	'continuePop' : function(){
		$('.btnInfoMore').on('click', function(){
			var lyHeader = $(this).parents('.layerBlTyp').find('.layerHeader'),
				lyCont = lyHeader.siblings('.layerCon');
			
			lyHeader.toggleClass('on');
			
			if(lyHeader.hasClass('on')){
				var lyHeaderH = lyHeader.outerHeight();
				lyCont.css({height:'calc(100% - ' + lyHeaderH + 'px)'});
			} else {
				lyCont.removeAttr('style');
			}
		})
		$('.contents, .floatingFixTr').on('touchstart', function(){
			$('.floatingFixTr').addClass('down')
		})
	},
	'pullDownR' : function(){/* pull down to refresh */
		var touchStartHandler ,
			 touchMoveHandler,
			 touchPoint;
			//  only needed for touch events on chrome.
			if((window.chrome || navigator.userAgent.match('CriOS')) && "ontouchstart" in document.documentElement) {
				touchStartHandler = function(){
					// only need to handle single touch cases
					touchPoint = event.touches.length === 1 ? event.touches[0].clientY : null;
				}
				touchMoveHandler = function(event){
					var newTouchPoint;
					// only need to handle single touch cases
					if(event.touches.length !== 1){
						touchPoint = null;
						return;
					}
					// only need to defaultPrevent when scrolling up
					newTouchPoint = event.touches[0].clientY;
					if(newTouchPoint > touchPoint){
						event.preventDefault();
					}
					touchPoint = newTouchPoint;
				}
				document.addEventListener("touchstart", touchStartHandler,{
					passive: false
				});
				document.addEventListener("touchmove", touchMoveHandler,{
					passive: false
				});
			}

	},
	'layPopTooltip' : function(){
		$(document).on('click', '.btnGroupBox > .btnType ', function(){
			var $target = $(this).parents('[class*=layerPopTooltip]');
			$('.layerPopWrap').hide();
				
		});
	},
	'init' : function(){
		solAI.toggleCheck();
		solAI.toggleRadioM2();
		solAI.tabRadioM();
		solAI.tabCheckM();
		solAI.allMenuBtn();
		solAI.topBtn();
		solAI.vh();
		// solAI.mainSlide();
		solAI.pullDownR();
		solAI.continuePop();
		solAI.layPopTooltip();
		window.addEventListener('resize', () => solAI.vh());
	},
}
		

$(function(){
	$(window).load(function(){
		solAI.init();
	});
});








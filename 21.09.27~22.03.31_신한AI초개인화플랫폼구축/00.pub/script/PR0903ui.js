 /********************************************************************
* @업무명		: 
* @설명		    : 
* @파일명		: PR0903ui.js
*********************************************************************
* 번호	작업자		작업일			변경내용
*--------------------------------------------------------------------
* 1		�ㅼ���
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
		$('#contentsWrap > div').on('scroll', function(){
			var scrollTop = $(this).scrollTop();
			var screenH = $(window).innerHeight();
			var scrollHeight = $(this).prop('scrollHeight');
			console.log(screenH);
			console.log(scrollTop);

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
			if(scrollTop === 0){				
				// $('.allMenuBtn').hide();
				$('.allMenuBtn').css('opacity','0');
			}else {
				// $('.allMenuBtn').show();
				$('.allMenuBtn').css('opacity','1');
			} 
		});
	},
	// css height 100vh 속성
	'vh' : function(){
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		console.log(vh);

	},
	
	'init' : function(){
		solAI.toggleCheck();
		solAI.toggleRadioM2();
		solAI.tabRadioM();
		solAI.tabCheckM();
		solAI.allMenuBtn();
		solAI.vh();
		window.addEventListener('resize', () => solAI.vh());
	},
}
		

$(function(){
	$(window).load(function(){
		solAI.init();
	});
});








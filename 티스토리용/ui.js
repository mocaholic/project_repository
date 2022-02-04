
/* UI Animation */
var UI = {
	'accordion' : function(){
		if($('.acc_title').length){
			$('.acc_title').each(function(){
				if(!$(this).parents('.accordion').hasClass('on')){
					$(this).find('a').attr('title','ì„¸ë¶€ë‚´ì—­ ì—´ê¸°').find('.arrow span').text('');
				}else{
					$(this).find('a').attr('title','ì„¸ë¶€ë‚´ì—­ ë‹«ê¸°').find('.arrow span').text('');
				}
			});
		}
		$(document).on('click','.accordion .acc_title a',function(){
			//var accTit = $(this).parents('.contAccordion').find('.tit:first').text();
			if($(this).parents('.accordion').hasClass('on')){
				$(this).parents('.accordion').removeClass('on');
				$(this).parent('.acc_title').siblings('.acc_cont').slideUp();
			}else{
				$(this).parents('.accordion').addClass('on');
				$(this).parent('.acc_title').siblings('.acc_cont').slideDown();
			}
			return false;
		});
	},
	
	'init' : function(){
		UI.accordion();
	},
}
		

$(function(){
	$(window).load(function(){
		UI.init();
	});
});








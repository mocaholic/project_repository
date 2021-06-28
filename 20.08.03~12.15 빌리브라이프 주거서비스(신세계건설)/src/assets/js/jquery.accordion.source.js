/**
*	@name							Accordion
*	@descripton						This Jquery plugin makes creating accordions pain free
*	@version						1.3
*	@requires						Jquery 1.2.6+
*
*	@author							Jan Jarfalk
*	@author-email					jan.jarfalk@unwrongest.com
*	@author-website					http://www.unwrongest.com
*
*	@licens							MIT License - http://www.opensource.org/licenses/mit-license.php
*/

(function(jQuery){
     jQuery.fn.extend({  
         accordion: function() {

            return this.each(function() {

            	var $ul = $(this);

				// if($ul.data('accordiated')) {
				// 	console.log('applyAccordionMotions return false');
				// 	return false;
				// }
				//
				//
				// $ul.data('accordiated', true);

				$accHeader = $('.acc_header');

				$(this).find($accHeader).each(function(){

					$contents = $(this).siblings('ul, div');
					$contents.hide();
					// $contents.css('visibility', 'visible');
					$(this).removeClass('on');

					$(this).unbind('click').bind('click', function(e){
						activate(this);
						return void(0);
					});

				});
				
				function activate(el,effect){

					// $(el).toggleClass('on').siblings().removeClass('on').siblings('ul, div').slideUp('fast');
					// $(el).siblings('ul, div')[(effect || 'slideToggle')]((!effect)?'fast':null);
					// $(el).parent().siblings().find('.acc_header').slideUp('fast');

					$(el).siblings('ul, div').removeAttr('hidden');
					$(el).toggleClass('active, on');
					$(el).siblings('ul, div').slideToggle('fast');


				}
				
            });
        } 
    }); 
})(jQuery);
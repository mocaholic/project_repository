var ACTIONUI = ACTIONUI || {};

//숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function(){
    if(this==0) return 0;
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
};

$(function(){
    var objArr = [];
    Object.keys(ACTIONUI).forEach(function(key){
        objArr.push(key);
    });
    objArr.forEach(function(obj){
        var _obj = obj;

        //자동 실행 여부 변수 체크해서 실행
        if(ACTIONUI[_obj].onloadFlag){
            ACTIONUI[_obj].init();
        }else{
            return false;
        }
    });
});

//gnb 슬라이드
ACTIONUI.gnbSwipe = function () {
	var config = {
		slidesPerView: 'auto',
		spaceBetween: 0,
		pagination: false,
		wrapperClass: 'gnb',
		slideClass: 'gnb-item',
		setWrapperSize: true
		//slideToClickedSlide:true
	};

	// gnb전체메뉴 보기
	function swipeController(gnbSwiper) {
		var $gnbItems    = $('.gnb .gnb-item a'),
			$btnFullMenu = $('.btn-full-menu, .btn-full-close'),
			$gnbDim      = $('.gnb-dimmed'),
			$fullView    = $('.full-menu-wrap'),
			$fullItems   = $fullView.find('.full-menu-item'),
			$body        = $('body'),
			$footer      = $('.footer');

		$btnFullMenu.on('click', function () {
			var $target = $(this);
			$target.toggleClass('active');
			toggleController();

			if ($target.hasClass('active')) {
				$body.on('touchmove', function (e) {
					e.preventDefault();
				});
			} else {
				$body.off('touchmove');
			}

		});

		$gnbDim.on('click', function () {
			toggleController();
			$btnFullMenu.removeClass('active');
			$body.off('touchmove');
		});

		function toggleController() {
			$gnbDim.fadeToggle(200);
			$fullView.fadeToggle(250);
			$body.toggleClass('scroll_off_v2');
			$footer.toggleClass('zIndex');
		};

		//메뉴 가운데로 정렬		
		$(window).on('load', function () {
			var target = $gnbItems.parent('.active');
			muCenter(target);
		});

		function muCenter(target){
			var gnbwrap = $('.gnb-swiper .gnb');
			var targetPos = target.position();
			var winHarf = $('body').width()/2;
			var pos;
			var wrapWidth=0;
			gnbwrap.find('.gnb-item').each(function(){
				wrapWidth += $(this).outerWidth();
			})
			if ((targetPos.left + target.outerWidth()/2) <= winHarf) { // left
				pos = 0;
			}else if ((wrapWidth - targetPos.left - target.outerWidth()/2) <= winHarf) { //right
				pos = wrapWidth-$('body').width()+20;
			}else {
				pos = targetPos.left - winHarf + (target.outerWidth()/2);
			}
			
			setTimeout(function(){gnbwrap.css({
				"transform": "translate3d("+ (pos*-1) +"px, 0, 0)",
				"transition-duration": "500ms"
			})}, 100);
		}

	};

	return {
		config : config,
		swipeController : swipeController
	}
}();

// $(window).on('load', function(){
// 	if(!!$('.gnb-swiper').length){
// 		ACTIONUI.gnbSwipe.swipeController();
// 	}
// });


//탭메뉴 슬라이드
ACTIONUI.tabSwipe = function () {
	var config = {
		slidesPerView: 'auto',
		spaceBetween: 0,
		pagination: false,
		wrapperClass: 'tab-list',
		slideClass: 'tab-item',
		setWrapperSize: true,
		slideToClickedSlide:true
	};

	function tabController(tabSwiper) {
		$tabItems = $('.tab-swiper .tab-list li');

		$tabItems.on('click', 'a', function (e) {

			var $target     = $(this),
				$targetItem = $target.closest('li'),
				activeIndex = $targetItem.index();

			$tabItems.removeClass('active');
			$targetItem.addClass('active');
			//tabSwiper.slideTo(activeIndex, 250);
			e.preventDefault();
		});
	}
	return {
		config : config,
		tabController : tabController
	}
}();


//메인비주얼 슬라이드
ACTIONUI.mBannerSwipe = function () {
	var config = {
		slidesPerView: 1,
		// autoplay: 3000,
		autoplayDisableOnInteraction: false,
		slideClass: 'visual-item',
		spaceBetween: 0,
		loop: true,
		pagination: '.visual-paging',
		paginationCurrentClass: 'visual-current',
		paginationTotalClass: 'visual-total',
		paginationType: 'fraction',
		setWrapperSize: true,
        lazyLoadingInPrevNext: true,
        lazyLoading: true,
            onLazyImageReady: function (s) {
                if (!s.params.autoplay) {
                    s.params.autoplay = 3000;
                    s.startAutoplay();
                }
            }
        };

	return {
		config : config
	}
}();


/* 헤더고정 */
ACTIONUI.stickyHeader = function () {
	var $mHeader    = $('#header'),
		$nav        = $('.nav-main'),
		$bestTeb     =$('#best-product .tab-swiper'),
		$headerTop  = $('.header-top'),
		$navOffset  = $nav.position().top,
		prevTop     = 0;

	$(window).on('scroll', function () {

		var nowTop = $(window).scrollTop();

		if (!!$mHeader.length) {
			if (nowTop > 75) $mHeader.addClass('t-magnet');
			else $mHeader.removeClass('t-magnet');
		}
		
		if (nowTop > $navOffset) {
			if (nowTop > prevTop){
				$headerTop.addClass('off');
				$bestTeb.removeClass('re-pose');
			} else{
				$headerTop.removeClass('off');
				$bestTeb.addClass('re-pose');
			} 
		} 

		if (!nowTop) {
			$mHeader.removeClass('t-magnet');
			$headerTop.removeClass('off');
		}

		prevTop = nowTop;
	});
};

//쇼핑몰이동
ACTIONUI.shopLocation = function () {
	var $headerTop= $('.header-top'),
		$btnLocation = $headerTop.find('.btn-location'),
		$layerShop = $headerTop.find('.layer-shop'),
		$btnClose =  $layerShop.find('.btn-close'),
		$body = $('body'),
		flag;


	$btnLocation.click(function(){
		$layerShop.toggle();
		flag = false;
	});

	$('.layer-shop .shop-list a').click(function(){
		var linkText = $(this).attr('title');
		console.log(linkText);
		$('.btn-location .txt').text(linkText);
		layerShopClose();
	});

	$btnClose.click(function(){
		layerShopClose();
	});

	$body.click(function(){
		
		console.log(flag);
		if(!flag){
			flag= true;
			return;
		}
		layerShopClose();

	});
	
	function layerShopClose(){
		$layerShop.hide();
	}
};


//플로팅버튼
ACTIONUI.floatingTop = function () {
	var $flotingBtn = $('.btn-top'),
		prevTop     = 0,
		$moveTop    = $('.btn-top');

	$moveTop.on('click', function () {
		$('html, body').animate({scrollTop: 0}, 200);
	});

	$(window).on('scroll', function () {
		var nowTop = $(window).scrollTop();
		
		if (nowTop > 100) {
			$flotingBtn.css({'display': 'block'});
		} else {
			$flotingBtn.css({'display': 'none'});
		}
		prevTop = nowTop;
	});
};

/* 사이드메뉴 */
ACTIONUI.sideMenu = function () {

	var sm;

	function SideMenu() {
		sm = this;
		sm.initialize();
	}

	SideMenu.prototype.initialize = function () {
		sm.$body        = $('body');
		sm.$btnSide     = $('.link-side-menu');
		sm.$sideMenu    = $('#side-menu');
		sm.$sideDim     = $('.sidemenu-dimmed');
		sm.$btnClose    = $('[data-side="close"]');
		sm.scrollTo     = null;

		sm.addEvent();
	};

	SideMenu.prototype.addEvent = function () {
		sm.$btnSide.on('click', sm.openSide);
		sm.$btnClose.on('click', sm.closeSide);
		sm.$sideDim.on('click', sm.closeSide)
		
		$('.category-list li').each(function(idx){
			$(this).on('click', function(){
				if(!$(this).hasClass('on')){
					$('.category-list li').removeClass('on');
					$(this).addClass('on');
					$('.category-cont').removeClass('on');
					$('.category-cont:eq('+ idx +')').addClass('on');
				}
				var cateContH = $('.category-cont.on').height();
				var cateListH = $('.category-cont.on').find('.cont-list').height() + 200;
				if(cateContH >= cateListH){
					$('.side-menu-inner').addClass('scroll-off');
				} else{
					$('.side-menu-inner').removeClass('scroll-off');
				}
			})
		});
	};

	SideMenu.prototype.openSide = function () {
		sm.isActiveMenu();
		sm.scrollTo = $(document).scrollTop();
		sm.$sideDim.fadeIn(100);
		sm.$sideMenu.addClass('on');
		sm.$body.addClass('scroll_off');
	};

	SideMenu.prototype.closeSide = function (e) {
		sm.$body.removeClass('scroll_off');
		window.scrollTo(0, sm.scrollTo);
		sm.$sideMenu.removeClass('on');
		sm.$sideDim.fadeOut(400);
	};

	
	SideMenu.prototype.isActiveMenu = function () {
		if (sm.$sideMenu.hasClass('active')) {
			sm.$sideMenu.trigger('click');
		}
	};

	return SideMenu;
}();


//배너 슬라이드
ACTIONUI.BannerSwiperSet = function () {
	var config = {
		pagination: '.best-swiper .swiper-paging',
		wrapperClass: 'best-list',
		slideClass: 'best-item',
		paginationClickable: true,
		centeredSlides: true,
		autoplay: 3000,
		loop: $('.best-item').length > 1 ? true : false,
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		onInit: function(swiper) {
			if(swiper.slides.length == 1) {
				$('.best-swiper .swiper-paging').remove();
			}
		}
	};
	return {
		config : config
	}
}();

ACTIONUI.BannerSwiperSet2 = function () {
	var config = {
		pagination: '.pick-swiper .swiper-paging',
		wrapperClass: 'pick-list',
		slideClass: 'pick-item',
		paginationClickable: true,
		centeredSlides: true,
		autoplay: 3000,
		loop: $('.pick-item').length > 1 ? true : false,
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		onInit: function(swiper) {
			if(swiper.slides.length == 1) {
				$('.pick-swiper .swiper-paging').remove();
			}
		}
	};
	return {
		config : config
	}
}();


//더보기 버튼
ACTIONUI.moreViewList = {
    onloadFlag: true,
    init: function(){
		this.fn();
	},
	
	fn: function(){
		var $moreViewBox    = $('.box-more-view'),
			$moreBtn        = $moreViewBox.find('.btn-more-view'),
			$viewAreaH      = $(".box-more-view").outerHeight(),
			$viewAreaT      = $(document).scrollTop(),
			$viewAreaS      = $viewAreaT - $viewAreaH + 1000;

		$moreBtn.click(function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
				$(this).find('.txt').text('닫기');
				$(this).parent().prev('ul').addClass('extended');
			} else{
				$(this).removeClass('active');
				$(this).find('.txt').text('더보기');
				$(this).parent().prev('ul').removeClass('extended');
				if(!!$('.main-area').length){
					$('html, body').animate({scrollTop: $viewAreaS}, 300);
				}
			}	
		});
	}
}


//공통탭
ACTIONUI.commonTab = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
        $('.box-tab-view').each(function(){
            var tabLi = $(this).find('.tab-list li');

            tabLi.each(function(idx){
                $(this).on('click', function(e){
                    e.preventDefault();
					/* 05.21 수정 */
                    $(this).parent().parent().parent().find('.tab-cont').removeClass('on');
                    $(this).parent().parent().parent().find('.tab-cont:eq('+ idx +')').addClass('on');
					/* // 05.21 수정 */
                    if(!$(this).hasClass('on')){
                        tabLi.removeClass('on');
                        $(this).addClass('on');
                    }
                });
            });
        });
    }
}

// 검색 상세 필터
ACTIONUI.filter = function () {

	var ft;

	function Filter() {
		ft          = this;
		ft.$btnOpen = $('[data-filter="open"]');
		if (!ft.$btnOpen.length) return;
		ft.initialize();
	}

	Filter.prototype.initialize = function () {
		ft.$body      = $('body');
		ft.$schView   = $('.detail-search');
		ft.$btnClose  = ft.$schView.find('[data-filter="close"]');
		ft.$schDimmed = $('.search-dimmed');
		ft.scrollTo   = null;
		this.scrollPosition;
		ft.addEvent();
	};

	Filter.prototype.addEvent = function () {
		ft.$btnOpen.on('click', ft.filterOpen.bind(this));
		ft.$btnClose.on('click', ft.filterClose.bind(this));
		ft.$schDimmed.on('click', ft.triggerHandler);
		$('.chk-item-list li').each(function(idx){
			$(this).on('click', function(){
				if(!$(this).hasClass('on')){
					$('.chk-item-list li').removeClass('on');
					$(this).addClass('on');
					$('.chk-item-cont').removeClass('on');
					$('.chk-item-cont:eq('+ idx +')').addClass('on');
				}
				var chkItemContH = $('.chk-item-cont.on').height();
				var chkItemListH = $('.chk-item-cont.on').find('.cont-list').height() + 200;
				if(chkItemContH >= chkItemListH){
					$('.detail-search-inner').addClass('scroll-off');
				} else{
					$('.detail-search-inner').removeClass('scroll-off');
				}
			})
		});
	};

	Filter.prototype.filterOpen = function () {
		if(typeof(appGnbDisplay) == "function"){
			appGnbDisplay(false);
		}
		this.scrollPosition = $(window).scrollTop();
		ft.$schDimmed.fadeIn(100);
		ft.$schView.addClass('is-actived');
		ft.$body.css({'top': -this.scrollPosition, position: 'fixed'});
	};

	Filter.prototype.filterClose = function () {
		if(typeof(appGnbDisplay) == "function"){
			appGnbDisplay(true);
		}
		console.log(this.scrollPosition);
		ft.$body.removeAttr('style');
		$(document).scrollTop(this.scrollPosition);
		ft.$schView.removeClass('is-actived');
		ft.$schDimmed.fadeOut(300);
	};

	Filter.prototype.triggerHandler = function () {
		ft.$btnClose.trigger('click');
	};

	return Filter;
}();

//검색결과 소팅 뷰
ACTIONUI.sorting = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
        if(!!$('.sort-btn-box').length){
			$('.sort-btn-box > button').each(function(){
                $(this).off('click').on('click', function(){
					if($(this).hasClass('on')){
						$(this).removeClass('on');
					}else{
						$(this).addClass('on');
					}
                    
                    if($(this).hasClass('on')){
						$('.search-result').removeClass('type-thum').addClass('type-list');
                    }else{
                        $('.search-result').removeClass('type-list').addClass('type-thum');
                    }
                });
            });
        }
    }
}


//푸터 공지사항 롤링
ACTIONUI.textRolling = {
    onloadFlag: false,
    init: function(){
        this.fn();
    },
    fn: function(){
        var height = $(".notice .list-wrap").height(),
            num = $(".rolling li").length,
            max = height * num,
            move = 0;

        function noticeRolling(){
            move += height;
            $(".rolling").stop().animate({"top":-move},600,function(){
                if(move >= max){
                    $(this).css("top", 0);
                    move = 0;
                };
            });
        };
        noticeRollingOn = setInterval(noticeRolling,3000);
        $(".rolling").append($(".rolling li").first().clone());
        
        $('.rolling li').on('mouseenter', function(){
            clearInterval(noticeRollingOn);
        }).on('mouseleave', function(){
            noticeRollingOn = setInterval(noticeRolling,3000);
        });
    }
}


//버튼 폼
ACTIONUI.btnContShowhide = function (){
	var $utilBtn = $('.basic-btn-box .cont button[class*="btn-basic"]');

	$utilBtn.click(function(){
		$utilBtn.next('.form-box').hide();
		$utilBtn.removeClass('active')
		$(this).next('.form-box').show();
		$(this).addClass('active');
	});
}

//인풋박스 삭제버튼
ACTIONUI.inputClear = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
        $('.input-box .input-cell input').each(function(){
			if($(this).val() == ''){
				$(this).next('.cancel').hide();
			} else{
				$(this).next('.cancel').show();
			}
            $(this).on('keyup', function () {
                if($(this).val() == ''){
                    $(this).next('.cancel').hide();
                } else{
                    $(this).next('.cancel').show();
                }
            });
        });
        
        $('.input-box .cancel').click(function(e){
			e.preventDefault();
			if(!$(this).hasClass('link')){
				$(this).prev('input').val('').focus();
				$(this).hide();
			}
        });
    }
}

//textarea 활성화
ACTIONUI.textareaActive = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
		var flag;
        $('.text-area-wrap textarea').click(function(){
			flag= false;
			$(this).parent('.text-area-wrap').addClass('active');
		});
		$('body').click(function(){		
			if(!flag){
				flag= true;
				return;
			}
			$('.text-area-wrap').removeClass('active');
		});
    }
}

//상품 찜하기
ACTIONUI.productKeep = {
    onloadFlag: true,
    vars: {
        el: '<div class="toast-keep"><span class="blind txt">찜</span></div>'
    },
    init: function(){
        this.fn.button();
        $("#wrap").after(ACTIONUI.productKeep.vars.el);
    },
    fn: {
        button: function(){
            $('.btn-keep').off('click').on('click', function(){
                if(!$(this).hasClass('on')){
                    $(this).addClass('on');
                    ACTIONUI.productKeep.fn.toast.on();
                }else{
                    $(this).removeClass('on');
                    ACTIONUI.productKeep.fn.toast.off();
                }
            })
        },
        toast: {
            on: function(){
                $('.toast-keep .txt').text('찜');
				$('.toast-keep').removeClass('cancle').clearQueue().fadeIn(1000).delay(200).fadeOut(200);
				return false;
            },
            off: function(){
                 $('.toast-keep .txt').text('찜취소');
                    $('.toast-keep').addClass('cancle').removeClass('on').clearQueue().fadeIn(1000).delay(200).fadeOut(200);
                    return false;
            }
        }
    }
}

//장바구니 토스트
ACTIONUI.productBasket = {
    onloadFlag: true,
    vars: {
        el: '<div class="toast-basket"><span class="txt">장바구니 담기</span></div>'
    },
    init: function(){
        this.fn.button();
        $("#wrap").after(ACTIONUI.productBasket.vars.el);
    },
    fn: {
        button: function(){
            $('.btn-basket').on('click', function(){
                $(this).addClass('on');
                ACTIONUI.productBasket.fn.toast.on();
            })
        },
        toast: {
            on: function(){                
				$('.toast-basket').fadeIn(500).delay(500).fadeOut(300);
				return false;
            }
        }
    }
}

//아코디언
ACTIONUI.accordion = {
    onloadFlag: true,
    init: function(){
        var acQeustion = $('.ui-accordion li .ac-head a');
        acQeustion.click(function(){  
            if(!$(this).hasClass('on')){
                acQeustion.removeClass('on');
                acQeustion.parent('.ac-head').next('.ac-body').hide(); 
                $(this).addClass('on');
                $(this).parent('.ac-head').next('.ac-body').show(); 
            } else{
                $(this).removeClass('on');
                $(this).parent('.ac-head').next('.ac-body').hide();
            }
            return false;

         });
    }
}

//팝업 - layer
ACTIONUI.layerPop = {
    onloadFlag: true,
    vars: {
        wrap: null,
        btn: null
    },
    init: function(){
        this.vars.wrap = $('.popup-wrap');
        this.vars.btn = $('.popup-layer .btn-close');
        this.fn.load();
    },
    fn: {
        load: function(){
            ACTIONUI.layerPop.fn.button();
        },
        open: function(layer, callback1, callback2, callback3){
            //$('html, body').scrollTop(ACTIONUI.winEvt.vars.winScTop);

            callback3 ? callback3() : undefined;

            var _layer = $('#' + layer);
            if(!ACTIONUI.layerPop.vars.wrap.hasClass('on')){
                ACTIONUI.layerPop.vars.wrap.addClass('on');
                $('html').addClass('scroll_off');
                if(!_layer.hasClass('on')){
                    _layer.addClass('on');
                    callback1 ? callback1() : undefined;
                    callback2 ? callback2() : undefined;
                }
            }
        },
        close: function(layer, callback1){
            var _layer = $('#' + layer);

            if(ACTIONUI.layerPop.vars.wrap.hasClass('on')){
                ACTIONUI.layerPop.vars.wrap.removeClass('on');
                $('html').removeClass('scroll_off');
            }
        },
        button: function(){
            ACTIONUI.layerPop.vars.btn.on('click', function(){
                var prLayer = $(this).parent('.popup-layer').attr('id');
                ACTIONUI.layerPop.fn.close(prLayer);
            });
        }
    }
}

//셀랙트박스 - selectify
ACTIONUI.select = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
        $('.sel-option select').each(function(){
            $(this).selectify();
			/* 퍼블확인용 개발 시 삭제하셔도 됩니다. */
			//$(this).parent('.sel-option').find('.option').not('.option:first-child').append("<span class='price'>" + "100000원" + "</span>");
        });
    }
};

//document init
$(function () {
	//회색 bg
	if(!!$('.sub-area #content .section').length){
		$('body').addClass('gray-type');
	}
	//gnb슬라이드
	if (!!$('.gnb-swiper').length) {
		ACTIONUI.gnbSwipe.swipeController();
		var gnbSwiper = Swiper('.gnb-swiper', ACTIONUI.gnbSwipe.config);
	}

	//헤더고정
	if (!!$('.header-top').length){
		ACTIONUI.stickyHeader();
		//쇼핑몰 이동
		ACTIONUI.shopLocation();
	} 

	
	// 탭슬라이드
    if (!!$('.tab-swiper').length) {
		ACTIONUI.tabSwipe.tabController();
        var tabSwiper = Swiper('.tab-swiper', ACTIONUI.tabSwipe.config);
	}

	// 메인비쥬얼
	if (!!$('#main-visual').length) {
		var mainVisualSwiper = Swiper('#main-visual', ACTIONUI.mBannerSwipe.config);
	}


	//플로팅 버튼
	if (!!$('#footer .btn-area').length) {
		ACTIONUI.floatingTop();
	}

	// Side Menu UI
	if (!!$('#side-menu').length) {
		// Side Menu Open
		var SMO = ACTIONUI.sideMenu;
		new SMO();

	}

	// Filter
	var FT = ACTIONUI.filter;
	new FT();

	
	//배너
	var BannerSwiperSet = new Swiper('.best-swiper',ACTIONUI.BannerSwiperSet.config);
	var BannerSwiperSet2 = new Swiper('.pick-swiper',ACTIONUI.BannerSwiperSet2.config);
	

	//푸터공지사항롤링
	var bottomNotice = $('.bottom-notice .rolling');
	if (!!bottomNotice.length) {
		ACTIONUI.textRolling.init();
	};


	//인풋클리어
	if (!!$('.input-box').length) ACTIONUI.inputClear.init();
	

	//인트로 로그인
	if (!!$('.basic-btn-box .cont').length) {
		ACTIONUI.btnContShowhide();
	}
	
});




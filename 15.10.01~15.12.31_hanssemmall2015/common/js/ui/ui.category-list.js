/**
 * 상품 리스트 - UI 요소 적용
 * @version 2015.12.18
 */
;(function ($, $B) {
	//페이지 JS 중복 삽입 체크
	UI.checkOverlapJS( 'ui.category-list' );

	var _parallaxScrollUpdatePool = [];

	// =============== 왼쪽 카테고리 공통 =============== //
	(function () {
		var _$target = $( '.lnb' ),
			_$list = _$target.find( '.dep1' );

		if ( !_$target.length ) return;

		_$list.on( 'mouseenter mouseleave', function (e) {
			e.preventDefault();
			var idx = $( e.currentTarget ).index();

			if ( e.type === 'mouseenter' ) {
				_$list.removeClass( 'active' ).eq( idx ).addClass( 'active' );
			} else {
				_$list.removeClass( 'active' );
			}

		});

		_$list.on( 'click', '.btn_sub_layer_close', function (e) {
			e.preventDefault();
			_$list.removeClass( 'active' );
		});
	}());


    // =============== 리스트 안 '쿠폰' 레이어 팝업 =============== //
	$('.prd_price_btn').hover(function(){
		$(this).parents('.prd_price_wrap').find('.pop_bubble').openLayer();				
	},function(){				
		$(this).parents('.prd_price_wrap').find('.pop_bubble').closeLayer();
	});
	
	// =============== (임시) 6단보기에서 제품 정보보기 =============== //
	//열기
	$('.product_expend .prd_img a').click(function(){
		var _top = $(this).position().top;
		$(this).parent().next('.prd_info').css({'top':_top+144}); //144:a태그 높이가 146이므로 -2
		$(this).parent().parent().addClass('active').siblings().removeClass('active');
		return false;
	});
	//닫기
	$('.product_expend .prd_close').click(function(){
		$(this).parent().parent().removeClass('active');
	});


	// =============== 검색옵션:가격, 사이즈 슬라이더 =============== //
	$( '.ui-price-slider' ).rangeSlider({
		//values: [12000, 42500],
		numberFormat: true,
		range: 1000
	});

	$( '.ui-size-slider' ).rangeSlider({
		range: 1
	});


	// =============== 중단 검색옵션:Fixed 컨트롤 =============== //
	(function () {
		var _$win = $( window ),
			_$body = $( 'body' ),
			_$target = $( '.det_sch' ),
			_$fixedArea = $( '.ui-search-fixed-area .tab_body:eq(0)' ),
			_$option = _$target.find( '.layer_sch' ),
			_$btn = _$target.find( '.det_btn' );

		if ( !_$target.length ) return;

		var _isOpen = false,
			_isActivate = false,
			_scrollTop = 0;

		_$btn.click( function (e) {
			e.preventDefault();

			if ( _isOpen ) {
				closeOption();
			} else {
				openOption();
			}
		});

		var _parallaxScroll = new $B.utils.ParallaxScroll( 'vertical', getOptionPositions(), {
			onActivate: parallaxScrollHandler,
			onDeactivate: parallaxScrollHandler
		});

		function openOption () {
			_parallaxScroll.disable();
			_scrollTop = _$win.scrollTop();

			_$body.css({
				position: 'fixed',
				width: '100%',
				marginTop: -_scrollTop + 'px'
			});

			_$option.removeClass( 'dp_none' );
			_$target.addClass( 'fixed' );
			_isOpen = true;
		}

		function closeOption () {
			_$body.css({
				position: '',
				width: '100%',
				marginTop: 0
			});

			_$win.scrollTop( _scrollTop );

			_$option.addClass( 'dp_none' );
			_parallaxScroll.enable();

			if ( !_isActivate ) _$target.removeClass( 'fixed' );

			_isOpen = false;
		}

		function parallaxScrollHandler (e) {
			switch ( e.type ) {
				case 'activate':
					_isActivate = true;
					_$target.addClass( 'fixed' );
					$( document ).off( 'click', scrollPositionUpdate );
					break;
				case 'deactivate':
					_isActivate = false;
					_$target.removeClass( 'fixed' );
					$( document ).on( 'click', scrollPositionUpdate );
					break;
			}
		}

		function getOptionPositions () {
			var areaY = _$btn.offset().top,
				areaH = _$fixedArea.height() - 30;
			return [
				{
					start: areaY,
					end: areaY + areaH
				}
			];
		}

		function scrollPositionUpdate () {
			_parallaxScroll.update( getOptionPositions() );
		}

		$( window ).load( scrollPositionUpdate );
		$( document ).on( 'click', scrollPositionUpdate );

		_parallaxScrollUpdatePool.push( scrollPositionUpdate );
	}());

	
	// ========== tab 안에 레이어 클릭시 출력 ==============
	$( '.ic_question').on('click',function(){
	   $('.pop_question').openLayer();
	});	
	
	// =============== Tab 안에서 뜨는 레이어 닫기 	==========================//
	$( '.ui-tab-area' ).on( 'tabs:change', function ( e, index ) {
		$( '.pop_bubble' ).closeLayer();
	});

	// ========== tab 안에 레이어 클릭시 출력 ==============
	$( '.ic_question').on('click',function(){
		$('.pop_question').openLayer();
	});

	// =============== 침실스타일 제안 ====================//
	$(' .make_style_box .mark li ').on('click',function(){
	var p = $(this),
		idx = p.parent().children('li').index(p), 
		note = p.parents('.make_style_box').find('.make_style_txt ul li');
		
		note.removeClass('active');
		note.eq(idx).addClass('active');
	});
	
	// =============== 기획전 가져오기 ==================
	$('.exhibitions .more').on('click',function(){ 
		var _this = $(this),			
			_store = $( ".exhibitions .exhibitions_banner .event" ),
			 rel ,
		    _target = _store.eq(0);
			
			_target.find('img').each(function(idx){			
			    
               			rel = $(this).attr('rel');
						$(this).attr('src',rel);			
			});

			_target.removeClass('event');
			
			if (_store.length == 1){
			   _this.hide();
       	       _this.siblings('.more_close').show();	
			}
		 
		
	return false;
	});
	



	/**********************  JS 재적용 가능한 요소들 모음 **********************/
	//동적으로 생성된 요소들의 JS를 적용할때 사용한다, 한번 적용되었던 요소들에는 재 적용되지 않는다.
	UI.resetPageJS = function ( isFirst ) {
		if ( !isFirst ) UI.resetCommonJS();


		// =============== 카테고리 메인 배너 ====================//
		$( '.visual_banner' ).tripleSlide({
			autoPlay: true,
			delayTime: 4000,
			duration: 500,
			startX: 200
		});

		// ===============  "이벤트 배너" 적용 =============== //
		$( '.event_ban' ).slideList({
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 1
		});

		// =============== mai2-1  "카테고리 베스트" 탭 =============== //
		$( '.best_cont' ).tabs({
			autoPlay: true,
			delayTime: 3000
		});

		// =============== 상단 대표베너 적용 =============== //
		$( '.visual_banner_02' ).overlayList({
			motionType: 'overlay',
			duration: 400,
			autoPlay: true,
			delayTime: 5000
		});

		// ===============  하단 띠베너 적용 =============== //
		$( '.girdle_banner' ).overlayList({
			motionType: 'overlay',
			duration: 400,
			autoPlay: true,
			delayTime: 5000,
			loop: true,
			disableItemOverlay: true
		});

		// ===============  "인기기획전" 적용 =============== //
		$( '.both_banner .left' ).slideList({
			itemWidth : 440,
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 1
		});
		$( '.both_banner > div' ).slideList({
			itemWidth : 440,
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 1
		});
		// ===============  "카테고리 베스트 상품"  =============== //
		$( '.category_best .list' ).slideList({
			//itemWidth : 441,
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 3,
			moveLength: 3
		});

		// =============== "카테고리 베스트" 탭 =============== //
		$( '.best_list' ).tabs({
			autoPlay: true,
			delayTime: 3000
		});

		// ===============  "패키지픽 "  =============== //
		$( '.package_pick_b2' ).slideList({
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 4,
			moveLength: 4
		});
		$( '.best_list .left' ).slideList({
			itemWidth : 200,
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 1
		});

		// ===============  "맞춤픽 "  =============== //
		$( '.custom_pick .right .tab_cont' ).slideList({
			itemWidth : 656,
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 1
		});
		// ================ left-menu 추천기획전 , 최저가 창고 ==================//
		$( '.cleft_banner' ).overlayList({
			motionType: 'overlay',
			duration: 400,
			autoPlay: true,
			delayTime: 5000,
			loop: true,
			disableItemOverlay: true
		});

		// =============== mai2-1  "한샘 pick" =============== //
		$( '.pick_list' ).slideList({
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 1
		});

		// =============== mai2-1 배너 =============== //
		$( '.visual_banner3' ).overlayList({
			motionType: 'overlay',
			duration: 400,
			loop: true
		});
		
		// =============== mai2-1  "기획전" =============== //
		$( '.exhib_list' ).slideList({
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 1
		});

		//================ search banner1 ========================//
		$( '.recomm_slide' ).slideList({
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 3,
			moveLength: 1
		});

		// ===============  "인기기획전 "  =============== //
		$( '.popular_fun .inner_box' ).slideList({
			itemWidth : 1168,
			eventBlock: false,
			loop: true,
			motionType: 'slide',
			viewLength: 1
		});

		// =============== 상단 9개씩 보여주는 베너 ==================
		$( '.visual_banner2' ).each( function ( idx, el ) {
			var PAGE_IMG_LENGTH = 9;

			var _$target = $( el ),
				_$viewArea = _$target.find( '.banner_cont' ),
				_$items = _$viewArea.find( '.ui-list-item' ),
				_$thumbArea = _$target.find( '.banner_img_tab' ),
				_$thumbs = _$thumbArea.find( '.thumb_img' );

			var _currentPage = 0,
				_currentIdx = 0;

			// ---------- Initialize ---------- //
			if ( _$target.hasClass('ui-js-apply') ) return;
			_$target.addClass( 'ui-js-apply' );

			_$viewArea.on( 'mouseover mouseout', mouseHandler );
			_$thumbArea.on( 'mouseover mouseout', mouseHandler );

			_$thumbs.each( function ( idx, el ) {
				$( el ).attr( 'data-idx', idx );
			}).on( 'mouseover', '>a', function (e) {
				var $btn = $( e.currentTarget );
				var idx = $btn.closest( '.thumb_img' ).data( 'idx' );
				selectThumb( idx );
				_$viewArea.trigger( 'overlaylist:change_index', idx );
			});

			_$thumbArea.overlayList().on( 'overlaylist:change', function ( e, index ) {
				_$viewArea.trigger( 'overlaylist:change_index', index * PAGE_IMG_LENGTH );
			});

			_$viewArea.on( 'overlaylist:init overlaylist:change', function ( e, index ) {
				if ( e.type === 'overlaylist:init' ) {
					_$items.css({
						position: 'absolute',
						left:0,
						top: 0
					});
				}

				var pageIdx = getPageIndex( index );

				if ( _currentPage !== pageIdx ) {
					_$thumbArea.trigger( 'overlaylist:change_index', pageIdx );
				}

				selectThumb( index );
				_currentPage = pageIdx;
			}).overlayList({
				autoPlay: true,
				delayTime: 5000,
				motionType: 'overlay',
				loop: true
			});

			// ---------- Protected Methods ---------- //
			function selectThumb ( idx ) {
				_$thumbs.eq( _currentIdx ).removeClass( 'active' );
				_$thumbs.eq( idx ).addClass( 'active' );
				_currentIdx = idx;
			}

			function mouseHandler (e) {
				if ( e.type === 'mouseover' ) {
					_$viewArea.trigger( 'overlaylist:timer_stop' );
				} else {
					_$viewArea.trigger( 'overlaylist:timer_start' );
				}
			}

			function getPageIndex ( idx ) {
				return Math.floor( idx / PAGE_IMG_LENGTH );
			}
		});

		// ========== parallaxScroll 좌표 수동 업데이트 ========== //
		for ( var key in _parallaxScrollUpdatePool ) {
			_parallaxScrollUpdatePool[key]();
		}
	};

	//최초 1번 적용
	UI.resetPageJS( true );
})(jQuery, ixBand);
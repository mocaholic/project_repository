/**
 * 전시관련 - UI 요소 적용
 * @version 2015.12.21
 */
;(function () {
    //페이지 JS 중복 삽입 체크
    UI.checkOverlapJS( 'ui.exhibition' );

    var _parallaxScrollUpdatePool = [];

    // ----- 현재시간 출력 ----- //
	if($('.now_time').size() > 0){
		timer();		
		function timer() {
		    var _today = new Date();
		    var _h = _today.getHours();
		    var _m = _today.getMinutes();
		    var _s = _today.getSeconds();
		    _m = _reset(_m);
		    _s = _reset(_s);	    
		    $('.now_time').text(_h+" : "+_m+" : "+_s);	    
		    setTimeout(function(){timer()},1000);    /* 1초마다 갱신(refresh)  */
		}
		 /*분,초에서 숫자를 가져와서 만약 그 수가 10보다 작다면 앞에 "0"을 추가 함 */
		function _reset(i) {
		    if (i<10) {i = "0" + i};
		    return i;
		}		
	}

	
    // =============== 브랜드몰 리스트 마지막 부분 '브랜드 설명' 레이어 팝업 =============== //
    (function () {
        var _$target = $( '.rlt_brand' ),
            _$items = _$target.find( '.brand_tit' ),
            _$pops = _$target.find( '.pop_bubble' )

        var _timer = new $B.utils.Timer( 700, 1, {
            onTimer: function (e) {
                closePop();
            }
        });

        _$items.on( 'mouseover mouseout', mouseHandler );
        _$pops.on( 'mouseover mouseout', function (e) {
            if ( e.type === 'mouseover' ) {
                _timer.stop();
            } else {
                _timer.reset().start();
            }
        });

        function mouseHandler (e) {
            if ( e.type === 'mouseover' ) {
                _timer.stop();

                closePop();
                openPop();
            } else {
                _timer.reset().start();
            }
        }

        function openPop () {
            _$pops.css( 'display', 'block' );
        }

        function closePop () {
            _$pops.css( 'display', 'none' );
        }
    }());


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


	// ========== tab 안에 레이어 클릭시 출력 ============== //
	$( '.ic_question').on('click',function(){
	   $('.pop_question').openLayer();
	});

    // Tab 안에서 뜨는 레이어 닫기
	$( '.ui-tab-area' ).on( 'tabs:change', function ( e, index ) {
		//console.log( index ); // 현재 선택된 탭의 index
		$( '.pop_bubble' ).closeLayer();
	});

    // ========== "메뉴 type1" 스크롤에 따른 Fixed 적용 ============== //
    $( '.exhib_box' ).each( function ( idx, el ) {
        var _$target = $( el ),
            _$menuArea = _$target.find( '.mnt' ),
            _$title = _$menuArea.find( '.menu_tit > a' ),
            _$menuTabs = _$menuArea.find( '.menu_tab' ),
            _$menus = _$menuTabs.find( '> li' ),
            _$items = _$target.find( '.menu_detail' );

        var _pScroll,
            _defaultMenuText = _$title.text(),
            _isOpen = false,
            _menuHeight = _$menuArea.outerHeight();

        // ---------- Initialize ---------- //
        initialize();

        // ---------- Protected Methods ---------- //
        function initialize () {
            _$title.on( 'click', function (e) {
                e.preventDefault();
                if ( _isOpen ) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            _$menus.on( 'click', '>a', function (e) {
                e.preventDefault();
                var idx = $( this ).parent( 'li' ).index();
                setMenu( idx );

                if ( _$items.eq(idx).length ) {
                    $( window ).scrollTop( _$items.eq(idx).offset().top - _menuHeight );
                }
            });

            _pScroll = new $B.utils.ParallaxScroll( 'vertical', getPositions(), {
                onActivate: pScrollHandler,
                onDeactivate: pScrollHandler
            });

            $( window ).load( scrollPositionUpdate );
            $( document ).on( 'click', scrollPositionUpdate );
        }

        function setMenu ( idx ) {
            _$menus.removeClass( 'active' );

            if ( idx > -1 ) {
                var txt = _$menus.eq( idx ).addClass( 'active' ).find( '> a > span' ).text();
                _$title.text( txt );
            } else {
                _$title.text( _defaultMenuText );
            }

            closeMenu();
        }

        function closeMenu () {
            if ( !_isOpen ) return;
            _$menuTabs.addClass( 'dp_none' );
            _isOpen = false;
        }

        function openMenu () {
            if ( _isOpen ) return;
            _$menuTabs.removeClass( 'dp_none' );
            _isOpen = true;
        }

        function pScrollHandler (e) {
            switch ( e.type ) {
                case 'activate':
                    closeMenu();
                    _$menuArea.addClass( 'fixed' );
                    _$target.css( 'paddingTop', _menuHeight + 'px' );
                    if ( e.index > 0 ) setMenu( e.index - 1 );
                    break;
                case 'deactivate':
                    _$target.css( 'paddingTop', '0px' );
                    _$menuArea.removeClass( 'fixed' );
                    setMenu();
                    scrollPositionUpdate();
                    break;
            }
        }

        function getPositions () {
            _menuHeight = _$menuArea.outerHeight();
            var positions = [{start: _$target.offset().top, end: 0}];

            _$items.each( function ( idx, el ) {
                var $item = $( el ),
                    itemY = $item.offset().top - _menuHeight,
                    pos = {
                        start: itemY,
                        end: itemY + $item.outerHeight()
                    };

                positions[idx].end = itemY;
                positions.push( pos );
            });

            return positions;
        }

        function scrollPositionUpdate () {
            _pScroll.update( getPositions() );
        }

        _parallaxScrollUpdatePool.push( scrollPositionUpdate );
    });


    // =============== 상단탭 탭변경시 이미지명 변경하기  =============== //
    $( '.img_tab_area' ).on( 'tabs:change', function ( e, index ) {
        $( this ).find( '.ui-tab-item > a > img' ).changeOverImg( 'off' );
        $( this ).find( '.ui-tab-item:eq(' + index + ') > a > img' ).changeOverImg( 'on' );
    }).find( '.ui-tab-item > a' ).on( 'mouseover mouseout', function (e) {
        if ( $(this).parent().hasClass('active') ) return;

        if ( e.type === 'mouseover' ) {
            $( this ).find( '>img' ).changeOverImg( 'on' );
        } else {
            $( this ).find( '>img' ).changeOverImg( 'off' );
        }
    });


    /**********************  JS 재적용 가능한 요소들 모음 **********************/
    //동적으로 생성된 요소들의 JS를 적용할때 사용한다, 한번 적용되었던 요소들에는 재 적용되지 않는다.
    UI.resetPageJS = function ( isFirst ) {
        if ( !isFirst ) UI.resetCommonJS();


        // =============== "한샘 Pick" =============== //
        $( '.ui-list-pick' ).each ( function () {
            var AUTO_PLAY = true,
                DELAY_TIME = 4000,
                ANI_DURATION = 400;

            var  _$target = $(this),
                _$listItems = _$target.find( '.ui-list-items .ui-list-item' ),
                _$contentsArea = _$target.find( '.ui-list-contents' ),
                _$contents = _$contentsArea.find( '.ui-list-item' );

            var _timer,
                _itemLength = _$listItems.length,
                _selectedIdx = -1;

            /* ----- Initialize ----- */
            if ( _$target.hasClass('ui-js-apply') ) return;
            _$target.addClass( 'ui-js-apply' );

            _$target.on( 'mouseover mouseout', mouseHandler );
            _$listItems.find( 'a' ).on( 'click', function (e) {
                e.preventDefault();
                itemSelect( $(this).closest('.ui-list-item').index() );
            });

            if ( AUTO_PLAY ) {
                _timer = new $B.utils.Timer( DELAY_TIME, 0, {
                    onTimer: timerHandler
                }).start();
            }

            itemSelect( 0 , 'none' );

            /* ----- Protected Methods ----- */

            function itemSelect ( idx, type ) {
                var $content = _$contents.eq( idx );

                _$listItems.removeClass( 'active' ).eq( idx ).addClass( 'active' );

                if ( type === 'none' ) {
                    _$contents.css( 'display', 'none' ).eq( idx ).css( 'display', 'block' );
                    _$contentsArea.append( $content );
                } else {
                    $content.css({
                        display: 'block',
                        opacity: 0
                    });
                    _$contentsArea.append( $content );
                    $content.animate( {opacity: 1}, {
                        duration: ANI_DURATION
                    });
                }

                _selectedIdx = idx;
            }

            function timerHandler (e) {
                var idx = _selectedIdx + 1;
                if ( idx >= _itemLength ) idx = 0;
                itemSelect( idx );
            }

            function mouseHandler (e) {
                if ( e.type === 'mouseover' ) {
                    if ( _timer ) _timer.stop();
                } else {
                    if ( _timer ) _timer.start();
                }
            }
        });

        // ===============  "기획전" 적용 =============== //
        $( '.brandMall_tab  .tab_cont' ).slideList({
            //itemWidth : 441,
            eventBlock: false,
            loop: false,
            motionType: 'slide',
            viewLength: 2,
            moveLength: 2
        });

        // ===============  "브랜드 체험기" 적용 =============== //
        $( '.bland_exper' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 4,
            moveLength: 1
        });

        // ===============  "Premium Brand" 적용 =============== //
        $( '.exhib_list' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 6,
            moveLength: 1
        });

        // ===============  bpm1 브랜드 몰  =============== //
        $( '.rlt_brand .tab_cont' ).slideList({
            //itemWidth : 441,
            eventBlock: false,
            loop: false,
            motionType: 'slide',
            viewLength: 4,
            moveLength: 4
        });

        // ===============  "기획전" 적용 =============== //
        $( '.ro_style2 .ro_wrap ' ).slideList({
            itemWidth : 553,
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });

        // ===============  "인기상품" 적용 =============== //
        $( '.best_slide_prd_wrap' ).on( 'slidelist:change slidelist:init', function ( e, index, total ) {
            $(this).find('.best_slide_num strong').text(index +1);
            $(this).find('.best_slide_num span').text(total);
        }).slideList({
            itemWidth : 630,
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });

        // ===============  "인기기획전" 적용 =============== //
        $( '.best_slide_prm_wrap' ).on( 'slidelist:change slidelist:init', function ( e, index, total ) {
            $(this).find('.best_slide_num strong').text(index +1);
            $(this).find('.best_slide_num span').text(total);
        }).slideList({
            itemWidth : 242,
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });

        // ===============  기획전 메인 > "인기기획전" 적용 =============== //
        $( '.popular_prm_box' ).each( function ( idx, el ) {
            var AUTO_PLAY = true,
                DELAY_TIME = 3000,
                VIEW_LENGTH = 5,
                CENTER_IDX = 2;

            var _$target = $( el ),
                _$ul = _$target.find( '.ui-list-items' ),
                _$contentWarp = _$target.find( '.ui-list-contents' ),
                _$contents = _$contentWarp.find( '.ui-list-item' ),
                _$items = _$ul.find( '.ui-list-item' ),
                _$controller = _$target.find( '.ui-controller' ),
                _$prevBtn = _$controller.find( '.ui-controller-prev' ),
                _$nextBtn = _$controller.find( '.ui-controller-next' );

            var _itemOriginLength = _$items.length,
                _itemTotalLength = _itemOriginLength,
                _isDisabled = false,
                _itemSize = _$items.outerHeight(),
                _selectIdx = 0,
                _originIdx = _selectIdx,
                _moveIdx = 0;

            var _timer;

            /* ----- Initialize ----- */
            if ( _$target.hasClass('ui-js-apply') ) return;
            _$target.addClass( 'ui-js-apply' );

            initialize();

            /* ----- Protected Methods ----- */

            function initialize () {
                addEvent();

                _$items.each( function ( idx, el ) {
                    $( el ).attr( 'data-origin-idx', idx );
                });

                if ( _itemOriginLength > VIEW_LENGTH ) {
                    cloneItems();
                    _selectIdx = CENTER_IDX;
                } else {
                    _$controller.addClass( 'disabled' );
                    _$prevBtn.addClass( 'disabled' );
                    _$nextBtn.addClass( 'disabled' );
                }

                if ( AUTO_PLAY ) {
                    _timer = new $B.utils.Timer( DELAY_TIME, 0, {
                        onTimer: function (e) {
                            var idx;

                            if ( _itemOriginLength > VIEW_LENGTH ) {
                                idx = correctSelectIdx( _moveIdx + 1 );
                                setItem( idx + CENTER_IDX );
                                move( 'next' );
                            } else {
                                idx = correctSelectIdx( _selectIdx + 1 );
                                setItem( idx );
                            }
                        }
                    }).start();
                }

                _$items.each( function ( idx, el ) {
                    $( el ).attr( 'data-idx', idx );
                });

                _$contents.css({
                    position: 'absolute',
                    left: 0,
                    top: 0
                });

                setItem( _selectIdx );
            }

            function correctSelectIdx ( idx ) {
                if ( idx > _itemTotalLength - 1 ) {
                    idx = 0;
                } else if ( idx < 0 ) {
                    idx = _itemTotalLength - 1;
                }

                return idx;
            }

            //화면에 보여지는 index인지 체크
            function isViewIdx ( type ) {
                var moveIdx = ( type === 'next' ) ? _moveIdx + 1 : _moveIdx - 1,
                    originIdx = _$items.eq( _selectIdx ).data( 'origin-idx' ),
                    result = _$items.slice( moveIdx, moveIdx + VIEW_LENGTH ).filter( '[data-origin-idx=' + originIdx + ']' ).length;
                //return result > 0;
                return false;
            }

            function addEvent () {
                _$target.on( 'mouseover mouseout', mouseHandler );
                _$items.find( '>a' ).on( 'mouseover mouseout', function (e) {
                    e.preventDefault();
                    var idx = $( this ).parent().data( 'idx' );

                    if ( e.type === 'mouseover' ) {
                        setItem( idx );
                    } else {
                        _$items.removeClass( 'active' );
                    }
                });

                _$prevBtn.on( 'click', function (e) {
                    e.preventDefault();
                    if ( $(this).hasClass('disabled') ) return;

                    if ( isViewIdx('prev') ) {
                        setItem( _selectIdx );
                    } else {
                        _$items.removeClass( 'active' );
                    }

                    move( 'prev' );
                });

                _$nextBtn.on( 'click', function (e) {
                    e.preventDefault();
                    if ( $(this).hasClass('disabled') ) return;

                    if ( isViewIdx('next') ) {
                        setItem( _selectIdx );
                    } else {
                        _$items.removeClass( 'active' );
                    }

                    move( 'next' );
                });
            }

            function mouseHandler (e) {
                if ( e.type === 'mouseover' ) {
                    if ( _timer ) _timer.stop();
                } else {
                    if ( _timer ) _timer.reset().start();
                }
            }

            function setContent ( originIdx ) {
                var $content = _$contents.eq( originIdx );
                $content.css( 'opacity', 0 );
                _$contentWarp.append( $content );
                $content.animate( {opacity: 1}, {
                    duration: 400
                });
            }

            function setItem ( idx ) {
                var originIdx = _$items.eq( idx ).data( 'origin-idx' );
                var $currentItem = _$items.removeClass( 'active' ).filter( '[data-origin-idx=' + originIdx + ']' ).addClass( 'active' );

                if ( originIdx !== _originIdx ) {
                    $currentItem.find( '.over_img' ).stop().css( 'opacity', 0 ).animate( {opacity: 1}, {
                        duration: 400
                    });

                    setContent( originIdx );
                }

                _originIdx = originIdx;
                _selectIdx = idx;
            }

            function move ( type ) {
                if ( _isDisabled ) return;
                _isDisabled = true;

                var nextIdx, correctIdx = -1;

                if ( type === 'next' ) {
                    nextIdx = _moveIdx + 1;
                } else {
                    nextIdx = _moveIdx - 1;
                }

                if ( type === 'prev' ) {
                    if ( nextIdx < 0 ) {
                        correctIdx = _itemOriginLength;
                    }
                } else {
                    if ( nextIdx > _itemOriginLength ) {
                        correctIdx = 0;
                    }
                }

                if ( correctIdx > -1 ) {
                    _$ul.stop().css( {marginTop: getItemY(correctIdx) + 'px'} );
                    _isDisabled = false;
                    _moveIdx = correctIdx;
                    move( type );
                    return;
                }

                _$ul.stop().animate( {marginTop: getItemY(nextIdx) + 'px'}, {
                    duration: 400,
                    complete: function (e) {
                        _isDisabled = false;
                    }
                });

                _moveIdx = nextIdx;
            }

            function getItemY ( idx ) {
                return -( _itemSize * idx );
            }

            function cloneItems () {
                _$ul.append( _$items.clone() );
                _$items = _$ul.find( '.ui-list-item' );
                _itemTotalLength = _$items.length;
            }
        });

        // ===============  "이벤트 배너" 2개짜리 적용 =============== //
        $( '.event_banner_view2' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 2
        });

        // ===============  "이벤트 배너" 3개짜리 적용 =============== //
        $( '.event_banner_view3' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 3
        });

        // ===============  "이벤트 배너" 4개짜리 적용 =============== //
        $( '.event_banner_view4' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 4
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

        // ===============  "침대특별세일" 배너 적용 =============== //
        $( '.pro_detail_1' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });

        // ===============  "다른기획전 보기" 배너 적용 =============== //
        $( '.exhibitions_banner2' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });

        // ===============  좌측탭이 있고 우측 배너가 있는 탭, 배너 적용 =============== //
        $( '.pro_detail_6' ).tabs({
            autoPlay: true,
            delayTime: 3000
        }).find( '.list_slide' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 3
        });

        // ========== parallaxScroll 좌표 수동 업데이트 ========== //
        for ( var key in _parallaxScrollUpdatePool ) {
            _parallaxScrollUpdatePool[key]();
        }
    };

    //최초 1번 적용
    UI.resetPageJS( true );
})(jQuery, ixBand);
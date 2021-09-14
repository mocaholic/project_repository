/**
 * 메인 페이지 - UI 요소 적용
 * @version 2015.12.10
 */
;(function ($, $B) {
    //페이지 JS 중복 삽입 체크
    UI.checkOverlapJS( 'ui.main-page' );

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

    // =============== Layer 공지 팝업 =============== //
    $( window ).load( function () {
        var ANI_DURATION = 400,
            POP_MARGIN = 12;

        var _$target = $( '.pop_common_area' ),
            _$iconArea = _$target.find( '.pop_common_icon' ),
            _$icons = _$iconArea.find( 'ul > li' ),
            _$popArea = _$target.find( '.pop_com_group' ),
            _$pops = _$popArea.find( '.notice_popup' );

        if ( !_$pops.length ) return;

        var _isDisabled = false;

        // ---------- Initialize ---------- //
        initialize();

        // ---------- Protected Methods ---------- //
        function initialize () {
            addEvents();

            var viewWidth = 0;

            _$pops.each( function ( idx, el ) {
                var $pop = $( el ).attr( 'data-idx', idx ),
                    $icon = _$icons.eq( idx ).attr( 'data-idx', idx );

                if ( $B.utils.cookie('mainPopClose' + idx) ) {
                    $icon.css( 'display', 'block' );
                    $pop.css( 'display', 'none' );
                } else {
                    $icon.css( 'display', 'none' );
                    $pop.css({
                        display: 'block',
                        left: viewWidth + 'px'
                    });

                    viewWidth += $pop.outerWidth() + POP_MARGIN;
                }
            });

            setIconState();
            _$iconArea.find( '.icon_item' ).removeClass( 'first' ).filter( ':visible:eq(0)' ).addClass( 'first' );
        }

        function setIconState () {
            if ( _$icons.is(':visible') ) {
                _$iconArea.css( 'visibility', 'visible' );
            } else {
                _$iconArea.css( 'visibility', 'hidden' );
            }
        }

        function addEvents () {
            _$icons.on( 'click', '>a', function (e) {
                if ( _isDisabled ) return;
                e.preventDefault();
                var idx = $( this ).parent().data( 'idx' );
                openPopup( idx );
                setIconState();
            });

            _$pops.find( '.checkbox_area, .ui-layer-close' ).on( 'click', function (e) {
                if ( _isDisabled ) return;
                var idx = $( this ).closest( '.notice_popup' ).index();

                if ( $(this).hasClass('ui-layer-close') ) {
                    e.preventDefault();
                    closePopup( idx );
                } else {
                    closePopup( idx );
                    $B.utils.cookie( 'mainPopClose' + idx, true, 24 * 60 );
                }
            });
        }

        function getLastX ( $el ) {
            var result = 0,
                left = $el.css( 'left' );

            if ( typeof left === 'string' ) left = left.replace( 'px', '' );
            if ( left ) {
                result = Number(left) + $el.outerWidth() + POP_MARGIN;
            } else {
                result = 0;
            }

            return  result + 'px';
        }

        function openPopup ( dataIdx ) {
            _isDisabled = true;
            _$icons.filter( '[data-idx=' + dataIdx + ']' ).css( 'display', 'none' );
            _$iconArea.find( '.icon_item' ).removeClass( 'first' ).filter( ':visible:eq(0)' ).addClass( 'first' );

            var $pop = _$pops.filter( '[data-idx=' + dataIdx + ']' ).stop(),
                $contents = $pop.find( '.shape' ),
                $last = _$popArea.find( '.notice_popup:visible' ).last();

            var border = $pop.css( 'borderLeftWidth' ) || '';
            border = Number( border.replace('px', '') ) * 2;

            _$popArea.append( $pop );

            $pop.css({
                display: 'block',
                width: 0,
                height: 0
            }).animate({
                top: 0,
                left: getLastX( $last ),
                width: $contents.outerWidth() + border + 'px',
                height: $contents.outerHeight() + border + 'px'
            }, {
                duration: ANI_DURATION,
                complete: function () {
                    _isDisabled = false;
                }
            });
        }

        function closePopup ( idx ) {
            _isDisabled = true;
            var currentLeft;

            _$popArea.find( '.notice_popup' ).each( function ( index, el ) {
                var $pop = $( el ).stop();

                if ( index === idx ) {
                    currentLeft = $pop.css( 'left' );

                    $pop.animate({
                        left: '-15px',
                        top: '15px',
                        width: 0,
                        height: 0
                    }, {
                        duration: ANI_DURATION,
                        complete: function () {
                            var $icon = _$iconArea.find( '.icon_item[data-idx=' + $pop.data('idx') + ']').css( 'display', 'block' );
                            _$iconArea.css( 'visibility', 'visible' ).find( 'ul' ).append( $icon );
                            _$iconArea.find( '.icon_item' ).removeClass( 'first' ).filter( ':visible:eq(0)' ).addClass( 'first' );
                            $pop.css( 'display', 'none' );

                            _isDisabled = false;
                        }
                    });
                } else if ( index > idx ) {
                    if ( $pop.is(':visible') ) {
                        $pop.animate({
                            left: currentLeft
                        }, {
                            duration: ANI_DURATION
                        });

                        currentLeft = $pop.css( 'left' );
                    }
                }
            });
        }
    });


    // ===============  "브랜드 shop" =============== //
    $( window ).load( function () {
        var AUTO_PLAY = true,
            DELAY_TIME = 3000;

        var _$target = $( '.bland_shop' ),
            _$viewport = _$target.find( '.ui-list-viewport' ),
            _$ul = _$viewport.find( '.ui-list-items' ),
            _$items = _$ul.find( '.ui-list-item' ),
            _$pops = _$target.find( '.ui-list-pops .ui-list-pop' ),
            _$controller = _$target.find( '.ui-controller' ),
            _$prevBtn = _$target.find( '.ui-controller-prev' ),
            _$nextBtn = _$target.find( '.ui-controller-next' );

        var _itemOriginLength = _$items.length,
            _itemTotalLength = _itemOriginLength,
            _viewportWidth = _$viewport.innerWidth(),
            _itemTotalWidth = 0,
            _isDisabled = false,
            _selectIdx = 0,
            _itemPositions = [],
            _autoTimer;

        /* ----- Initialize ----- */
        if ( _$target.hasClass('ui-js-apply') ) return;
        _$target.addClass( 'ui-js-apply' );

        var _timer = new $B.utils.Timer( 700, 1, {
            onTimer: function (e) {
                closePop();
                if ( _autoTimer ) _autoTimer.start();
            }
        });

        _$items.each( function ( idx, el ) {
            $( el ).attr( 'data-origin-idx', idx );
            _itemTotalWidth += $( el ).width();
        });

        if ( _itemTotalWidth > _viewportWidth ) {
            cloneItems();

            if ( AUTO_PLAY ) {
                _autoTimer = new $B.utils.Timer( DELAY_TIME, 0, {
                    onTimer: function (e) {
                        move( 'next' );
                    }
                }).start();

                _$prevBtn.on( 'mouseover mouseout', mouseHandler );
                _$nextBtn.on( 'mouseover mouseout', mouseHandler );
            }
        } else {
            _$controller.addClass( 'disabled' );
            _$prevBtn.addClass( 'disabled' );
            _$nextBtn.addClass( 'disabled' );
        }

        //position 배열에 저장
        _$items.each( function ( idx, el ) {
            var posW = $( el ).width(),
                position = {x: 0, width: 0};

            if ( idx === 0 ) {
                position.width = posW;
            } else {
                position.x = _itemPositions[idx - 1].x + _itemPositions[idx - 1].width;
                position.width = posW;
            }

            _itemPositions[idx] = position;
            _itemTotalWidth += posW;
        });

        _$ul.css( 'width', _itemTotalWidth );

        _$items.on( 'mouseover mouseout', mouseHandler );
        _$pops.on( 'mouseover mouseout', function (e) {
            if ( e.type === 'mouseover' ) {
                _timer.stop();
                if ( _autoTimer ) _autoTimer.stop();
            } else {
                _timer.reset().start();
                if ( _autoTimer ) _autoTimer.start();
            }
        });

        _$prevBtn.on( 'click', function (e) {
            e.preventDefault();
            if ( $(this).hasClass('disabled') ) return;
            move( 'prev' );
        });
        _$nextBtn.on( 'click', function (e) {
            e.preventDefault();
            if ( $(this).hasClass('disabled') ) return;
            move( 'next' );
        });

        /* ----- Protected Methods ----- */

        function move ( type ) {
            if ( _isDisabled ) return;
            _isDisabled = true;

            var nextIdx, nextPosX, correctIdx = -1;

            if ( type === 'next' ) {
                nextIdx = _selectIdx + 1;
            } else {
                nextIdx = _selectIdx - 1;
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
                _$ul.stop().css( {marginLeft: getItemX(correctIdx) + 'px'} );
                _isDisabled = false;
                _selectIdx = correctIdx;
                move( type );
                return;
            }

            _$ul.stop().animate( {marginLeft: getItemX(nextIdx) + 'px'}, {
                duration: 500,
                complete: function (e) {
                    _isDisabled = false;
                }
            });

            _selectIdx = nextIdx;
        }

        function getItemX ( idx ) {
            return -_itemPositions[idx].x;
        }

        function cloneItems () {
            _$ul.append( _$items.clone() );
            _$items = _$ul.find( '.ui-list-item' );
            _itemTotalLength = _$items.length;
        }

        function mouseHandler (e) {
            var $item = $( this ),
                idx = $item.data( 'origin-idx' );

            if ( e.type === 'mouseover' ) {
                _timer.stop();
                if ( _autoTimer ) _autoTimer.stop();
                closePop();
                openPop( $item, idx );
            } else {
                _timer.reset().start();
            }
        }

        function openPop ( $item, idx ) {
            var $pop = _$pops.eq( idx );
            $pop.css( 'display', 'block' );

            var targetX = _$target.offset().left,
                posX = $item.offset().left,
                posCenterX = $item.width() * 0.5,
                popCenterX = $pop.width() * 0.5;

            $pop.css( 'left', ((posX - targetX) + posCenterX - popCenterX) + 'px' );
        }

        function closePop () {
            _$pops.css( 'display', 'none' );
        }
    });


    // ===============  "매트리스 홈케어 서비스 Tab영역 YouTube제어" =============== //
    (function () {
        var $tabArea = $( '.ui-tab-area' ),
            $contents = $tabArea.find( '.ui-tab-contents > .ui-tab-contents-item' );

        var srcs = [];

        $contents.each( function ( idx, el ) {
            var src = $contents.eq( idx ).find( '.video-area > iframe' ).attr( 'src' );
            srcs[idx] = src;
        });

        $tabArea.on( 'tabs:change', function ( e, idx ) {
            var src = srcs[idx];
            $contents.find( '.video-area > iframe' ).attr( 'src', '' );

            if ( src ) {
                $contents.eq( idx ).find( '.video-area > iframe' ).attr( 'src', src );
            }
        });
    }());




    /**********************  JS 재적용 가능한 요소들 모음 **********************/
    //동적으로 생성된 요소들의 JS를 적용할때 사용한다, 한번 적용되었던 요소들에는 재 적용되지 않는다.
    UI.resetPageJS = function ( isFirst ) {
        if ( !isFirst ) UI.resetCommonJS();


        // =============== "Best Pick" 적용 =============== //
        (function () {
            var RANDOM_PLAY_DELAY = 100,
                ANI_DURATION = 400;

            var _$target = $( '.best_pick' ),
                _$items = _$target.find( '.ui-list-item' );

            var _oldIdx = -1,
                _interval = null;

            if ( _$target.hasClass('ui-js-apply') ) return;
            _$target.addClass( 'ui-js-apply' );

            _$target.overlayList({
                duration: 400,
                autoPlay: true,
                delayTime: 5000,
                disableItemHide: false
            }).on( 'overlaylist:change', function ( e, index ) {
                randomPlay( index );
                _oldIdx = index;
            });

            function randomPlay ( idx ) {
                var $item = _$items.eq( idx ),
                    $children = $item.find( '.ui-list-item-child' );

                var idxAry = [],
                    count = 0;

                $children.each( function ( idx ) {
                    idxAry[idx] = idx;
                });

                idxAry = $B.array.shuffle( idxAry );
                $children.css( 'opacity', 0 );

                if ( _interval ) {
                    clearInterval( _interval );
                    _interval = null;
                }

                setInterval( function () {
                    var idx = idxAry[count],
                        $child = $children.eq( idx );

                    motionStart( $child );
                    count++;
                }, RANDOM_PLAY_DELAY);
            }

            function motionStart ( $child ) {
                $child.animate( {opacity: 1}, {
                    duration: ANI_DURATION
                });
            }
        }());

        // =============== "한샘 Pick" =============== //
        (function () {
            var AUTO_PLAY = true,
                DELAY_TIME = 4000,
                ANI_DURATION = 400;

            var _$target = $( '.hanss_pick' ),
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
        }());

        // ===============  "Weekly Best Pick" 배너 =============== //
        (function () {
            var AUTO_PLAY = true,
                DELAY_TIME = 4000,
                ITEM_WIDTH = 200,
                ANI_DURATION = 500;

            var _$target = $( '.weekly_best' ),
                _$viewport = _$target.find( '.ui-list-viewport' ),
                _$ul = _$viewport.find( '.ui-list-items' ),
                _$items = _$ul.find( '.ui-list-item' ),
                _$prevBtn = _$target.find( '.ui-controller-prev' ),
                _$nextBtn = _$target.find( '.ui-controller-next' ),
                _$imgArea = _$target.find( '.ui-img-items' ),
                _$imgs = _$imgArea.find( '> .ui-list-item' ),
                _$textArea = _$target.find( '.ui-text-items' ),
                _$texts = _$textArea.find( '> .ui-list-item' );

            if ( !_$target.length ) return;

            var _itemOriginLength = _$items.length,
                _itemTotalLength = _itemOriginLength,
                _centerWidth = _$texts.outerWidth(),
                _isDisabled = false,
                _selectIdx = 0,
                _centerIdx = 2,
                _timer;

            /* ----- Initialize ----- */
            if ( _$target.hasClass('ui-js-apply') ) return;
            _$target.addClass( 'ui-js-apply' );

            initialize();


            /* ----- Protected Methods ----- */
            function initialize () {
                _$items.each( function ( idx, el ) {
                    $( el ).attr( 'data-origin-idx', idx );
                });

                cloneItems();

                if ( AUTO_PLAY ) {
                    _timer = new $B.utils.Timer( DELAY_TIME, 0, {
                        onTimer: function (e) {
                            move( 'next' );
                        }
                    }).start();

                    _$prevBtn.on( 'mouseover mouseout', mouseHandler );
                    _$nextBtn.on( 'mouseover mouseout', mouseHandler );
                }

                _$ul.css( 'width', (_itemTotalLength * 200) + 400 );

                _$target.on( 'mouseover mouseout', mouseHandler );
                _$prevBtn.on( 'click', function (e) {
                    e.preventDefault();
                    move( 'prev' );
                });
                _$nextBtn.on( 'click', function (e) {
                    e.preventDefault();
                    move( 'next' );
                });

                _$imgArea.on( 'click', function (e) {
                    e.preventDefault();

                    var $target = _$items.eq( _centerIdx ).find( '> a' ),
                        href = $target.attr( 'href' ),
                        urlTarget = $target.attr( 'target' );

                    if ( urlTarget ) {
                        window.open( href, urlTarget );
                    } else {
                        document.location.href = href;
                    }
                });

                _$items.eq( _centerIdx ).stop().css({
                    marginLeft: '113px',
                    marginRight: '113px'
                });

                _$texts.css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    display: 'none'
                });

                setCenterItem( 'next', _centerIdx + 1, _centerIdx );
                setCenterImage( _centerIdx );
            }

            function setCenterItem ( type, originIdx, oldIdx ) {
                _$texts.css( 'display', 'none' );
                _$texts.eq( oldIdx ).stop().css({
                    display: 'block',
                    left: 0
                });

                if ( type === 'next' ) {
                    _$texts.eq( originIdx ).stop().css({
                        display: 'block',
                        left: _centerWidth + 'px'
                    });
                } else {
                    _$texts.eq( originIdx ).stop().css({
                        display: 'block',
                        left: -_centerWidth + 'px'
                    });
                }
            }

            function moveCenterItem ( type, idx, isAni ) {
                var originIdx = _$items.eq( idx ).data( 'origin-idx' ),
                    oldOriginIdx = _$items.eq( _centerIdx ).data( 'origin-idx' ),
                    oldPosX = ( type === 'next' ) ? -_centerWidth : _centerWidth;

                setCenterImage( originIdx, isAni );
                setCenterItem( type, originIdx, oldOriginIdx );

                _$texts.eq( oldOriginIdx ).stop().animate( {left: oldPosX + 'px'}, { duration: ANI_DURATION});
                _$texts.eq( originIdx ).stop().animate( {left: '0px'}, { duration: ANI_DURATION});
            }

            function setCenterImage ( originIdx, isAni ) {
                var $img = _$imgs.eq( originIdx ).css( 'opacity', 0 );
                _$imgArea.append( $img );

                if ( isAni ) {
                    $img.stop().animate( {opacity: 1}, { duration: ANI_DURATION});
                } else {
                    $img.stop().css( {opacity: 1} );
                }
            }

            function move ( type ) {
                if ( _isDisabled ) return;
                _isDisabled = true;

                var nextIdx, correctIdx = -1;

                if ( type === 'next' ) {
                    nextIdx = _selectIdx + 1;
                } else {
                    nextIdx = _selectIdx - 1;
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
                    _$items.eq( _centerIdx ).stop().css({
                        marginLeft: '30px',
                        marginRight: '0px'
                    });

                    _$items.eq( correctIdx + 2 ).stop().css({
                        marginLeft: '113px',
                        marginRight: '113px'
                    });

                    _$ul.stop().css( {marginLeft: getItemX(correctIdx) + 'px'} );

                    _isDisabled = false;
                    _centerIdx = correctIdx + 2;
                    _selectIdx = correctIdx;
                    move( type );
                    return;
                }

                moveCenterItem( type, nextIdx + 2, true );

                _$items.eq( _centerIdx ).stop().animate({
                    marginLeft: '30px',
                    marginRight: '0px'
                }, {
                    duration: ANI_DURATION
                });

                _$items.eq( nextIdx + 2 ).stop().animate({
                    marginLeft: '113px',
                    marginRight: '113px'
                }, {
                    duration: ANI_DURATION
                });

                _$ul.stop().animate( {marginLeft: getItemX(nextIdx) + 'px'}, {
                    duration: ANI_DURATION,
                    complete: function (e) {
                        _isDisabled = false;
                    }
                });

                _centerIdx = nextIdx + 2;
                _selectIdx = nextIdx;
            }

            function getItemX ( idx ) {
                return -( (ITEM_WIDTH * idx) + 30 );
            }

            function cloneItems () {
                _$ul.append( _$items.clone() );
                _$items = _$ul.find( '.ui-list-item' );
                _itemTotalLength = _$items.length;
            }

            function mouseHandler (e) {
                if ( e.type === 'mouseover' ) {
                    if ( _timer ) _timer.stop();
                } else {
                    if ( _timer ) _timer.reset().start();
                }
            }
        }());


        // =============== 상단 대표베너 적용 =============== //
        $( '.visual_banner, .visual_banner_st03 .center' ).overlayList({
            motionType: 'overlay',
            duration: 400,
            autoPlay: true,
            delayTime: 5000
        });

        // ===============  상단 배너 적용 =============== //
        $( '.top_banner' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            duration: 500,
            viewLength: 5,
            moveLength: 2
        });

        // ===============  "기획전" 적용 =============== //
        $( '.exhib' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });


        // ===============  "브랜드 체험기" 적용 =============== //
        $( '.bland_exper' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 4,
            moveLength: 1
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

        // =============== main1-1 한샘 pick 배너  ====================//
        $( '.hanssem_pick2' ).tripleSlide({
            autoPlay: true,
            delayTime: 4000,
            duration: 500,
            startX: 0
        });

        // ===============  main1-1 2번째 배너  적용 =============== //
        $( '.mbanner1' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });
        // ===============  main1-1 기획전  적용 =============== //
        $( '.exhib2' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });

        // ===============  "한샘 Pick" 적용 =============== //
        $( '.hanss_pick_st02' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });

        // ===============  "이벤트 배너" 적용 =============== //
        $( '.event_bann' ).slideList({
            eventBlock: false,
            loop: true,
            motionType: 'slide',
            viewLength: 1
        });
        
    };

    //최초 1번 적용
    UI.resetPageJS( true );
})(jQuery, ixBand);
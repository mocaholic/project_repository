/**
 * 공통 UI 요소 적용
 * @version 2015.12.09
 */
;(function ($) {
    //페이지 JS 중복 삽입 체크
    UI.checkOverlapJS( 'ui.common' );

    //IE8 대응 placeholder
    $( 'input, textarea' ).placeholder();

    // ----- 상단 오른쪽 베너 적용 ----- //
    $( '.header_banner' ).overlayList({
        loop: true
    });

    // ----- 상단 통합검색 Layer 베너 적용 ----- //
    $( '.sch_right_rolling' ).overlayList({
        loop: true
    });

    // ----- 전체 카테고리 ----- //
    $( '#gnb_area .category > a' ).click( function (e) {
        e.preventDefault();
		
		var chk_disabled  = $(this).attr('disabled');
				
		if (chk_disabled == "disabled"){return false;} // 메인에서 전체카테고리 열리기 막기
		
        var $categoryArea = $( '#wrap .all_category' ), //, #wrap .lnb_wrap 메인에서 전체 카테고리 열기로 변경 
            $img = $( this ).find( '> img' ),
            path = $img.attr( 'src' );

        if ( $categoryArea.is(':visible') ) {
            $img.attr( 'src', path.replace('gnb_category_close.gif', 'gnb_category_open.gif') );
        } else {
            $img.attr( 'src', path.replace('gnb_category_open.gif', 'gnb_category_close.gif') );
        }

        $categoryArea.toggleClass( 'dp_none' ).find( '> a.close_btn' )
            .off( 'click' ).on( 'click', function (e) {
                e.preventDefault();
                $( '#wrap .all_category' ).toggleClass( 'dp_none' );  //, #wrap .lnb_wrap
                $img.attr( 'src', path.replace('gnb_category_close.gif', 'gnb_category_open.gif') );
            });

    });

    // ----- 상단 Location ----- //
    (function () {
        var _selectIdx = -1;
        var _$li = $( '#container .location > ul > li' );

        _$li.find( '>a' ).on( 'click', function (e) {
            var idx = $( this ).closest( 'li' ).index();

            if ( idx === _selectIdx ) {
                closeDepth( _selectIdx );
                _selectIdx = -1;
            } else {
                closeDepth( _selectIdx );
                openDepth( idx );
                _selectIdx = idx;
            }
        });

        $( document ).on( 'click', function (e) {
            if ( $(e.target).closest('.location').length ) return;
            closeDepth( _selectIdx );
            _selectIdx = -1;
        });

        function openDepth ( idx ) {
            var $li = _$li.eq( idx ),
                $img = $li.find( ' a > img' ),
                path = $img.attr( 'src' );

            $li.addClass( 'active' ).find( '.lc_pop' ).removeClass( 'dp_none' );
            if ( path ) $img.attr( 'src', path.replace('icon_location_open.gif', 'icon_location_close.gif') );
        }

        function closeDepth ( idx ) {
            var $li = _$li.eq( idx ),
                $img = $li.find( ' a > img' ),
                path = $img.attr( 'src' );

            $li.removeClass( 'active' ).find( '.lc_pop' ).addClass( 'dp_none' );
            if ( path ) $img.attr( 'src', path.replace('icon_location_close.gif', 'icon_location_open.gif') );
        }
    }());


	// ========== Quick Menu ========== //
	if ( $('#quick_menu').length ) {
	    (function () {
	        var _$quickMenu = $( '#quick_menu' );

	        var _paymentY = _$quickMenu.offset().top;

            //퀵메뉴 스크롤에 따른 fixed처리
	        var _paymentScroll = new $B.utils.ParallaxScroll( 'vertical', getPaymentPositions(), {
	            onActivate: paymentScrollHandler,
	            onDeactivate: paymentScrollHandler
	        });

            _$quickMenu.find( '>ul > li > a  ' ).on( 'click', function (e) {
                e.preventDefault();
                _$quickMenu.find( '.pop_bubble' ).closeLayer();
                $( this ).parent().find( '.pop_bubble' ).openLayer();
            });

            _$quickMenu.find( '.poptype2 .pop_bubble_cont , .poptype4 .pop_bubble_cont' ).overlayList({
                loop: true
            });

            _$quickMenu.find( '.poptype6 .pop_bubble_cont' ).slideList({
                eventBlock: false,
                loop: true,
                viewLength: 3,
                moveLength: 3
            });

            _$quickMenu.find( '.q_top' ).on( 'click', function (e) {
                e.preventDefault();
                $( window ).scrollTop(0);
            });


	        function paymentScrollHandler (e) {
	            switch ( e.type ) {
	                case 'activate':
                        _$quickMenu.addClass( 'fixed' );
	                    break;
	                case 'deactivate':
                        _$quickMenu.removeClass( 'fixed' );
	                    break;
	            }
	        }

	        function getPaymentPositions () {
	            var docH = $( document ).outerHeight();
	            return [
	                {
	                    start: _paymentY,
	                    end: docH 
	                }
	            ];
	        }
	    }());
	}


    /**********************  JS 재적용 가능한 요소들 모음 **********************/
    //동적으로 생성된 요소들의 JS를 적용할때 사용한다, 한번 적용되었던 요소들에는 재 적용되지 않는다.
    UI.resetCommonJS = function () {
        //SelectBox 세팅
        $( '.ui-select-box' ).selectBox();

        //selectbox option의 다양한 디자인이 들어갔을때 아래와 같이 사용
        $( '.ui-design-select-box' ).selectBox({
            designOption: true
        });

        //selectbox option 과 선택 value의 다양한 디자인이 들어갔을때 아래와 같이 사용 (별점)
        $( '.ui-design-value-select-box' ).selectBox({
            designOption: true,
            designValue: true
        });

        //NumberCounter 세팅
        $( '.ui-number-counter' ).numberCounter();

        //성별 radioSelect
        $( '.ui-radio-select' ).radioSelect();

        //Tab Controller 세팅
        $( '.ui-tab-area' ).tabs();

        //Tab 안에 또 tab이 있는 Controller 세팅
        $( '.ui-sub-tab-area' ).tabs();
    };

    //최초 1번 적용
    UI.resetCommonJS();
})(jQuery);
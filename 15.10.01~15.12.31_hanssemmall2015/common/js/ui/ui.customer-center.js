/**
 * 고객센터 페이지 - UI 요소 적용
 * @version 2015.12.10
 */
;(function ($, $B) {
    //페이지 JS 중복 삽입 체크
    UI.checkOverlapJS( 'ui.customer-center' );

    // ========== lnb 처리 ========== //
    $( '.lnb > ul > .dep1 > ul > li' ).each( function ( idx, el ) {
        var _$li = $( el ),
            _outTimer = new $B.utils.Timer( 300, 0, {
                onTimer: function (e) {
                    _$li.removeClass( 'hover' );
                }
            });

        _$li.find( '>a' ).on( 'mouseover mouseout focusin focusout', mouseHandler );
        _$li.find( '.dep3' ).on( 'mouseenter mouseleave', mouseHandler );
        _$li.find( '.dep3 a' ).on( 'focusin focusout', mouseHandler );

        function mouseHandler (e) {
            if ( e.type === 'mouseover' || e.type === 'mouseenter' ||  e.type === 'focusin' ) {
                _$li.addClass( 'hover' );
                _outTimer.stop();
            } else {
                _outTimer.reset().start();
            }
        }
    });

    // ========== FAQ > 주문결제 게시판 리스트 ========== //
    (function () {
        var _$list = $( '.faq_tbl tbody > tr' );
        var _selectIdx = -1;

        _$list.find( '.txt_left > a' ).on( 'click', function (e) {
            e.preventDefault();
            var idx = $( this ).closest( 'tr' ).index();

            if ( _selectIdx > -1 ) {
                _$list.eq( _selectIdx ).removeClass( 'active' ).find( '.faq_txt' ).slideToggle( 'fast' );
            }

            _$list.eq( idx ).addClass( 'active' ).find( '.faq_txt' ).slideToggle( 'fast' );

            _selectIdx = idx;
        });
    }());


    /**********************  JS 재적용 가능한 요소들 모음 **********************/
    //동적으로 생성된 요소들의 JS를 적용할때 사용한다, 한번 적용되었던 요소들에는 재 적용되지 않는다.
    UI.resetPageJS = function ( isFirst ) {
        if ( !isFirst ) UI.resetCommonJS();

    };

    //최초 1번 적용
    UI.resetPageJS( true );
})(jQuery, ixBand);
/**
 * 주문관련 - UI 요소 적용
 * @version 2015.12.18
 */
;(function ($, $B) {
	//페이지 JS 중복 삽입 체크
	UI.checkOverlapJS( 'ui.order-page' );

	var _parallaxScrollUpdatePool = [];

    // ========== 하단 "최종 결제금액" 스크롤에 따른 fixed처리 ========== //
	if( $('.payment' ).length ){
	    (function () {
	        var _$startArea = $( '.plusapply_area' ),
				_$payment = $( '.payment' );

	        var _startY;

	        var _paymentScroll = new $B.utils.ParallaxScroll( 'vertical', getPaymentPositions(), {
	            onActivate: paymentScrollHandler,
	            onDeactivate: paymentScrollHandler
	        });

	        function paymentScrollHandler (e) {
	            switch ( e.type ) {
	                case 'activate':
						if ( e.index === 0 ) {
							_$payment.addClass( 'fixed' );
							_$payment.css( 'top', 0 );
						} else {
							_$payment.removeClass( 'fixed' );

							var footerY = $( '#footer' ).offset().top,
								paymentH = _$payment.height(),
								endY = footerY - ( paymentH + 20 ) - _startY;

							_$payment.css( 'top', endY + 'px' );
						}

	                    break;
	                case 'deactivate':
	                    _$payment.removeClass( 'fixed' );
						_$payment.css( 'top', 0 );
	                    break;
	            }
	        }

	        function getPaymentPositions () {
				_startY = _$startArea.offset().top;

	            var docH = $( document ).outerHeight(),
					footerY = $( '#footer' ).offset().top,
					paymentH = _$payment.height(),
					endY = footerY - ( paymentH + 20 );

	            return [
	                {
	                    start: _startY,
	                    end: endY
	                },
					{
						start: endY,
						end: docH
					}
	            ];
	        }

	        function scrollPositionUpdate () {
	            _paymentScroll.update( getPaymentPositions() );
	        }

	        $( window ).load( scrollPositionUpdate );
	        $( document ).on( 'click', scrollPositionUpdate );

			_parallaxScrollUpdatePool.push( scrollPositionUpdate );
	    }());
	}



	/**********************  JS 재적용 가능한 요소들 모음 **********************/
	//동적으로 생성된 요소들의 JS를 적용할때 사용한다, 한번 적용되었던 요소들에는 재 적용되지 않는다.
	UI.resetPageJS = function ( isFirst ) {
		if ( !isFirst ) UI.resetCommonJS();


		// ========== "주문완료" 배너 세팅 ========== //
		$( '.ui-banner-single' ).slideList({
			motionType: 'slide',
			itemWidth: 182,
			viewLength: 1
		});

		// ========== "다른 고객이 현재상품과 같이 구매한 상품" 배너 세팅 ========== //
		$( '.ui-tab-inner-banner' ).slideList({
			motionType: 'slide',
			itemWidth: 172,
			viewLength: 5
		});

		// ========== "패키지 상품보기" layer popup 배너 세팅 ========== //
		$( '.ui-laypop-banner' ).slideList({
			loop: true,
			motionType: 'slide',
			itemWidth: 184,
			viewLength: 3
		});

		// ========== 상단 오른쪽 베너 적용 ========== //
		$( '.pop_mycoupon .pop_bubble_cont' ).overlayList({
			loop: true
		});

		// ========== parallaxScroll 좌표 수동 업데이트 ========== //
		for ( var key in _parallaxScrollUpdatePool ) {
			_parallaxScrollUpdatePool[key]();
		}
	};

	//최초 1번 적용
	UI.resetPageJS( true );
})(jQuery, ixBand);
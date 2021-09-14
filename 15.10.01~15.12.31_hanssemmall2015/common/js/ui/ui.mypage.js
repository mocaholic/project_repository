/**
 * 마이페이지 - UI 요소 적용
 * @version 2015.12.10
 */
;(function ($, $B) {
	//페이지 JS 중복 삽입 체크
	UI.checkOverlapJS( 'ui.mypage' );

    // ----- datepicker 캘린더 ----- //
    $( '.search_box' ).each( function ( idx, el ) {
		var $target = $( el );
		var maxDate = new Date();//오늘
		var minDate = new Date(maxDate.getFullYear(), maxDate.getMonth()-24, 0);//2년전까지

		$target.find( '.datepicker' ).datepicker({
			closeText: '닫기',
			prevText: '이전달',
			nextText: '다음달',
			currentText: '오늘',
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy.mm.dd',
			showMonthAfterYear: true,
			showOtherMonths: true,
			yearSuffix: ".",
			showOn: 'button',
			buttonText: '기간조회',
			showAnim:'slideDown',
			minDate: minDate,
			maxDate: maxDate
		});

		//1주일,1개월,3개월,6개월 버튼
		var today = maxDate.getFullYear() +'.'+ (maxDate.getMonth() + 1) +'.'+ maxDate.getDate();
		var _from
		$target.find( '.ui-datepicker-btn button' ).click( function () {
			var idx = $(this).index();

			if(idx==0){
				_from = maxDate.getFullYear() +'.'+ (maxDate.getMonth() + 1) +'.'+ (maxDate.getDate()-6);
			}else if(idx==1){
				_from = maxDate.getFullYear() +'.'+ maxDate.getMonth() +'.'+ (maxDate.getDate()+1);
			}else if(idx==2){
				_from = maxDate.getFullYear() +'.'+ (maxDate.getMonth() -2) +'.'+ (maxDate.getDate()+1);
			}else if(idx==3){
				_from = maxDate.getFullYear() +'.'+ (maxDate.getMonth() -5) +'.'+ (maxDate.getDate()+1);
			}

			$target.find( '.from_date' ).val(_from);
			$target.find( '.to_date' ).val(today);
			return false;
		})
    });


	//============ "휴대폰/ 주문번호 " 선택 라디오 탭 ============
	$('.top_box .radio_area input ').on('click',function(){
	   var idx = $(this).attr('id').slice(-1),
	       target = $('.top_box .radio_con');
		   idx = idx - 1;	   
			
		target.removeClass('active');	
		target.eq(idx).addClass('active');
	});

	// ========== "결제하기" 작은 버튼 클릭 ========== //
	$( '.btn_small_buy' ).on( 'click', function (e) {
		$( this ).closest( '.list_tr' ).next( '.pay_line' ).removeClass( 'dp_none' );
	});

	/**********************  JS 재적용 가능한 요소들 모음 **********************/
	//동적으로 생성된 요소들의 JS를 적용할때 사용한다, 한번 적용되었던 요소들에는 재 적용되지 않는다.
	UI.resetPageJS = function ( isFirst ) {
		if ( !isFirst ) UI.resetCommonJS();


		// ========== 연계상품 ========== //
		$( '.ui-banner-single' ).slideList({
			motionType: 'slide',
			itemWidth: 182,
			viewLength: 1
		});

		$( '.ui-banner-multi' ).slideList({
			motionType: 'slide',
			viewLength: 4,
			moveLength: 1
		});

		// ========== "상품후기 등록" 팝업 슬라이드 ========== //
		$( '.ui-rating-slider' ).slider({
			baseWidth: 445,
			min: 1,
			max: 10,
			value: 5
		});
	};

	//최초 1번 적용
	UI.resetPageJS( true );
})(jQuery, ixBand);
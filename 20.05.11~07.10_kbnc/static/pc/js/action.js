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

//달력 - datepicker
ACTIONUI.datePicker = {
    onloadFlag: false,
    init: function(){
        this.fn();
    },
    fn: function(target){
        var _target = $('.chk-calendar input');
        $(_target).datepicker({
            //input을 datepicker로 선언
            dateFormat: 'yy-mm-dd', //Input Display Format 변경
            showOtherMonths: true, //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            showMonthAfterYear:true, //년도 먼저 나오고, 뒤에 월 표시
            changeYear: true, //콤보박스에서 년 선택 가능
            changeMonth: true, //콤보박스에서 월 선택 가능
            //showOn: "both", //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
            //buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif", //버튼 이미지 경로
            //buttonImageOnly: false, //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
            //buttonText: "선택", //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
            yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
            monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'], //달력의 월 부분 텍스트
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 Tooltip 텍스트
            dayNamesMin: ['일','월','화','수','목','금','토'], //달력의 요일 부분 텍스트
            dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'], //달력의 요일 부분 Tooltip 텍스트
            //minDate: "-1M", //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            //maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        });

        //From의 초기값을 오늘 날짜로 설정
        //$(_target).datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)

        //To의 초기값을 내일로 설정
        //$(_target).datepicker('setDate', '+1D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)

        //$(_target).datepicker();
    }
}

//전체 카테고리 메뉴
ACTIONUI.category = {
    onloadFlag: false,
    init: function(){
        this.fn();
    },
    fn: function(){
        /*$('.btn-category').on('click', function(){
            if(!$(this).hasClass('on')){
                $(this).addClass('on');
                $('.nav .category').addClass('on');
            }else{
                $(this).removeClass('on');
                $('.nav .category').removeClass('on');
            }
            $('.category-list').mCustomScrollbar({
                theme:"dark",
                scrollInertia:'500'
            });
            $('.cont-list').mCustomScrollbar({
                theme:"light",
                scrollInertia:'500'
            });
        });*/
        $('.btn-category').on('mouseenter', function(){
            $(this).addClass('on');
            $('.nav .category').addClass('on');
            $('.category-list').mCustomScrollbar({
                theme:"dark",
                scrollInertia:'500'
            });
            $('.cont-list').mCustomScrollbar({
                theme:"light",
                scrollInertia:'500'
            });
            $('.info .inner').mouseenter(function(){
                $('.nav .category').removeClass('on');
                $('.btn-category').removeClass('on');
            });
        });
        $('.nav .category-list li').each(function(idx){
            /*$(this).on('click', function(){
                if(!$(this).hasClass('on')){
                    $('.nav .category-list li').removeClass('on');
                    $(this).addClass('on');
                    $('.nav .category-cont').removeClass('on');
                    $('.nav .category-cont:eq('+ idx +')').addClass('on');
                }
            })*/
            $(this).on('mouseenter', function(){
                $('.nav .category-list li').removeClass('on');
                $(this).addClass('on');
                $('.nav .category-cont').removeClass('on');
                $('.nav .category-cont:eq('+ idx +')').addClass('on');
            })
        });
        $('.nav .category').on('mouseleave', function(){
            $(this).removeClass('on');
            $('.btn-category').removeClass('on');
        });
    }
}

//검색어 드롭다운 이벤트
ACTIONUI.searchDrop = {
    onloadFlag: false,
    vars: {
        drop: null,
        list: null,
        inp: null
    },
    init: function(){
        ACTIONUI.inputClear.init();

        this.vars.drop = $('.dropdown');
        this.vars.list = $('.dropdown .list > li');
        this.vars.inp = $('#header .search input[type="text"]');
        this.fn.key();
    },
    fn: {
        key: function(){
            //검색 드롭다운 key event
            ACTIONUI.searchDrop.vars.inp.on('keydown keypress keyup', function(e){
                var _this = $(this);
                if(e.type == 'keydown' || e.type == 'keypress'){
                    if(!ACTIONUI.searchDrop.vars.drop.hasClass('on')){
                        ACTIONUI.searchDrop.vars.drop.addClass('on');

                        //검색 드롭다운 리스트
                        ACTIONUI.searchDrop.vars.list.each(function(idx){
                            $(this).on('click', function(){
                                _this.val($(this).text());
                                ACTIONUI.searchDrop.fn.close();
                            });
                        });
                    }
                }else if(e.type == 'keyup'){
                    if(!$(this).val() && ACTIONUI.searchDrop.vars.drop.hasClass('on')){
                        ACTIONUI.searchDrop.fn.close();
                    }
                }
            }).on('change', function(){
                if(!$(this).val() && ACTIONUI.searchDrop.vars.drop.hasClass('on')){
                    ACTIONUI.searchDrop.fn.close();
                }
            });

            //검색 드롭다운 닫기
            $('.dropdown .btn-close').on('click', function(){
                if(ACTIONUI.searchDrop.vars.drop.hasClass('on')){
                    ACTIONUI.searchDrop.fn.close();
                }
            });
        },
        close: function(){
            if(ACTIONUI.searchDrop.vars.drop.length && ACTIONUI.searchDrop.vars.drop.hasClass('on')){
                ACTIONUI.searchDrop.vars.drop.removeClass('on');
            }
        }
    }
}

//셀랙트박스 - selectric
ACTIONUI.select = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
        $('select').each(function(){
            $(this).selectric();
        });
    }
};

//버튼 토글 - 공통
ACTIONUI.toggle = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(target, callback1, callback2){
        var _target = target;
        $(_target).on('click', function(e){
            e.preventDefault();
            if(!$(this).hasClass('off')){
                //해제
                $(this).addClass('off');
                if($(this).hasClass('social-link')){
                    $(this).text('OFF');
                }
                callback2 ? callback2() : undefined;
            }else{
                //설정
                $(this).removeClass('off');
                if($(this).hasClass('social-link')){
                    $(this).text('ON');
                }
                callback1 ? callback1() : undefined;
            };
        });
    }
}

//검색결과 소팅 뷰
ACTIONUI.sorting = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
        if($('.sort-btn-box').length){
            $('.sort-btn-box > button').each(function(){
                $(this).off('click').on('click', function(){
                    $(this).siblings().removeClass('on');
                    $(this).addClass('on');
                    if($(this).hasClass('btn-view-thum')){
                        $('.search-result').removeClass('type-list').addClass('type-thum');
                    }else{
                        $('.search-result').removeClass('type-thum').addClass('type-list');
                    }
                });
            });
        }
    }
}

//메인 비쥬얼 슬라이드
ACTIONUI.visual = {
    onloadFlag: false,
    vars:{
        slideBarArr: null,
        slideBarEl: '<div class="slide-bar"><span class="per"></span></div>',
        slideControl: '<div class="slide-control"><button class="btn-control"><span class="blind">일시정지</span></button></div>',
        widthArr: [],
        posArr: []
    },
    init: function(slideBarTxt){
        this.fn(slideBarTxt);
    },
    fn: function(slideBarTxt){
        //슬라이드 - 옵션 설정
        $('.visual .slide-visual').slick({
			lazyLoad: 'progressive',
            dots: true,
            autoplay: false, //정지 상태로 시작
            autoplaySpeed: 3000,
        });

        ACTIONUI.visual.vars.slideBarArr = slideBarTxt; //슬라이드바 텍스트 셋팅

        //슬라이드바 추가
        $('.slick-dots').append(ACTIONUI.visual.vars.slideBarEl).append(ACTIONUI.visual.vars.slideControl);

        //슬라이드바 실행 순서
        function slideBarPlay(callback1){
            setTimeout(function(){
                callback1(slideBarShow);
                $('.visual .slide-visual .slick-arrow').addClass('on');
            }, 1500);
        }
        function slideBarShow(){
            $('.slide-bar').addClass('on').hide().clearQueue().stop().fadeIn(300);
            $('.visual .slick-dots').addClass('on').hide().clearQueue().stop().fadeIn(300);
            $('.slide-control').clearQueue().stop().fadeIn(300);
            //슬라이드 재생(슬라이드바 셋팅 완료 후)
            $('.visual .slide-visual').slick('slickPlay');
        }

        //초기 슬라이드바 위치 설정
        function slideBarPos(callback2){
            $('.visual .slick-dots li').each(function(idx){
                $(this).find('button').text(ACTIONUI.visual.vars.slideBarArr[idx]);
                ACTIONUI.visual.vars.widthArr.push($(this).outerWidth());
                ACTIONUI.visual.vars.posArr.push(Math.round($(this).position().left));

                $('.slide-bar').css({
                    'left': ACTIONUI.visual.vars.posArr[0],
                    'width': ACTIONUI.visual.vars.widthArr[0]
                });
            });
            slideBarAni(0);
            callback2();
        }
        slideBarPlay(slideBarPos);

        //첫번째 활성화 슬라이드 보여짐
        $('.visual .slide-bg > div.current').clearQueue().stop().fadeIn(1000);

        //슬라이드바 애니메이션 설정
        function slideBarAni(idx){
            $('.per').clearQueue().stop().css('width', 0).animate({
                'width': ACTIONUI.visual.vars.widthArr[idx]
            },{
                duration: 3000 //autoplaySpeed
            });
        }

        //슬라이드 작동시 이벤트
        $('.visual .slide-visual').off('beforeChange').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $('.visual .slide-bg > div').clearQueue().stop().hide().removeClass('current');
            $('.visual .slide-bg > div:eq('+ nextSlide +')').clearQueue().stop().fadeIn(800).addClass('current');

            $('.slide-bar').clearQueue().stop().animate({
                'left': ACTIONUI.visual.vars.posArr[nextSlide],
                'width': ACTIONUI.visual.vars.widthArr[nextSlide]
            });
            if(!$('.visual .btn-control').hasClass('stop')){
                slideBarAni(nextSlide);
            }else{
                $('.per').css('width', 0);
            }
        });

        $('.visual .btn-control').off('click').on('click', function(){
            if(!$(this).hasClass('stop')){
                $(this).addClass('stop');
                $('.visual .slide-visual').slick('slickPause'); //unslick 슬릭 해제
                $('.per').clearQueue().stop();
            }else{
                $(this).removeClass('stop');
                $('.visual .slide-visual').slick('slickPlay');
                var idxActive = $('.visual .slick-dots li.slick-active').index();
                slideBarAni(idxActive);
            }
        });
    }
}

//메인 베스트 상품
ACTIONUI.bestTab = {
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
                    $(this).parent().parent().find('.tab-cont').removeClass('on');
                    $(this).parent().parent().find('.tab-cont:eq('+ idx +')').addClass('on');
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

//상품 더보기 버튼
ACTIONUI.moreView = {
    onloadFlag: false,
    init: function(){
        //this.fn();
    },
    fn: {
        on: function(target){
            var _target = target;
            if(!$(_target).hasClass('off')){
                $(_target).addClass('off');
                $(_target).find('.txt').text('닫기');
				$(_target).parent().siblings('.product-list').css('height','auto'); // 05.21 추가
            }
        },
        off: function(target){
            var _target = target;
            if($(_target).hasClass('off')){
                $(_target).removeClass('off');
                $(_target).find('.txt').text('더보기');
				$(_target).parent().siblings('.product-list').css('height','775px'); // 05.22 수정
            }
        }
    }
}

//검색 테이블
ACTIONUI.searchTbl = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
        $('.tbl-search').each(function(idx){
            $(this).find('.btn-toggle').on('click', function(){
                var tdBox = $(this).parent('th').siblings('td').find('.td-box');
                if(!tdBox.hasClass('on')){
                    $(this).addClass('on');
                    tdBox.addClass('on');
                }else{
                    $(this).removeClass('on');
                    tdBox.removeClass('on');
                }
            });
        });
    }
}

//윈도우 스크롤 이벤트 공통 관리
ACTIONUI.winEvt = {
    onloadFlag: true,
    vars: {
        winW: $(window).width(),
        winH: $(window).height(),
        winStand: 1200,
        winScTop: $(window).scrollTop(),
        test11: null
    },
    init: function(){
        this.fn.load();
        this.fn.resize();
        this.fn.scroll();
    },
    fn: {
        load: function(){
            $(window).on('load', function(){
                ACTIONUI.winEvt.vars.winScTop = $(window).scrollTop();

                //화면 로딩 0.5초 후 함수 호출
                setTimeout(function(){
                    ACTIONUI.fixBox.fn.scroll(); //탭 스크롤 고정
                }, 500);
            });
        },
        resize: function(){
            $(window).off('resize').on('resize', function(){
                ACTIONUI.winEvt.vars.winW = $(window).width();
                ACTIONUI.winEvt.vars.winH = $(window).height();

                ACTIONUI.qnb.fn.chk();
            });
        },
        scroll: function(){
            $(window).off('scroll').on('scroll', function(){
                ACTIONUI.winEvt.vars.winScTop = $(window).scrollTop();
                ACTIONUI.fixBox.fn.scroll(); //탭 스크롤 고정
            });
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

//인풋박스 삭제버튼
ACTIONUI.inputClear = {
    onloadFlag: true,
    init: function(){
        this.fn();
    },
    fn: function(){
        $('.input-box .input-cell input').each(function(){
			if($(this).hasClass("number")){

			}else {
				$(this).on('keyup', function () {
					if($(this).val() == ''){
						$(this).next('.cancel').hide();
					} else{
						$(this).next('.cancel').show();
					}
				});
			}
        });

        $('.input-box .cancel').click(function(){
            event.preventDefault();
			$(this).prev('input').val('');
            $(this).prev('input').focus();
            $(this).hide();
            ACTIONUI.searchDrop.fn.close();
        });
    }
}

//퀵메뉴
ACTIONUI.qnb = {
    onloadFlag: false,
    vars: {
        total: null,
        current: null
    },
    init: function(){
        this.fn.load();
    },
    fn: {
        load: function(){
            ACTIONUI.qnb.fn.chk();
            ACTIONUI.qnb.fn.slide();

            //퀵메뉴 슬라이드
            if($('.slide-qnb').length){
                $('.slide-qnb').slick({
                    autoplay: false,
                    autoplaySpeed: 3000,
                    speed: 300
                });
            }

			/* 05.21 추가 */
			var slideLength = $('.qnb-list li').length;
			if(slideLength < 3){
				$('.qnb-paging').hide();
			}else {
				$('.qnb-paging').show();
				$('#qnb .slide-qnb').css("padding-bottom","40px")
			}
			/* // 05.21 추가 */

            //퀵메뉴 열기/접기
            $('#qnb .btn-toggle').on('click', function(){
                var qnbPosL = parseInt($('#qnb').css('right'));
                if(qnbPosL < 0){
                    ACTIONUI.qnb.fn.ani.on();
                }else{
                    ACTIONUI.qnb.fn.ani.off();
                }
            });

            //퀵메뉴 TOP버튼
            $('.btn-top').on('click', function(){
                $('html, body').animate({
                    scrollTop: 0
                },{
                    duration: 800
                });
            });
        },
        chk: function(){
            if(ACTIONUI.winEvt.vars.winW <= ACTIONUI.winEvt.vars.winStand){
                ACTIONUI.qnb.fn.ani.off();
                $('#qnb .btn-toggle').addClass('show');
            }else{
                ACTIONUI.qnb.fn.ani.on();
                $('#qnb .btn-toggle').removeClass('show');
            }
        },
        ani: {
            on: function(){
                $('#qnb .btn-toggle').removeClass('off');
                $('#qnb').stop().animate({
                    right: 0
                },{
                    duration: 300
                });
            },
            off: function(){
                $('#qnb .btn-toggle').addClass('off');
                $('#qnb').stop().animate({
                    right: '-100px'
                },{
                    duration: 300
                });
            }
        },
        slide: function(){
            //슬라이드 로드시, 슬라이드 후 이벤트
            $('.slide-qnb').on('init afterChange', function(event, slick, currentSlide, nextSlide){
                //페이징 값 전달
                ACTIONUI.qnb.vars.total = slick.slideCount;
                ACTIONUI.qnb.vars.current = slick.currentSlide + 1;

                $('.qnb-paging .current').text(ACTIONUI.qnb.vars.current);
                $('.qnb-paging .total').text(ACTIONUI.qnb.vars.total);
            });
        }
    }
}

//상품 상세 마우스 이벤트
ACTIONUI.productList = {
    onloadFlag: true,
    vars: {
        list: null
    },
    init: function(){
        this.vars.list = $('.product-list li');
        this.fn();
    },
    fn: function(){
        ACTIONUI.productList.vars.list.each(function(){
            $(this).on('mouseover mouseenter mouseout mouseleave', function(e){
                var layer = $(this).find('.layer');
                if(layer.length){
                    if(e.type == 'mouseover' || e.type == 'mouseenter'){
                        layer.stop().animate({
                            bottom: 0
                        },{
                            duration: 150
                        });
                    }else if(e.type == 'mouseout' || e.type == 'mouseleave'){
                        layer.stop().animate({
                            bottom: '-40px'
                        },{
                            duration: 150
                        });
                    }
                }

            });
        });
    }
}

//상품 목록 배너 슬라이드
ACTIONUI.bannerSlide = {
    onloadFlag: false,
    init: function(){
        this.fn();
    },
    fn: function(){
        //상품 페이징 슬라이드
        $('.slide-banner').on('mouseover mouseenter mouseout mouseleave', function(e){
            if(e.type == 'mouseover' || e.type == 'mouseenter'){
                $(this).find('.slick-arrow').addClass('on');
            }else if(e.type == 'mouseout' || e.type == 'mouseleave'){
                $(this).find('.slick-arrow').removeClass('on');
            }
        });

        //슬라이드 옵션 설정, 실행
        $('.slide-banner').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 300,
            dots: true
        });
    }
}

//상품 목록 랭킹 슬라이드
ACTIONUI.rankingSlide = {
    onloadFlag: false,
    vars: {
        fackBtnPrev: '<span class="slick-prev slick-arrow"></span>',
        fackBtnNext: '<span class="slick-next slick-arrow"></span>',
        total: null,
        current: null
    },
    init: function(){
        this.fn();
    },
    fn: function(){
        //슬라이드 로드시, 슬라이드 후 이벤트
        $('.slide-ranking').on('init afterChange', function(event, slick, currentSlide, nextSlide){
            var slideLen = $('.slide-ranking .slick-track .slick-slide').length;
            //슬라이드가 한개일 경우 페이크 버튼 추가
            if(slideLen < 2){
                $('.slide-ranking .slick-list').before(ACTIONUI.rankingSlide.vars.fackBtnPrev).after(ACTIONUI.rankingSlide.vars.fackBtnNext);
            }

            //페이징 값 전달
            ACTIONUI.rankingSlide.vars.total = slick.slideCount;
            ACTIONUI.rankingSlide.vars.current = slick.currentSlide + 1;

            $('.ranking-paging .current').text(ACTIONUI.rankingSlide.vars.current);
            $('.ranking-paging .total').text(ACTIONUI.rankingSlide.vars.total);
        });

        //슬라이드 옵션 설정, 실행
        $('.slide-ranking').slick({
            autoplay: false,
            autoplaySpeed: 5000,
            speed: 300
        });
    }
}

//탭 스크롤 고정
ACTIONUI.fixBox = {
    onloadFlag: true,
    vars: {
        posYArr: []
    },
    init: function(){
        this.fn.time();
        this.fn.scroll();
    },
    fn: {
        time: function(){
            //화면 로딩 1초 후 실행
            setTimeout(function(){
                ACTIONUI.fixBox.fn.pos();
                ACTIONUI.fixBox.init();
            }, 1000);
        },
        pos: function(){
            //위치 셋팅
            $('.fix-box').each(function(){
                ACTIONUI.fixBox.vars.posYArr.push($(this).offset().top);
            });
        },
        scroll: function(){
            if($('.fix-box').length){
                if(ACTIONUI.winEvt.vars.winScTop >= ACTIONUI.fixBox.vars.posYArr[0] && ACTIONUI.winEvt.vars.winScTop < ACTIONUI.fixBox.vars.posYArr[1]){
                    $('.fix-box:eq(0)').addClass('fixed');
                }else{
                    $('.fix-box:eq(0)').removeClass('fixed');
                }


                if(ACTIONUI.winEvt.vars.winScTop >= ACTIONUI.fixBox.vars.posYArr[1] && ACTIONUI.winEvt.vars.winScTop < ACTIONUI.fixBox.vars.posYArr[2]){
                    $('.fix-box:eq(1)').addClass('fixed');
                }else{
                    $('.fix-box:eq(1)').removeClass('fixed');
                }


                if(ACTIONUI.winEvt.vars.winScTop >= ACTIONUI.fixBox.vars.posYArr[2]){
                    $('.fix-box:eq(2)').addClass('fixed');
                }else{
                    $('.fix-box:eq(2)').removeClass('fixed');
                }
            }else{
                return false;
            }
        }
    }
}

//상품 옵션 슬라이드
ACTIONUI.optionsSlide = {
    onloadFlag: false,
    vars: {
        count: 1,
        spd: 250,
        aniFlag: false,
        btnNext: null,
        btnPrev: null,
        dotsLi: null,
        thumArr: null
    },
    init: function(el, thum){
        ACTIONUI.optionsSlide.fn.slide(el, thum);
    },
    fn: {
        load: function(el){
            //인자 변수 설정
            ACTIONUI.optionsSlide.vars.dotsLi = $(el).find('.slick-dots li');

            //썸네일 이미지 설정
            ACTIONUI.optionsSlide.vars.dotsLi.each(function(idx){
                $(this).find('button').html(ACTIONUI.optionsSlide.vars.thumArr[idx]);
            });
        },
        reset: function(el){
            //좌, 우 버튼 카운트 0으로 초기화
            ACTIONUI.optionsSlide.vars.count = 0;

            //인자 변수 설정
            ACTIONUI.optionsSlide.vars.dotsLi = $(el).find('.slick-dots li');

            //썸네일 위치 설정
            ACTIONUI.optionsSlide.vars.dotsLi.each(function(idx){
                $(el).find('.slick-dots li:eq('+ idx +')').css({
                    left: $(this).outerWidth()*idx
                });
            });

            //첫번째 슬라이드로 이동
            $(el).slick('slickGoTo', 0);
        },
        slide: function(el, thum){
            $(el).slick({
                infinite: false,
                dots: true,
                autoplay: false,
                autoplaySpeed: 1000
            });

            //인자 변수 설정
            ACTIONUI.optionsSlide.vars.btnNext = $(el).find('.slick-next');
            ACTIONUI.optionsSlide.vars.btnPrev = $(el).find('.slick-prev');
            ACTIONUI.optionsSlide.vars.dotsLi = $(el).find('.slick-dots li');
            ACTIONUI.optionsSlide.vars.thumArr = thum;

            ACTIONUI.optionsSlide.fn.load(el);
            ACTIONUI.optionsSlide.fn.reset(el);

            //다음 썸네일 리스트 이동
            ACTIONUI.optionsSlide.vars.btnNext.on('click', function(){
                if(ACTIONUI.optionsSlide.vars.dotsLi.length <= ACTIONUI.optionsSlide.vars.count) { // 이미지 개수까지만 이동하고 처음으로 이동
                	ACTIONUI.optionsSlide.fn.reset(el);
                	return;
                }
                var _target = $(this);
                btnOverlap(_target);
                if(ACTIONUI.optionsSlide.vars.count == 3){
                    ACTIONUI.optionsSlide.vars.btnPrev.css('z-index', 1);
                    ACTIONUI.optionsSlide.vars.dotsLi.each(function(idx){
                        $(el).find('.slick-dots li:eq('+ idx +')').stop().animate({
                            left: parseInt($(this).css('left')) - 300
                        },{
                            duration: ACTIONUI.optionsSlide.vars.spd
                        });
                    });
                }

                if(ACTIONUI.optionsSlide.vars.count == 4){
                    $(this).css('z-index', -1);
                }
            });

            //이전 썸네일 리스트 이동
            ACTIONUI.optionsSlide.vars.btnPrev.on('click', function(){
                var _target = $(this);
                btnOverlap(_target);
                if(ACTIONUI.optionsSlide.vars.count == 4){
                    ACTIONUI.optionsSlide.vars.btnNext.css('z-index', 1);
                    ACTIONUI.optionsSlide.vars.dotsLi.each(function(idx){
                        $(el).find('.slick-dots li:eq('+ idx +')').stop().animate({
                            left: parseInt($(this).css('left')) + 300
                        },{
                            duration: ACTIONUI.optionsSlide.vars.spd
                        });
                    });
                }
                if(ACTIONUI.optionsSlide.vars.count == 2){
                    $(this).css('z-index', -1);
                }
            });

            //슬라이드 작동시 카운트 전달
            $(el).off('afterChange').on('afterChange', function(event, slick, currentSlide, nextSlide){
                ACTIONUI.optionsSlide.vars.count = slick.currentSlide + 1;
            });

            function btnOverlap(btn){
                btn.css('z-index', -1)
                setTimeout(function(){
                    btn.css('z-index', 1);
                }, 500);
            }
        }
    }
}

//상품 옵션 selectbox
ACTIONUI.optionsSelect = {
    onloadFlag: false,
    vars: {
        priceArr: null
    },
    init: function(el, price){
        ACTIONUI.optionsSelect.fn.load(el, price);
        ACTIONUI.optionsSelect.fn.combobox(el);
    },
    fn: {
        load: function(el, price){
            //인자 변수 설정
            ACTIONUI.optionsSlide.vars.priceArr = price;

            $(el).selectric({
                optionsItemBuilder: function(itemData, element, index) {
                    return element.val().length
                            ? itemData.text
                            + '<span class="price"><span class="num">'
                            + ACTIONUI.optionsSlide.vars.priceArr[index].num
                            + '</span><span class="unit">'
                            + ACTIONUI.optionsSlide.vars.priceArr[index].unit
                            + '</span></span>'
                            : itemData.text;
                },
                onChange: function(itemData, element, index){
                    console.log($(this).val()); //.combobox-value > .txt
                }
            });
        },
        combobox: function(){
            $('.combobox').each(function(){
                $(this).find('.btn-del').off('click').on('click', function(){
                    $(this).parent('.combobox').remove();
                    ACTIONUI.winEvt.init();
                });
            });
        }
    }
}

//상품 옵션 optionsSelectBox
ACTIONUI.optionsSelectBox = {
  onloadFlag: false,
  vars: {
      priceArr: null
  },
  init: function(el){
      ACTIONUI.optionsSelectBox.fn.load(el);
      ACTIONUI.optionsSelectBox.fn.combobox(el);
  },
  fn: {
      load: function(el){
          $(el).selectric({
              optionsItemBuilder: function(itemData, element, index) {
              	var data = eval('('+element.find("option").eq(index).attr("optdata")+')');
              	var optAmt = "";
              	if(data) {
              		//if(data.chiOptAmt != "0")
              		optAmt = Number(data.salPrc)+Number(data.chiOptAmt);

          			return itemData.text
		                    + '<span class="price"><span class="num">'
		                    + optAmt.format()
		                    + '</span><span class="unit">'
		                    + "원"
		                    + '</span></span>'
              	} else {
              		return itemData.text;
              	}
              },
              onChange: function(selElement, element) {
                  //console.log($(this).val()); //.combobox-value > .txt
            	  var optoinOnChange = $(selElement).attr("optChange");
            	  if(optoinOnChange != null && optoinOnChange != "") {
                	  eval(optoinOnChange).call(this, selElement, element);
            	  }
              }
          });
      },
      combobox: function(){
          $('.combobox').each(function(){
              $(this).find('.btn-del').off('click').on('click', function(){
                  $(this).parent('.combobox').remove();
                  ACTIONUI.winEvt.init();
              });
          });
      }
  }
}

//상품 찜하기
ACTIONUI.productKeep = {
    onloadFlag: true,
    vars: {
        el: '<div class="toast-keep"><span class="txt">찜</span></div>'
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
				$('.toast-keep').addClass('on').clearQueue().fadeIn(800).fadeOut(800);
				return false;
            },
            off: function(){
				$('.toast-keep .txt').text('찜취소');
				$('.toast-keep').removeClass('on').clearQueue().fadeIn(800).fadeOut(800);
				return false;
            }
        }
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
            $('html, body').scrollTop(ACTIONUI.winEvt.vars.winScTop);

            callback3 ? callback3() : undefined;

            var _layer = $('#' + layer);
            if(!ACTIONUI.layerPop.vars.wrap.hasClass('on')){
                ACTIONUI.layerPop.vars.wrap.addClass('on');
                $('html').addClass('fix');
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
                if(_layer.hasClass('on')){
                    _layer.removeClass('on');
                    if(_layer.find('.slide').length){
                        //슬라이드 초기회
                        _layer.find('.slide').slick('unslick');

                        //상품 상단 슬라이드 초기화
                        ACTIONUI.optionsSlide.fn.reset('.content-detail .slide-options');
                    }
                    callback1 ? callback1() : undefined;
                }
                $('html').removeClass('fix');
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
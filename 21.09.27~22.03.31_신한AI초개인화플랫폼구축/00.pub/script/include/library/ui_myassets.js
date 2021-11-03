/* 마이자산 고도화 */

var uiMyAssets = {
    'tooltip' : function(){
        $('body').on('click', '.tipOpenNew', function(event){
            var isRightClass = $(event.currentTarget).hasClass('tyRight');
            var wrapperClass = isRightClass ? 'tooltipBoxNew tyRight' : 'tooltipBoxNew';
            var thisOffsetY = $(event.currentTarget).position().top;
            var tooltipTxt = $(event.currentTarget).attr('title');
            var tooltiplink = $(event.currentTarget).attr('data-rel');
            var tooltiplinkText = $(event.currentTarget).attr('data-role');
            $('.tooltipBoxNew, .wdim').remove();
            if(tooltiplink == null || tooltiplink == undefined){
                $(event.currentTarget).after('<div class="'+ wrapperClass +'"><div class="reDiv">'+ tooltipTxt +'<button class="closeBtn"><i class="iconTy32"></i></button></div></div><div class="wdim"/>');
                // $(event.currentTarget).addClass('on');
            }else {
                $(event.currentTarget).after('<div class="'+ wrapperClass +'"><div class="reDiv">'+ tooltipTxt +'<a href="javascript:void(0);" class="btnType3" onclick="'+ tooltiplink +'">'+ tooltiplinkText +'</a> <button class="closeBtn"><i class="iconTy32"></i></a></div></div><div class="wdim"/>');
                // $(event.currentTarget).addClass('on');
            }

            $('.tooltipBoxNew').css({"top":$(window).height()*0.8 > thisOffsetY + $('.tooltipBoxNew').height() ? thisOffsetY : thisOffsetY-$('.tooltipBoxNew').height()-28, "display":"block"});

            // start : 살기좋은동네 > 자금설계상세정보 : 예외처리
            if($(event.currentTarget).hasClass('uiTypeNeighbor')){
                var condition = $(window).height() * 0.8 + $('.contents').scrollTop() > thisOffsetY + $('.tooltipBoxNew').height();
                $('.tooltipBoxNew').css({
                    'top':condition ? thisOffsetY : thisOffsetY - $('.tooltipBoxNew').height() - 28,
                });
            }
            // end : 살기좋은동네 > 자금설계상세정보 : 예외처리

            $('.wdim, .closeBtn').on('click', function(event){
                $('.tooltipBoxNew, .wdim').css({"display":"none"});
                $('.tipOpenNew').removeClass('on');
            });
            $('.contents, .mainDetailWrap').scroll(function(){
                $('.tooltipBoxNew, .wdim').css({"display":"none"});
                $('.tipOpenNew').removeClass('on');
            });
            event.stopPropagation(); // 부모 이벤트 속성을 제거
        });
    },

    'dropdown' : function(){
        if($('.selecterNew').length){ /* 서브타이틀 */
            var $target;
            $('.selecterNew .select').bind({
                'click' : function(){
                    $(this).closest('.selecterNew').toggleClass('focus');
                    $(this).closest('.selecterNew').find('.sub').attr('tabindex',0).focus();
                    $target = $(this);
                    return false;
                }
            });
            $('.selecterNew .sub > ul > li').bind({
                'click' : function(){
                    $(this).closest('.selecterNew').removeClass('focus');
                    $(this).closest('.selecterNew').find('.current').html($(this).find('button').html());

                    $(this).addClass('on').siblings().removeClass('on');
                    $target.focus();
                    return false;
                }
            });
            $('.contents, #headerWrap').bind({
                'click' : function(e){
                    if(!$(e.target).closest('.selecterNew').length) {
                        $('.selecterNew').removeClass('focus');
                        $('.wdim').remove();
                    }
                    if(!$(e.target).closest('.popoverWrap').length) {
                        $('.toolBox').hide();
                        $('.wdim').remove();
                    }
                }
            });
            $('.contents').scroll(function(){
                $('.toolBox').hide();
                $('.selecterNew').removeClass('focus');
                $('.wdim').remove();
            });
        }
    },

    'formItem' : function(){
        if(!$('.formItem input, .formItem textarea')) return;

        uiMyAssets.validFormItem();

        $('.formItem input').each(function(){
            if($(this).val()){
                $(this).parents('.inner').find('.unit').css('display','table-cell');
            }
        });

        $(document).on('focus', '.formItem input, .formItem textarea', function(e){
            if(!$(this).attr('readonly')){
                $(this).parents('.formRow').addClass('focus');
                if($(this).val()){
                    $(this).parents('.inner').find('.unit, .btn').css('display','table-cell');
                }

                // 가짜 포커스 생성
                var fakeHTML = '<span class="hiddenFocus" tabindex="-1" />';
                var hasFake = $(e.target).parent('.input').find('.hiddenFocus').length;
                !hasFake && $(e.target).parent('.input').prepend(fakeHTML);
            }
        });

        $(document).on('keyup', '.formItem input, .formItem textarea', function(){
            if(!$(this).attr('readonly')){
                var $target = $(this).parents('.inner').find('.unit, .btn');
                var hasValue = $(this).val();
                hasValue ? $target.css('display','table-cell') : $target.hide();
            }
        });

        $(document).on('blur','.formItem input, .formItem textarea', function(e){
            $(e.target).parents('.formRow').removeClass('focus');

            // start : 금액 폼 - 값이 없을 때 0원 처리
            var $zero = $(e.target).parents('.formRow').find('.zero');
            if($zero.length && !$(e.target).val()){
                $(this).val(0);
                $zero.css('display','table-cell');
            }
            // end : 금액 폼 - 값이 없을 때 0원 처리

            setTimeout(function(){
                $(e.target).parents('.inner').find('.btn').hide();
            }, 150);
        });

        $(document).on('touchstart.TOUCH_INPUT', '#contentsWrap', function(e){
            // 가짜 포커스 제거
            if($(e.target.className == 'iconTyDeleteValue')){
                return;
            }

            if($(e.target).find('.hiddenFocus').length){
                $(e.target).find('.hiddenFocus').focus().blur().remove();
            }
        });

        $(document).on('click', '.formItem .btnDelete', function(){
            $(this).parents('.inner').find('input, textarea').val('').focus();
            $(this).parents('.inner').find('.unit').hide();
        });
    },

    'validFormItem' : function(){
        $('.formItem input').each(function(){
            if($(this).val()){
                $(this).parents('.inner').find('.unit').css('display','table-cell');
            }
        });
    },

    'tabs' : function(){
        if(!$('.uiTabs').length) return;

        if($('.uiTabs a.on, .uiTabs button.on').length){
            $('.uiTabs a.on, .uiTabs button.on').attr('title','현재선택됨');
        }

        $('.uiTabs a, .uiTabs button').on('click', function(e){
            // e.preventDefault();
            var targetId = $(e.currentTarget).get(0).tagName == 'A' ? $(this).attr('href') : $(e.currentTarget).get(0).tagName == 'BUTTON' ? $(this).attr('data-href') : null;
            console.log(targetId);
            $(this).addClass('on').attr('title','현재선택됨');
            $(this).siblings().removeClass('on').removeAttr('title');
            $(targetId).show().siblings().hide();
            return false;
        });
    },

    'feedAccordion' : function(){
        if($('.feedAccordion').length){

            if($('#contentsWrap .mainDetailWrap').length || $('#contentsWrap .mainServiceCont').length){
                if($('#contentsWrap .mainDetailWrap').length){
                    var $scrollPanel = $('#contentsWrap .mainDetailWrap');
                    var scrollGap = 130;
                } else if($('#contentsWrap .mainServiceCont').length){
                    var $scrollPanel = $('#contentsWrap .mainServiceCont');
                    var scrollGap = 210;
                }

                function _scrollTo($el, gap){
                    var nTop = $el.offset().top;
                    var sTop = $scrollPanel.scrollTop();

                    setTimeout(function(){
                        $scrollPanel.animate({screenTop:(nTop + sTop)-gap}, 350);
                    }, 250);
                }
            }
            $('.feedAccordion').each(function(){
                if(!$(this).hasClass('on')){
                    $(this).find('.feedAccoCont').hide();
                }else{
                    $(this).find('.feedAccoCont').show();
                }
            });
            $('.feedAccordion').off('click.feedClick').on('click.feedClick', '.feedToggle', function(e){
                var $target = $(e.currentTarget);
                var $wrapper = $(e.currentTarget);

                if(!$target.parent().hasClass('on')){
                    $target.parent().addClass('on');
                    $target.siblings('.feedAccoCont').slideDown(250);
                    if($('#contentsWrap .mainDetailWrap').length || $('#contentsWrap .mainServiceCont').length){
                        _scrollTo($wrapper, scrollGap);
                    }
                }else{
                    $target.parent().removeClass('on');
                    $target.siblings('.feedAccoCont').slideUp(250);
                }
            });
        }
    },

    'accordion' : function(){
        if($('.AccorTitleNew').length){
            $('.AccorTitleNew').each(function(){
                // h2, h3 오류대응
                if(!$('.qnaInvest').length){ // 예외 (투자성향분석)
                    var idTit = $(this).find('a>.tit').prop('tagName');
                    if(idTit == 'H3' || idTit == 'H2'){
                        idTit = idTit.toLowerCase();
                        var txtRe = $(this).html();
                        $(this).empty().html(txtRe.replace(eval('/'+ idTit + '/gi'),'p'));
                    }
                }
                if(!$(this).parents('.contAccordionNew').hasClass('on')){
                    $(this).find('a').attr('title','세부내역 열기').find('.arrow span').text('');
                }else{
                    $(this).find('a').attr('title','세부내역 닫기').find('.arrow span').text('');
                }
            });
        }
        $('.contAccordionNew .AccorTitleNew a').attr('role','button');
        $(document).on('click','.contAccordionNew .AccorTitleNew a', function(){
            // var accTit = $(this).parents('.contAccordionNew').find('.tit:first').text();
            if(!$(this).hasClass('pageLink')){
                if($(this).parents('.contAccordionNew').hasClass('on')){
                    $(this).parents('.contAccordionNew').removeClass('on');
                    $(this).parents('.AccorTitleNew').siblings('.AccorContNew').slideUp();
                    $(this).attr('title','세부내역 열기');
                }else{
                    $(this).parents('.contAccordionNew').addClass('on');
                    $(this).parents('.AccorTitleNew').siblings('.AccorContNew').slideDown();
                    if(!$(this).parents('.accExceptWrap').length){
                        var sHeight = screen.height/2.5;
                        var nTop = $(this).parents('.contAccordionNew').offset().top;
                        var sTop = $('.contents').scrollTop();
                        var scNum = sTop + (nTop-sHeight);
                        if(sHeight < nTop){
                            $('#contentsWrap .contents').animate({scrollTop:scNum});
                        }
                    }
                    $(this).attr('title','세부내역 닫기');
                }
                return false;
            }
        });
    },

    'preventPopup' : function(){
        // ui.js 방지용
        $('.layerPopBottomWrap').off('click','li');
    },

    'checkingForIOS' : function(){
        var UserAgent = navigator.platform; // 안드로이드, ios 체크를 위한 변수
        if(UserAgent.match(/i(Phone|Pad|Pod)/i) != null){
            $('body').width(screen.width);
        }
    },

    'interestBtn' : function(){
        if($('.btnInterestPark').length){
            $('body').on('click','btnInterestPark',function(e){
                e.preventDefault();

                var $target = $(e.currentTarget),
                    isActive = $(e.currentTarget).hasClass('active');

                $target[isActive ? 'removeClass':'addClass']('active');
            });
        }
    },

    'directPlanFocusout' : function(){
        $(document).on('click','.directPlanWrap .AccorTitle > a',function(){
            $('.directPlanWrap input').each(function(){
                $(this).blur();
            });
        });
    },

    'init' : function(){
        uiMyAssets.tooltip(); // 뉴 툴팁
        uiMyAssets.dropdown(); // 드롭다운
        uiMyAssets.formItem(); // 폼
        uiMyAssets.tabs();
        uiMyAssets.feedAccordion(); // MY 피드 아코디언
        uiMyAssets.accordion();
        uiMyAssets.preventPopup();
        uiMyAssets.checkingForIOS();
        uiMyAssets.interestBtn();
        uiMyAssets.directPlanFocusout();
    }
}


$(function(){
    $(window).load(function(){
        uiMyAssets.init();

        $(document).on('click.CLICK_MAIN', '.layerPopWrap .btnPopClose, .btnGroupBox > .btnType, .layerPopBottomWrap .btnPopClose, .layerPopBottomWrap.hasDim',function(){
            if($('#contentsWrap').find('.swiper-container').length && $('#contentsWrap').find('.mainDetailWrap').length){
                $('#contentsWrap .mainDetailWrap').removeClass('touchLock');
                publicSwiper().enableTouchControl();
            }
        });

        $(document).on('click.CLICK_MAIN','.btnPopOpen',function(){
            if($('#contentsWrap').find('.swiper-container').length && $('#contentsWrap').find('.mainDetailWrap').length){
                $('#contentsWrap .mainDetailWrap').add630Class('touchLock');
                publicSwiper().enableTouchControl();
            }
        });
    });
});
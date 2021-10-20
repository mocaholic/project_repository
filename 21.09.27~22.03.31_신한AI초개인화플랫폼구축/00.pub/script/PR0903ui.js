/****************************************************
 * @ 업무명 : 
 * @ 설명 : 
 * @ 파일명 : PR0903ui.js
 ****************************************************
 * 번호     작업자     작업일       변경내용
 * 
 * 1        윤지혜     21.10.15     최초 작성
 ****************************************************/

/* UI Animation */
var solAI = {
    'toggleCheck' : function(){
        $(document).on('change','.toggleCheck :checkbox',function(){
            var chkCont = $(this).parents().next('.toggleChkCont');

            if($(this).is(':checked')) {
                chkCont.slideDown();
            }else {
                $(this).prop('checked',false);
                chkCont.slideUp();
            }
            return false;
        });
    },
    //  라디오버튼 토글기능
    // 기존 기능이나 한 페이지에 동일한 클래스가 여러개일 경우 동시 적용됨, 분리될 필요가 있어 추가 작업
    'toggleRadioM2' : function(){
        $(document).on('change','.toggleRadioM2 :radio',function(){
            var idx = $(this).index();
            var togBox = $(this).parent().parent().parent('.inputBox').next('.toggleRadioCont');

            if(idx == 0) {
                togBox.slideDown();
            }else {
                togBox.slideUp();
            }
            return false;
        });
    },
    'tabRadioM' : function(){
        $(document).on('change','.tabRadioM :radio',function(){
            var idx = $(this).index()/2;
            var tabRCont = $(this).parents().next('.tabRCont').find('div');
            var trName = $(this).attr('name');

            if($(this).is(':checked')) {
                tabRCont.hide();
                tabRCont.eq(idx).show();

                if($(this).parent().hasClass('type2') == true) { 
                    if(idx === 1) {
                        tabRCont.show();
                    }else {
                        tabRCont.hide();
                    }
                }
            }
            return false;
        });
    },
    'tabCheckM' : function(){
        $(document).on('change','.tabCheckM',function(){
            var idx = $(this).index()/2;
            var tabCCont = $(this).parents().next('.tabChkCont').find('div');

            if($(this).is(':checked')) {
                tabCCont.eq(idx).show();
            }else {
                tabCCont.eq(idx).hide();
            }
            return false;
        });
    },

    'init' : function(){
        solAI.toggleCheck();
        solAI.toggleRadioM2();
        solAI.tabRadioM();
        solAI.tabCheckM();
    },
}

$(function(){
    $(window).load(function(){
        solAI.init();
    });
});








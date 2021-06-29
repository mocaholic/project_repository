$(function(){
    /* sidemenu */
    $('#header .menu').click(function(){
        $('html').css('overflow','hidden');
        $('.sidemenu_dimmed').show();
        $('#side_menu').addClass('on');
    });
    /* 2020-10-06 수정 */
    $('.sidemenu_dimmed').click(function(){
        console.log('test');
        $('#side_menu').removeClass('on');
        $('html').css('overflow','');
        $(this).hide();
    });
    /* // 2020-10-06 수정 */

    /* select 플러그인 
    $('select').selectric({disableOnMobile : false, nativeOnMobile : false});*/
    
    /* main 이용중인 티켓 팝업 */
    $('.ticket_list li .left_area a').click(function(){
        $(this).siblings('.state_layer_pop').show();
    });

    /* 마이페이지 - 주간/월간 이용시간 탭 */
    $(".tab_menu li a").click(function(){ 
        var tabIdx = $(this).parent().index(); 
        
        $('.tab_cont').hide(); 
        $('.tab_cont').eq(tabIdx).show(); 
        $('.tab_menu li a').removeClass('on'); 
        $(this).addClass('on'); 
    });


});

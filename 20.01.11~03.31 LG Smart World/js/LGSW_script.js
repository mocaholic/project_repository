$(function(){
     /* dropdown */
    $(".dropdown dt a").click(function(){
        
        var dr_list = $(this).parent().siblings().find(".sort-by-list");
        
        if ($(dr_list).is(':visible')) {
            $(dr_list).hide();
        } else {
            $(dr_list).show();
        }
    });
    
    /* layer popup close */
    /* 20200205 수정 */
    $(".layer-popup .btn-close").click(function(){
        $(".layer-popup").hide();
        $("body, html").css("overflow","");
    });
    /* // 20200205 수정 */
    
    /* cart title */
    /* 20200210 수정 */
    $(".accodion-wrap .main-title a").click(function(){        
        if($(this).hasClass("link")){
            
        }else {
            $(this).parent().toggleClass("on");    
        }
    });
    /* // 20200210 수정 */
    
    /* option change */
    $("button.edit").click(function(){
        $(this).addClass("on");
        $(this).parent().parent().parent().siblings(".edit").show();
    });
    $(".actions.edit .btn-area2 .btn-type02").click(function(){  
        $(this).parent().parent().siblings().find("button.edit").removeClass("on");
        $(this).parent().parent(".actions.edit").hide();
    });
    
    /* tooltip */
    $(".btn-help").click(function(){
        $(this).parent().siblings(".layer-popup3").show();
    });
    $(".layer-popup3 .btn-popup-close").click(function(){
        $(".layer-popup3").hide();
    });
    
});// end


$.fn.center = function() {
    this.css({
        /*'position': 'fixed',*/
        'left': '50%',
        'top': '50%'
    });
    this.css({
        'margin-left': -this.outerWidth() / 2 + 'px',
        'margin-top': -this.outerHeight() / 2 + 'px'
    });

    return this;
}
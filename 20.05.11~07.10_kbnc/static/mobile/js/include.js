$(function(){
    includeLoad();

    function includeLoad(){
        $('#header.common-hd').load("/mobile/html/include/header.html",function(){
            if (!!$('.header-top').length){
                ACTIONUI.stickyHeader();
                ACTIONUI.shopLocation();
            } 
        
            if (!!$('.gnb-swiper').length) {
                ACTIONUI.gnbSwipe.swipeController();
                var gnbSwiper = Swiper('.gnb-swiper', ACTIONUI.gnbSwipe.config);
            }
        });

        $('#qnb-area').load("/mobile/html/include/qnb.html",function(){
           // Side Menu UI
           if (!!$('#side-menu').length) {
            // Side Menu Open
            var SMO = ACTIONUI.sideMenu;
            new SMO();
           }
        });


        $('#footer').load("/mobile/html/include/footer.html",function(){
            //플로팅 버튼
            if (!!$('#footer .btn-area').length) {
                ACTIONUI.floatingTop();
            }
        });
    }
});
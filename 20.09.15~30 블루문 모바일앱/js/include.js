$(function(){
    includeLoad();

    function includeLoad(){
        $('#header').load("/include/header.html",function(){
//            if (!!$('.header-top').length){
//                ACTIONUI.stickyHeader();
//                ACTIONUI.shopLocation();
//            } 
        
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

        $('#qnb-area2').load("/mobile/html/include/qnb2.html",function(){
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

            $('.btn-contact').on('click', function(e){
                e.preventDefault();
                ACTIONUI.layerPop.fn.open('CATEGORY_DETAIL_01_P');
            });
        });
    }
});
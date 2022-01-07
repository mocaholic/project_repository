$(document).ready(function() {
    var $slider=$("#slider");
    var slideLength = $("#slider > .slide").length -1 ;
    var ctrl=false;
    // var curIdx = 0;
    // var total = $('.slider_wrap li').length;

    $(document).keydown(function (e) {
        if(e.keyCode==17) {
            ctrl=true;
            $("#slider").removeClass("_3D");
            $(".key.ctrl").addClass("active");
        }
    }).keyup(function (e) {
        if(e.which == 17){
            ctrl=false;
            $("#slider").addClass("_3D");
            $(".key.ctrl").removeClass("active");
        }
        if(e.which==39 || e.which==40){
            nextSlide();
            return;
        }
        if(e.which==37 || e.which==38){
            prevSlide();
            return;
        }
    });


    function nextSlide() {
        lastElem().addClass("active");
        $slider.addClass("transfomer");
        setTimeout(function(){
            var $slicedSlide = $('.slide').slice(slideLength);
            $slider.prepend($slicedSlide);
            $(document).find(".slide.active").removeClass("active");
            $slider.removeClass("transfomer");
        },300);
    }

    function prevSlide(){
        var $slicedSlide = $('.slide').slice(0,1).addClass("active");
        $slider.append($slicedSlide);
        setTimeout(function(){
            lastElem().removeClass("active");
        },50);
    }

    function lastElem(){
        return $("#slider > .slide").last();
    }

    /* $('.indicator a').on('click', function(){
        var idx = $(this).index();
         
        // curIdx++
        // console.log(curIdx)
        show(idx > curIdx ? 1 : -1, curIdx, idx);
 
    }); */
});
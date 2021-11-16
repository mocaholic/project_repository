$(document).ready(function() {
    var $slider=$("#slider");
    var slide = $('#slider > .slide');
    var slideLength = $("#slider > .slide").length -1 ;
    // var ctrl=false;
    var indicator = $('.indicator');
    var curIdx = 0;

    console.log(curIdx);

    var startX,startY, endX,endY;
    $("#slider").on('touchstart',function(event){
        startX = event.originalEvent.changedTouches[0].screenX;
        startY = event.originalEvent.changedTouches[0].screenY;
        // console.log('start');
    });
    $("#slider").on('touchend',function(event){
        endX=event.originalEvent.changedTouches[0].screenX;
        endY=event.originalEvent.changedTouches[0].screenY;
 
        console.log(curIdx);
        if(startX-endX>50){
            console.log(startX-endX);
            if(curIdx >= slideLength){
                curIdx = 0;
                console.log('dd');
            }else {
                curIdx = curIdx + 1;
            }
            console.log(curIdx);
            
            indicator.find('a').eq(curIdx).addClass('on').siblings().removeClass('on');
            nextSlide();
        }else if(endX-startX>50){
            console.log('오른쪽');

            if(curIdx <= -2){
                curIdx = 0;
                console.log('dd');
            }else {
                curIdx = curIdx - 1;        
            }
            console.log(curIdx);    
            indicator.find('a').eq(curIdx).addClass('on').siblings().removeClass('on');
            prevSlide();
        }
        // indicator.find('a').eq(curIdx).addClass('on').siblings().removeClass('on');
    });

    // 인디케이터
    /* $('.indicator a').on('click', function(){
        var curIdx = $(this).index();
        
        console.log(curIdx);
        
        $slider.find('.s' + curIdx).addClass("active");
        $slider.addClass("transfomer");
        setTimeout(function(){
            $slider.append($slider.find('.s' + curIdx));
            $(document).find(".slide.active").removeClass("active");
            $slider.removeClass("transfomer");
        },300);

        $(this).addClass('on').siblings().removeClass('on');
        
    }); */

    // tab
    $('.tabText').on('click', function(){     
        var curIdx = $(this).attr("class").replace(/[^0-9]/g, "");

        console.log(curIdx);

        $(this).parent().addClass("active");
        $slider.addClass("transfomer");
        setTimeout(function(){
            $slider.append($slider.find('.s' + curIdx));
            $(document).find(".slide.active").removeClass("active");
            $slider.removeClass("transfomer");
        },300);

        indicator.find('a').eq(curIdx).addClass('on').siblings().removeClass('on');
        
    });

    function nextSlide() {
        lastElem().addClass("active");
        // $slider.addClass("transfomer");
        setTimeout(function(){
            var $slicedSlide = $('.slide').slice(slideLength);
            $slider.prepend($slicedSlide);
            $(document).find(".slide.active").removeClass("active");
            $slider.removeClass("transfomer");
        },300);

        indicator.find('a').eq(curIdx).addClass('on').siblings().removeClass('on');
    }

    function prevSlide(){
        var $slicedSlide = $('.slide').slice(0,1).addClass("active");
        $slider.append($slicedSlide);
        setTimeout(function(){
            lastElem().removeClass("active");
        },50);

        indicator.find('a').eq(curIdx).addClass('on').siblings().removeClass('on');
    }

    function lastElem(){
        return $("#slider > .slide").last();
    }
    
});
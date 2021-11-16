$(document).ready(function() {
    var $slider=$("#slider");
    var slide = $('#slider > .slide');
    var slideLength = $("#slider > .slide").length -1 ;
    // var ctrl=false;
    var indicator = $('.indicator');
    // console.log(curIdx);

    var curIdx = 0;
    console.log(curIdx);

    var startX,startY, endX,endY;
    $("#slider").on('touchstart',function(event){
        startX = event.originalEvent.changedTouches[0].screenX;
        startY = event.originalEvent.changedTouches[0].screenY;
        console.log('start');
    });
    $("#slider").on('touchend',function(event){
        endX=event.originalEvent.changedTouches[0].screenX;
        endY=event.originalEvent.changedTouches[0].screenY;
 
        if(startX-endX>50){
            
            console.log('왼쪽');
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
        }/* else if(startX-endX<50 || endX-startX<50 ){
            console.log('test');
        } */
        indicator.find('a').eq(curIdx).addClass('on').siblings().removeClass('on');
    });

    $('.indicator a').on('click', function(){
        var idx = $(this).index();
        console.log(idx);
        // curIdx++
        // console.log(curIdx)
        // show(idx > curIdx ? 1 : -1, curIdx, idx);
        /* if(idx == 0){
            // var $slicedSlide = $('.slide').slice(0).addClass("active");
            $slider.find('.s1').addClass("active");
            $slider.addClass("transfomer");
            setTimeout(function(){
                $slider.append($slider.find('.s1'));
                $(document).find(".slide.active").removeClass("active");
                $slider.removeClass("transfomer");
            },300);
        } */
        goToSlide(idx);
        $(this).addClass('on').siblings().removeClass('on');
        
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

        // var showIdx = curIdx + 1
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
    

    /* function touch_start(event) {
        // start_x = event.touches[0].pageX

    }
    
    function touch_end(event) {
        end_x = event.changedTouches[0].pageX;
        if(start_x > end_x){
            next();
        }else{
            prev();
        }
    } */
});
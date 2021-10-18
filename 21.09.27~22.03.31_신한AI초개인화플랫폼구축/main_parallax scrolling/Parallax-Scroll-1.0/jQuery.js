$.fn.parscroll = function (spd) {
    const opt = $.extend({}, spd);
    opt.speed===void 0&&(opt.speed=.3);
    this.each(function() {
        const t = $(this);

        function init() {
            const title = t.data("title");
            t.append(`<div class="bg-wrap"><div class="bg" style="background-image:url(${t.data("image")})"></div></div>`)
    
            if (title !== undefined) {
                t.prepend(`<div class="item-title">${title}</div>`)
            }
        }
        function scroll() {
            const scrolltop = $(window).scrollTop(),
                     offsettop = t.offset().top;
    
            if (offsettop + t.outerHeight() > scrolltop && scrolltop + $(window).height() > offsettop) {
                t.find(".bg").css("transform", `translateY(${-opt.speed * (scrolltop - offsettop)}px)`)
            }
        }
        init(), scroll(), $(window).scroll(scroll)
    })
}
parscroll = (elem, speed) => {
    speed===void 0&&(speed=.3);
    function init() {
        Array.from(document.querySelectorAll(elem)).forEach(a => {
            const bgwrap = document.createElement("div"),
                     bg = document.createElement("div"),
                     titledata = a.getAttribute("data-title"),
                     title = document.createElement("div");
    
        bgwrap.className = "bg-wrap",
        bg.className = "bg",
        a.appendChild(bgwrap),
        bgwrap.appendChild(bg),
        bg.style.backgroundImage = `url(${a.getAttribute("data-image")})`,
        null!==titledata && (
            title.className="item-title",
            title.innerText=titledata,
            a.prepend(title)
        );
        })
    }
    function scroll() {
        Array.from(document.querySelectorAll(elem)).forEach(a => {
            const scrolltop = window.scrollY,
                     offsettop = a.offsetTop;
            
            offsettop + a.offsetHeight > scrolltop && scrolltop + window.innerHeight > offsettop && (
                a.querySelector(".bg").style.transform = `translateY(${-speed * (scrolltop - offsettop)}px)`
            );
        });
    }
    init(),scroll(),window.addEventListener("scroll", scroll);
}
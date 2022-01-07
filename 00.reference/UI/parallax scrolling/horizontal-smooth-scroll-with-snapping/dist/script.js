gsap.registerPlugin(ScrollTrigger);

let imageCont = document.querySelector('.images'),
    images = gsap.utils.toArray('img'),
    centerSpans = images.map(img => {
      let span = document.createElement('span'); 
      imageCont.appendChild(span);
      return span;
    }),
    snapPositions = [];

gsap.to(imageCont, {
  x: () => - (imageCont.scrollWidth - document.documentElement.clientWidth) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: imageCont,
    start: 0,
    pin: true,
    scrub: 1.5,
    markers: true,
    onRefresh: self => {
      let viewportWidth = document.documentElement.clientWidth;
      images.forEach((image, i)=> {
        let centerX = image.offsetLeft + image.offsetWidth / 2;
        centerSpans[i].style.left = centerX + "px";
        snapPositions[i] = (centerX - viewportWidth / 2) / (imageCont.scrollWidth - viewportWidth);
      });
    },
    snap: value => gsap.utils.snap(snapPositions, value),
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: self => `+=${imageCont.scrollWidth - document.documentElement.clientWidth}`,
    invalidateOnRefresh: true,
  }
});
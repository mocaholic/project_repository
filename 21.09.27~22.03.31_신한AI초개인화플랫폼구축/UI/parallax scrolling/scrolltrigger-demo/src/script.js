// When the orientation changes on iPad sometimes the viewport will decied to zoom out, causing issues with scrolling behaiours
// This is a temporary fix to remedy that until I get more time to investigate
window.addEventListener('orientationchange', () => window.location.reload());

// ----------------------------------
// Cheese block (Tan area with spots)
// ----------------------------------

gsap.to('.container__movable', {
  x: '-50%',
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
    pin: true,
  },
});

// -------------
// Hamster wheel
// -------------

gsap.set('.wheel-wrapper__wheel', { rotate: 165 });
gsap.to('.wheel-wrapper__wheel', {
  rotate: -1080,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});

const gerbalWalk = gsap.timeline({
  yoyo: true,
  repeat: 15,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});
gerbalWalk.to('.gerbal--1', { rotate: 3, duration: 0.5, ease: 'linear' }, 'walk');
gerbalWalk.to('.gerbal--1 .gerbal__foot--front-left', { rotate: -45, duration: 0.5, ease: 'linear' }, 'walk');
gerbalWalk.to('.gerbal--1 .gerbal__foot--back-left', { rotate: 45, duration: 0.5, ease: 'linear' }, 'walk');
gerbalWalk.to('.gerbal--1 .gerbal__foot--front-right', { rotate: 45, duration: 0.5, ease: 'linear' }, 'walk');
gerbalWalk.to('.gerbal--1 .gerbal__foot--back-right', { rotate: -45, duration: 0.5, ease: 'linear' }, 'walk');

gsap.to('.wheel-pole-top__gear', {
  rotate: -2160,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});

gsap.to('.wheel-rope-horizontal__rope', {
  x: '-100vw',
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});

gsap.to('.wheel-pole-bottom__gear', {
  rotate: 2160,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});

gsap.to('.wheel-rope-vertical__rope', {
  y: '-100vw',
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});

// --------
// Elevator
// --------

gsap.to('.elevator', {
  y: '-50vh',
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});

// ----------------------
// Features bullet points
// ----------------------

gsap.to('.features__item--1', {
  opacity: 1,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=35% bottom',
    end: 'bottom+=45% bottom',
    scrub: 0.4,
  },
});

gsap.to('.features__item--2', {
  opacity: 1,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=55% bottom',
    end: 'bottom+=65% bottom',
    scrub: 0.4,
  },
});

gsap.to('.features__item--3', {
  opacity: 1,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=75% bottom',
    end: 'bottom+=85% bottom',
    scrub: 0.4,
  },
});

gsap.to('.features__item--4', {
  opacity: 1,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=110% bottom',
    end: 'bottom+=120% bottom',
    scrub: 0.4,
  },
});

// ----------------------
// Diagonal gear and pole
// ----------------------

gsap.to('.gear', {
  rotate: -2160,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});

// -----
// Title
// -----

gsap.set('.title-wrapper', {
  y: 0,
  yPercent: 50,
  x: 0,
  xPercent: -50,
});

gsap.to('.title-wrapper', {
  y: '-50vh',
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    scrub: 0.4,
  },
});

gsap.to('.tagline', {
  y: '100px',
  opacity: 0,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    end: '+=50%',
    scrub: 0.4,
  },
});


// ------------
// Gerbal house
// ------------

const gerbal2Slide = gsap.timeline({
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=95% bottom',
    scrub: 0.4,
  },
});
gerbal2Slide.to('.gerbal-wrapper--2', { x: '-25vw', left: -130 }); // 130, width of the house + width of mouse

gsap.set('.gerbal-house__rope-wrapper__rope', { left: '100%' });
gsap.to('.gerbal-house__rope-wrapper__rope', {
  x: '-25vw',
  left: 'calc(100% - 170px)', // fix this up - magic numbers are no good
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=95% bottom',
    scrub: 0.4,
  },
});

gsap.to('.try-now-cover__rope-container__rope', {
  y: '25vw',
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=95% bottom',
    scrub: 0.4,
  },
});

gsap.to('.try-now-lid', {
  rotate: 75,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=95% bottom',
    scrub: 0.4,
  },
});

const gerbal2Walk = gsap.timeline({
  yoyo: true,
  repeat: 45,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom+=90% bottom',
    scrub: 0.4,
  },
});
gerbal2Walk.to('.gerbal--2 .gerbal__foot--front-left', { rotate: -45, duration: 0.5, ease: 'linear' }, 'walk');
gerbal2Walk.to('.gerbal--2 .gerbal__foot--back-left', { rotate: 45, duration: 0.5, ease: 'linear' }, 'walk');
gerbal2Walk.to('.gerbal--2 .gerbal__foot--front-right', { rotate: 45, duration: 0.5, ease: 'linear' }, 'walk');
gerbal2Walk.to('.gerbal--2 .gerbal__foot--back-right', { rotate: -45, duration: 0.5, ease: 'linear' }, 'walk');

gsap.set('.speech-bubble--gerbal', { scale: 0 });
gsap.to('.speech-bubble--gerbal', {
  opacity: 1,
  scale: 1,
  scrollTrigger: {
    trigger: '.fake-container',
    start: '5%',
    end: '8%',
    scrub: 0.4,
  },
});

const wormShow = gsap.timeline({
  scrollTrigger: {
    trigger: '.fake-container',
    start: '30%',
    scrub: 0.4,
  },
});

wormShow.set('.worm__eye', { opacity: 0 });
wormShow.set('.worm__pupil', { opacity: 0 });
wormShow.set('.worm__eyebrow', { opacity: 0 });
wormShow.set('.speech-bubble--worm', { scale: 0, opacity: 0, transformOrigin: 'center' });

wormShow.to('.worm__body', { opacity: 1, duration: 0.05 }, 'start');
wormShow.to('.worm__body', { strokeDashoffset: 0, duration: 0.3 }, 'start');
wormShow.to('.worm__eye', { opacity: 1, duration: 0.2 }, 'together');
wormShow.to('.worm__pupil', { opacity: 1, duration: 0.2 }, 'together');
wormShow.to('.worm__eyebrow', { opacity: 1, duration: 0.2 }, 'together+=0.1');
wormShow.to('.speech-bubble--worm', { scale: 1, opacity: 1, duration: 0.25 }, '-=0.2');

// --------------
// Scroll message
// --------------

gsap.to('.scroll-message', {
  opacity: 0,
  scrollTrigger: {
    trigger: '.fake-container',
    start: 'bottom bottom',
    end: 'bottom+=30% bottom',
    scrub: 0.4,
  },
});
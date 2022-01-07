let sliderIndex = 1;
const layers = [...document.querySelectorAll('.layer')];
const elementsToGlich = [...document.querySelectorAll('main > span'), ...document.querySelectorAll('.footer > div > span:nth-of-type(2)')];

function switchLayer(step = 1) {
  glich();
  const nextSlide = (sliderIndex + step) % 3 === 0 ? 3 : (sliderIndex + step) % 3;
  for(let i of layers) {
    i.classList.remove('layer-displayed');
    i.classList.remove('layer-displayed-exit');
    if(i.dataset.scene == nextSlide) {
      i.classList.add('layer-displayed');
    }
    if(i.dataset.scene == sliderIndex) {
      i.classList.add('layer-displayed-exit');
    }
  }
  sliderIndex = nextSlide;
}

function randomString(length = 1) {
  return [...Array(length)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
}

function toggleGlitch(el, active = true) {
  const children = [...el.children];
  if(active) {
    children.forEach(child => {
      child.classList.remove('displayed');
    });
    children[children.length - 1].classList.add('displayed');  
  } else {
    const childToDisplay = children.length > 2 ? sliderIndex - 1 : 0;
  children[childToDisplay].classList.add('displayed');
  children[children.length - 1].classList.remove('displayed');
  }
}

const heroNumber = document.querySelector('.hero__number');

function animateNumber() {
  setTimeout(() => {
    heroNumber.children[0].innerText = '0' + sliderIndex;
  }, 850);
}

function glich() {
  elementsToGlich.forEach(el => {
    toggleGlitch(el);
  });
  
  const interval = setInterval(() => {
    elementsToGlich.forEach(el => {
      el.children[el.children.length - 1].innerText = randomString(el.children[0].innerText.length);
    });
  }, 50);
  
  setTimeout(() => {
    clearInterval(interval);
    elementsToGlich.forEach(el => {
      toggleGlitch(el, false);
  });
  }, 1000);
  
  animateNumber();
}
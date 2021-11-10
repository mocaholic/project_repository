// Designed by: Ruari Shephard

// Inspired by:  https://www.behance.net/gallery/56632749/Bon?tracking_source=search_projects_appreciations

const items = [
  {
    img: "https://wise-step.surge.sh/assets/media/imgs/1.png",
    category: "electrics",
    title: "high bayz",
    price: "£100",
    bgColor: "#ffe474",
  },
  {
    img: "https://wise-step.surge.sh/assets/media/imgs/2.png",
    category: "classic",
    title: "insignia purch",
    price: "£300",
    bgColor: "#d2e2d7",
  },
  {
    img: "https://wise-step.surge.sh/assets/media/imgs/3.png",
    category: "living",
    title: "bison welder",
    price: "£420",
    bgColor: "#f3c3be",
  },
  {
    img: "https://wise-step.surge.sh/assets/media/imgs/4.png",
    category: "watch",
    title: "schemiet watch",
    price: "£267",
    bgColor: "#dedede",
  },
];

const timeLine = gsap.timeline();

class Slider {
  constructor(items) {
    this.active = 0;
    this.items = items;
    document
      .querySelectorAll(".slider__btn-switch[data-type]")
      .forEach((btn) => {
        btn.onclick = () => this.handleClick(btn.dataset.type);
      });
  }

  renderItem() {
    const { img, category, title, price } = this.items[this.active];

    const sliderContent = `
      <img class="slider__img" src="${img}" alt="${title}" />
      <div class="slider__context flex-column">
        <h3 class="slider__category">${category}</h3>
        <strong class="slider__title">${title}</strong>
        <small class="slider__price">${price}</small>
      </div>
    `;
    const sliderIndex = `
      <span>${
        this.active < 10 ? "0" + (this.active + 1) : this.active + 1
      }</span>
      <span>${
        this.items.length < 10 ? "0" + this.items.length : this.items.length
      }</span>
    `;

    document.querySelector(".slider__content").innerHTML = sliderContent;
    document.querySelector(".slider__index").innerHTML = sliderIndex;
  }

  basicAimation(dir, delay) {
    timeLine.to(".slider", {
      delay,
      duration: 0.2,
      backgroundColor: `${items[this.active].bgColor}`,
    });
    timeLine.fromTo(
      ".slider__img",
      {
        x: 150 * dir,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
    timeLine.fromTo(
      ".slider__context *",
      {
        x: 50 * dir,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
      "<"
    );
  }

  handleClick(type) {
    const dir = type === "next" ? 1 : -1;
    timeLine.to(".slider__img", {
      x: -250 * dir,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",

      onComplete: () => {
        if (type === "next") {
          this.active = this.active === items.length - 1 ? 0 : this.active + 1;
        } else {
          this.active = this.active <= 0 ? items.length - 1 : this.active - 1;
        }

        this.renderItem();
        this.basicAimation(dir);
      },
    });
    timeLine.to(
      " .slider__context *",
      {
        x: -100 * dir,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.inOut",
      },
      "<"
    );
  }
}

const slider = new Slider(items);
slider.renderItem();
slider.basicAimation(1, 1);
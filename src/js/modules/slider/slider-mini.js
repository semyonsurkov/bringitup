import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor({ container, next, prev, activeClass, animate, autoplay }) {
    super({ container, next, prev, activeClass, animate, autoplay });
    this.slides = [];
  }

  setSlides() {
    this.slides = Array.from(this.container.children);
  }

  decorizeSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }
    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide() {
    if (this.slides.length < 2) return;

    const firstSlide = this.slides.shift();
    this.slides.push(firstSlide);
    this.container.appendChild(firstSlide);

    this.decorizeSlides();
  }

  prevSlide() {
    if (this.slides.length < 2) return;

    const lastSlide = this.slides.pop();
    this.slides.unshift(lastSlide);
    this.container.insertBefore(lastSlide, this.slides[0]);

    this.decorizeSlides();
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());
    this.prev.addEventListener('click', () => this.prevSlide());
  }

  init() {
    if (this.container) {
      this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
      `;

      this.setSlides();
      this.decorizeSlides();
      this.bindTriggers();

      if (this.autoplay) {
        setInterval(() => this.nextSlide(), 5000);
      }
    }
  }
}

import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    const hanson = document.querySelector('.hanson');
    if (hanson) {
      hanson.style.opacity = '0';

      if (n === 3) {
        hanson.classList.add('animated');
        setTimeout(() => {
          hanson.style.opacity = '1';
          hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        hanson.classList.remove('slideInUp');
      }
    }

    this.slides.forEach((slide) => {
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  bindTriggers() {
    this.btns.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.plusSlides(1);
      });

      const previousSibling = item.parentNode.previousElementSibling;
      if (previousSibling && previousSibling.getAttribute('href') === '#') {
        previousSibling.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
      }
      console.log(previousSibling);
    });

    document.querySelectorAll('.prevmodule').forEach((button) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });

    document.querySelectorAll('.nextmodule').forEach((button) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });
  }

  render() {
    if (this.container) {
      const hanson = document.querySelector('.hanson');

      if (this.slideIndex) {
        this.showSlides(this.slideIndex);
      }
    }
    this.bindTriggers();
  }
}

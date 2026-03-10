import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Keyboard } from 'swiper/modules';

const aboutBtnRefs = document.querySelector('#about-btn-js');
const aboutRefs = document.querySelector('#swiper-about');

const aboutAccordion = new Accordion('#accordion-about', {
  showMultiple: true,
});
aboutAccordion.open(0);

const aboutSwiper = new Swiper('#swiper-about', {
  modules: [Navigation, Keyboard],
  direction: 'horizontal',
  loop: true,
  initialSlide: 0,
  spaceBetween: 0,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  navigation: {
    nextEl: aboutBtnRefs,
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 6,
    },
  },
});

const observAbout = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    aboutBtnRefs.addEventListener('focus', nextSwap);
  } else {
    aboutBtnRefs.removeEventListener('focus', nextSwap);
  }
});

observAbout.observe(aboutRefs);

function nextSwap(event) {
  event.preventDefault();
  aboutSwiper.slideNext();
}

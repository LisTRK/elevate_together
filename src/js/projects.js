import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Keyboard } from 'swiper/modules';
const swiper = new Swiper('#project-swiper', {
  modules: [Navigation, Keyboard],
  direction: 'horizontal',
  initialSlide: 0,
  spaceBetween: 32,
  autoHeight: true,
  slidesPerView: 1,
  grabCursor: true,
  navigation: {
    disabledClass: 'disabled',
    nextEl: '#btn-next',
    prevEl: '#btn-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});

const projectsRefs = document.querySelector('#projects');
const projectsLinks = document.querySelectorAll('.projects-link');

const observProj = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    projectsLinks.forEach(btn => {
      btn.addEventListener('focus', nextSwapProjects);
    });
  } else {
    projectsLinks.forEach(btn => {
      btn.removeEventListener('focus', nextSwapProjects);
    });
  }
});

observProj.observe(projectsRefs);

function nextSwapProjects() {
  swiper.slideNext();
}

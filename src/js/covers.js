const sectionCovers = document.querySelector('.container-covers');

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      sectionCovers.classList.add('show');
    } else {
      sectionCovers.classList.remove('show');
    }
  },
  {
    threshold: 0.1,
  }
);

observer.observe(sectionCovers);

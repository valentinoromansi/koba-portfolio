function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && Math.abs(rect.top) < window.innerHeight
}

const parallaxImgs = document.querySelector('.section-img')
const parallaxSpeed = 0.25
window.addEventListener('scroll', () => {
  let { scrollY } = window;
  [...parallaxImgs].forEach(img => {
    if(isInViewport(img)) {
      img.style.transform = `translateY(${img.getBoundingClientRect().top * Math.sign(scrollY) * parallaxSpeed - 50}px)`
    }    
  });
});


/*
 * Animations
 */
const observer = new IntersectionObserver((elements) => {
  elements.forEach(el => {
    if(el.isIntersecting)
      el.target.classList.add('show')
  });
})

const animatedElements = [
  ...document.querySelectorAll(".hide-top"),
  ...document.querySelectorAll(".hide-left"),
  ...document.querySelectorAll(".hide-right"),
  ...document.querySelectorAll(".hide-opacity")
];
animatedElements
animatedElements.forEach(el => observer.observe(el));

var prevScrollposY = window.scrollY;
window.onscroll = function() {  
  const nav = document.getElementsByTagName("nav")[0]
  var scrollPosY = window.scrollY;
  if(scrollPosY <= nav.style.top) {
    return nav.style.top = 0;
  }
  if (prevScrollposY >= scrollPosY)
    nav.style.top = 0;
  else
    nav.style.top = -nav.clientHeight + 'px';
  prevScrollposY = scrollPosY;
};


// Recalculate 'transform' base on 'curGalleryPage'
function updateGallerySliderPos() {
  const items = Array.from(document.getElementsByClassName('gallery-item-wrapper'))
  const galleryWrap = document.getElementsByClassName('gallery-wrapper')[0]
  const itemWidth = parseInt(window.getComputedStyle(items[0]).width)
  const padding = parseInt(window.getComputedStyle(document.getElementsByClassName('gallery-item-wrapper')[0]).padding)
  const moveTo = (curGalleryPage - 1) * itemWidth * -1
  galleryWrap.style.transform = `translateX(${moveTo}px)`
}

function getGalleryItemsDisplayNum() {
  if(window.innerWidth < 600)
    return 2
  else
    return 3
}

// first 3 visible images are with indexes 0, 1, 2. 'curGalleryPage' represent the one in the center.
var curGalleryPage = 1
function onGalleryPaginationClick(direction) {
  const items = Array.from(document.getElementsByClassName('gallery-item'))
  const leftSlideStopped = direction == 1 && curGalleryPage === 1
  const rightSlideStopped = direction == -1 && curGalleryPage + (getGalleryItemsDisplayNum() - 1) >= items.length
  if(leftSlideStopped || rightSlideStopped)
  return
  curGalleryPage += direction * -1
  updateGallerySliderPos()
}  



document.getElementsByClassName('gallery-pagination-icon')[0].addEventListener('click', () => onGalleryPaginationClick(1));
document.getElementsByClassName('gallery-pagination-icon')[1].addEventListener('click', () => onGalleryPaginationClick(-1));

function adjustGallerySize() {
  const container = document.getElementsByClassName('gallery-container')[0]  
  const wrapper = document.getElementsByClassName('gallery-wrapper')[0]
  const items = Array.from(document.getElementsByClassName('gallery-item-wrapper'))
  const containerWidthPx = parseInt(window.getComputedStyle(container).width, 10)
  const itemPadding = parseInt(window.getComputedStyle(document.getElementsByClassName('gallery-item-wrapper')[0]).padding)
  wrapper.style.width = (containerWidthPx / getGalleryItemsDisplayNum()) * items.length + 'px'
  const wrapperWidthPx = parseInt(window.getComputedStyle(wrapper).width, 10) 
  items.forEach(item => {
    item.style.width = wrapperWidthPx / items.length + 'px'
  });
}

window.onresize = function() {
  adjustGallerySize()
  document.getElementsByClassName('gallery-wrapper')[0].style.transition = "none"
  updateGallerySliderPos()
  document.getElementsByClassName('gallery-wrapper')[0].style.transition = "transform 0.3s"
}




function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && Math.abs(rect.top) < window.innerHeight
}

const parallaxImgs = document.getElementsByClassName('section-img')
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

/*
 * Call on init
 */
adjustGallerySize()

// Remove gallery resize transition that breaks on window resize after transition is initialy shown
setTimeout(() => {
  const elements = document.querySelectorAll(".gallery-item-wrapper");
  elements.forEach(el => {
    el.classList.remove("hide-right", "show")
  });
}, 1500);
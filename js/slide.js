import debounce from './debounce.js';

const slide = document.querySelector('.slide');
const wrapper = document.querySelector('.slide-wrapper');
const activeClass = 'active';
const changeEvent = new Event('changeEvent');
const dist = {
  startX: 0,
  movement: 0,
  finalPosition: 0,
};

const transition = (active) => {
  slide.style.transition = active ? 'transform .3s' : '';
};

const onStart = (event) => {
  let movetype;
  if (event.type === 'mousedown') {
    event.preventDefault();
    dist.startX = event.clientX;
    movetype = 'mousemove';
  } else {
    dist.startX = event.changedTouches[0].clientX;
    movetype = 'touchmove';
  }

  wrapper.addEventListener(movetype, onMove);

  transition(false);
};

const onEnd = (event) => {
  const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
  wrapper.removeEventListener(movetype, onMove);
  dist.finalPosition = dist.movePosition;
  changeSlideOnEnd();
  transition(true);
};

const changeSlideOnEnd = () => {
  if (dist.movement > 120 && indexObj.next !== undefined) {
    activeNextSlide();
  } else if (dist.movement < -120 && indexObj.prev !== undefined) {
    activePrevSlide();
  } else {
    changeSlide(indexObj.active);
  }
};

const onMove = (event) => {
  const pointPosition =
    event.type === 'mousemove'
      ? event.clientX
      : event.changedTouches[0].clientX;
  const finalPosition = updatePosition(pointPosition);
  moveSlide(finalPosition);
};

const updatePosition = (clientX) => {
  dist.movement = -(clientX - dist.startX) * 1.4;
  return dist.finalPosition - dist.movement;
};

const moveSlide = (position) => {
  dist.movePosition = position;
  slide.style.transform = `translate3d(${position}px, 0, 0)`;
};

const slidePosition = (slide) => {
  const margin = (wrapper.offsetWidth - slide.offsetWidth) / 2;
  return -(slide.offsetLeft - margin);
};

const slidesConfig = () => {
  return [...slide.children].map((element) => {
    const position = slidePosition(element);
    return { position, element };
  });
};
let slideArray = slidesConfig();

const indexObj = {
  prev: 0,
  active: 0,
  next: 0,
};
const slidesIndexNav = (index) => {
  const last = slideArray.length - 1;

  indexObj.prev = index ? index - 1 : undefined;
  indexObj.active = index;
  indexObj.next = index === last ? undefined : index + 1;
};

const activePrevSlide = () => {
  if (indexObj.prev !== undefined) changeSlide(indexObj.prev);
};

const activeNextSlide = () => {
  if (indexObj.next !== undefined) changeSlide(indexObj.next);
};

const changeSlide = (index) => {
  const activeSlide = slideArray[index];
  moveSlide(activeSlide.position);
  slidesIndexNav(index);
  dist.finalPosition = activeSlide.position;
  changeActiveClass();
  wrapper.dispatchEvent(changeEvent);
};

const changeActiveClass = () => {
  slideArray.forEach((item) => item.element.classList.remove(activeClass));
  slideArray[indexObj.active].element.classList.add(activeClass);
};

const addSlideEvents = () => {
  wrapper.addEventListener('mouseup', onEnd);
  wrapper.addEventListener('touchend', onEnd);
  wrapper.addEventListener('mousedown', onStart);
  wrapper.addEventListener('touchstart', onStart);
};
addSlideEvents();

export class Slide {
  onResize() {
    setTimeout(() => {
      slidesConfig();
      changeSlide(indexObj.active);
    }, 1000);
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize);
  }

  bindEvents() {
    // this.onStart = this.onStart.bind(this);
    // this.onMove = this.onMove.bind(this);
    // this.onEnd = this.onEnd.bind(this);
    // this.activePrevSlide = this.activePrevSlide.bind(this);
    // this.activeNextSlide = this.activeNextSlide.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200);
  }

  init() {
    changeSlide(2);
    this.bindEvents();
    addSlideEvents();
    slidesConfig();
    this.addResizeEvent();
    addArrowEvent();
    return this;
  }
}

const prevElement = document.querySelector('.prev');
const nextElement = document.querySelector('.next');

const addArrowEvent = () => {
  prevElement.addEventListener('click', activePrevSlide);
  nextElement.addEventListener('click', activeNextSlide);
};

export class SlideNav extends Slide {
  constructor() {
    super();
    this.bindControlEvents();
  }

  createControl() {
    const control = document.createElement('ul');
    control.dataset.control = 'slide';
    slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });

    wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      changeSlide(index);
    });
    wrapper.addEventListener('changeEvent', this.activeControlItem);
  }

  activeControlItem() {
    this.controlArray.forEach((item) => item.classList.remove(activeClass));

    this.controlArray[indexObj.active].classList.add(activeClass);
  }

  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];
    this.activeControlItem();
    this.controlArray.forEach(this.eventControl);
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}

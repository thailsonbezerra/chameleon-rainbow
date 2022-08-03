import debounce from './debounce.js';

export default function initSlide() {
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

  const prevElement = document.querySelector('.prev');
  const nextElement = document.querySelector('.next');

  const addArrowEvent = () => {
    prevElement.addEventListener('click', activePrevSlide);
    nextElement.addEventListener('click', activeNextSlide);
  };

  const createControl = () => {
    const control = document.createElement('ul');
    control.dataset.control = 'slide';
    slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });

    wrapper.appendChild(control);
    return control;
  };

  let controlArray = [];
  const addControl = () => {
    const control = createControl();
    controlArray = [...control.children];
    activeControlItem();
    controlArray.forEach(eventControl);
  };

  const eventControl = (item, index) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      changeSlide(index);
    });
    wrapper.addEventListener('changeEvent', activeControlItem);
  };

  const activeControlItem = () => {
    controlArray.forEach((item) => item.classList.remove(activeClass));

    controlArray[indexObj.active].classList.add(activeClass);
  };

  const onResize = () => {
    setTimeout(() => {
      slideArray = slidesConfig();
      changeSlide(indexObj.active);
    }, 1000);
  };

  const debouncedResize = debounce(onResize, 200);

  const addResizeEvent = () => {
    window.addEventListener('resize', debouncedResize);
  };

  function init() {
    changeSlide(3);
    addSlideEvents();
    addArrowEvent();
    addControl();
    slidesConfig();
    addResizeEvent();
  }

  init();
}

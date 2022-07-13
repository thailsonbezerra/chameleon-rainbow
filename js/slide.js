export default class Slide {
  constructor(slide, wrapper) {
    (this.slide = document.querySelector(slide)),
      (this.wrapper = document.querySelector(wrapper)),
      (this.dist = {
        startX: 0,
        movement: 0,
        finalPosition: 0,
      });
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  moveSlide(position) {
    this.dist.movePosition = position;
    this.slide.style.transform = `translate3d(${position}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (clientX - this.dist.startX) * 1.4;
    return this.dist.finalPosition + this.dist.movement;
  }

  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }

    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointPosition =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}

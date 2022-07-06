export default class Slide {
  constructor(slide, wrapper) {
    (this.slide = document.querySelector(slide)),
      (this.wrapper = document.querySelector(wrapper));
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  onStart(event) {
    event.preventDefault();
    console.log('clicou');
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    console.log('moveu');
  }

  onEnd(event) {
    console.log('parou de clicar');
    this.wrapper.removeEventListener('mousemove', this.onMove);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}

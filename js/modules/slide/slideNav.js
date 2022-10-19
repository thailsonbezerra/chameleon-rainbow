import {
  activeClass,
  activeNextSlide,
  activePrevSlide,
  changeSlide,
  indexObj,
  wrapper,
  slideArray,
} from "./slide.js";

const prevElement = document.querySelector(".prev");
const nextElement = document.querySelector(".next");

export const addArrowEvent = () => {
  if (nextElement !== null) {
    prevElement.addEventListener("click", activePrevSlide);
    nextElement.addEventListener("click", activeNextSlide);
  }
};

const createControl = () => {
  if (nextElement !== null) {
    const control = document.createElement("ul");
    control.dataset.control = "slide";
    slideArray.forEach((item, index) => {
      const cristalImgHTML = item.element.innerHTML.replace(
        "bgblack",
        "previews"
      );
      control.innerHTML += `<li><a href="#slide${
        index + 1
      }">${cristalImgHTML}</a></li>`;
      const slidePreview = document.querySelector(".slide-preview");
      slidePreview.appendChild(control);
    });
    return control;
  }
};

let controlArray = [];
export const addControl = () => {
  if (nextElement !== null) {
    const control = createControl();
    controlArray = [...control.children];
    activeControlItem();
    controlArray.forEach(eventControl);
  }
};

const eventControl = (item, index) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    changeSlide(index);
  });
  wrapper.addEventListener("changeEvent", activeControlItem);
};

const activeControlItem = () => {
  controlArray.forEach((item) => item.classList.remove(activeClass));
  controlArray[indexObj.active].classList.add(activeClass);
};

export const arrowColorChange = (color) => {
  prevElement.style.backgroundColor = color;
  nextElement.style.backgroundColor = color;
};

import debounce from "./debounce.js";

const url = document.location.href;
const sections = document.querySelectorAll("section");

const scrollableElement = document.body;

const checkScrollDirection = (event) => {
  const elementAtual = event.path;
  const sectionAtual = elementAtual[elementAtual.length - 6];
  const sectionAtualOffTop = sectionAtual.offsetTop;
  event.preventDefault();
  if (checkScrollDirectionIsUp(event)) {
    console.log("UP");
    window.scroll({
      top: sectionAtualOffTop - 657,
    });
  } else {
    console.log("Down");
    window.scroll({
      top: sectionAtualOffTop + 657,
    });
  }
};

const checkScrollDirectionIsUp = (event) => {
  event.wheelDelta && event.wheelDelta > 0;
  return event.deltaY < 0;
};
export const nextSection = () => {
  if (url.includes("sobre")) {
    const debouncedScrollDirection = debounce(checkScrollDirection, 400);
    scrollableElement.addEventListener("wheel", debouncedScrollDirection);
  }
};

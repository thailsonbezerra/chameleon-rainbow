const header = document.querySelector("header");
const headerImgLogo = document.querySelector("header a img");
const srcLogo = headerImgLogo.src;
let colorChameleon;
export let colorSlide = (color) => {
  colorChameleon = color;
};
export function headerResize(event) {
  if (event.clientY < 25) {
    header.style.padding = "30px 20px";
    header.style.backgroundColor = colorChameleon;
    headerImgLogo.src = srcLogo.replace("Icon", "IconResize");
    headerImgLogo.style.height = "60px";
  } else {
    header.style.backgroundColor = "#000";
    header.style.padding = "0 20px";
    headerImgLogo.style.height = "30px";
    headerImgLogo.src = srcLogo;
  }
}

export const addHeaderResizeEvent = () => {
  window.addEventListener("mousemove", headerResize);
};

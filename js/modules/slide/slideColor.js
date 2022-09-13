import { colorSlide } from "../headerResize.js";
import { arrowColorChange } from "./slideNav.js";

export const colors = {
  red: "#ff0000",
  orange: "#ff8400",
  yellow: "#ffff00",
  green: "#00ff00",
  blue: "#00ffff",
  indigo: "#4343fa",
  violat: "#8b00ff",
};

export let colorAtual;

export const chameleons = document.querySelectorAll(".slide li");

export const chameleonColorSlide = () => {
  chameleons.forEach((chameleon) => {
    if (chameleon.classList.value === "active") {
      const chameleonImg = chameleon.querySelector("img").attributes.src.value;
      const chameleonColor = chameleonImg
        .replace("img/bgblack/", "")
        .replace(".png", "");

      colorSlide(colors[chameleonColor]);
      arrowColorChange(colors[chameleonColor]);
    }
  });
};

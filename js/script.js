import { init, onResize } from "./modules/slide/slide.js";
import { addArrowEvent, addControl } from "./modules/slide/slideNav.js";
import { menu } from "./modules/menu.js";

menu();

//slides
init();
onResize();
addArrowEvent();
addControl();

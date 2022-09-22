import { init, onResize } from "./modules/slide/slide.js";
import { addArrowEvent, addControl } from "./modules/slide/slideNav.js";

init();
onResize();
addArrowEvent();
addControl();

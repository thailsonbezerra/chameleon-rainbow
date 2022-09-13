import { addHeaderResizeEvent } from "./modules/headerResize.js";
import { init } from "./modules/slide/slide.js";
import { addArrowEvent, addControl } from "./modules/slide/slideNav.js";

init();
addArrowEvent();
addControl();
addHeaderResizeEvent();

import { state } from "../state";
import { useLogger } from "../logger";
import { reAdjustCurrentSection } from "../common";

const logger = useLogger();

let timeout;
let isResizing = false;

export function registerResizeEvents() {
    onResizeHandler();

    window.addEventListener("resize", onResizeHandler);
}

export function destroyResizeEvents() {
    setSectionsHeight();

    clearTimeout(timeout)

    window.removeEventListener("resize", onResizeHandler);
}

function onResizeHandler() {
    logger.info("Resize event has been triggered.");
    if(!isResizing) {
        setSectionsHeight(window ? window.innerHeight : document.documentElement.offsetHeight);
    }

    isResizing = true;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        resizeAction();

        isResizing = false;
    }, 400);
}

function resizeAction() {
    state.isResizing = true;

    setSectionsHeight(window ? window.innerHeight : document.documentElement.offsetHeight);

    reAdjustCurrentSection();
}

function setSectionsHeight(value?: number) {
    state.sections.forEach(section => {
        section.style.height = value ? `${value}px` : "";
    })
}
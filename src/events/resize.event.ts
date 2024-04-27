import { state } from "../state";

import { reAdjustCurrentSection } from "../common";

export function registerResizeEvents() {
    onResizeHandler();

    window.addEventListener("resize", onResizeHandler);
}

export function destroyResizeEvents() {
    setSectionsHeight();

    window.removeEventListener("resize", onResizeHandler);
}

let timeout;
let isResizing = false;
function onResizeHandler() {
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
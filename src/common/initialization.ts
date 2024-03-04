import { state } from "../state/state";
import { registerEvents } from "../events";
import { ClassName } from "../utils/class.enum";

export function initializePageScroller() {
    prepareDOM();
    registerEvents();

    state.isInitialized = true;
}

function prepareDOM() {
    const htmlElement = document.querySelector("html");
    htmlElement.classList.add(ClassName.html);

    const bodyElement = document.querySelector("body");
    bodyElement.classList.add(ClassName.body);

    state.container.classList.add(ClassName.container);

    prepareSections();
}

function prepareSections() {
    state.sections = [].slice.call(state.container.children);

    state.sections.forEach((section) => {
        section.classList.add(ClassName.section);

        if(!section.hasAttribute("slide")) return;

        section.classList.add(ClassName.slide);
    });
}
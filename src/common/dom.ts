import { state } from "../state";
import { ClassName } from "../utils/class.enum";

export function initializeDOM() {
    const htmlElement = document.querySelector("html");
    htmlElement.classList.add(ClassName.html);

    const bodyElement = document.querySelector("body");
    bodyElement.classList.add(ClassName.body);

    state.container.classList.add(ClassName.container);

    const transition = `transform ${state.scrollingSpeed}ms ${state.transitionTimingFunction}`;

    state.container.style.transition = transition;

    state.sections = [].slice.call(state.container.children);

    state.sections.forEach((section) => section.classList.add(ClassName.section));
}

export function destroyDOM() {
    const htmlElement = document.querySelector("html");
    htmlElement.classList.remove(ClassName.html);

    const bodyElement = document.querySelector("body");
    bodyElement.classList.remove(ClassName.body);

    state.container.classList.remove(ClassName.container);

    state.container.style.transition = "";

    state.sections.forEach((section) => section.classList.remove(ClassName.section));
}
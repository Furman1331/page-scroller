import type { ScrollingMode, Section } from "../types";

export class State {
    container: HTMLElement | null = null;
    sections: Section[] | null = null;

    scrollMode: ScrollingMode = "automatic";
    activeSection: number = 0;
    scrollingSpeed: number = 700;
    transitionTimingFunction: string = "ease";

    isDebug: boolean = false;
    isScrolling: boolean = false;
    isResizing: boolean = false;
    isInitialized: boolean = false;

    isWheelEnabled: boolean = true;
    isKeyboardEnabled: boolean = true;
    isTouchEnabled: boolean = true;
}

export const state = new State();
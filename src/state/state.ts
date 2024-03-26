import { onSectionChangeProps } from "../types";

export class State {
    container: HTMLElement | null = null;
    sections: HTMLElement[] | null = null;

    activeSectionIndex: number = 0;

    transitionTimingFunction: string = "ease";

    scrollingSpeed: number = 700;

    isDebug: boolean = false;
    isScrolling: boolean = false;
    isInitialized: boolean = false;

    isWheelEnabled: boolean = true;
    isKeyboardEnabled: boolean = true;
    isTouchEnabled: boolean = true;
}

class Callback {
    onSectionChange: (props: onSectionChangeProps) => unknown;
    onBeforeSectionChange: (props: onSectionChangeProps) => unknown;
}

export const state = new State();
export const callback = new Callback();
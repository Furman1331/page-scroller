import { EmitterEvents, emitter } from "../emitter";
import { onSectionChangeProps, usePageScrollerOptions } from "../types";

class State {
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
    onBeforeSectionChange: Function;
}

export const state = new State();
export const callback = new Callback();

/**
 * Assigns the state options for the page scroller.
 * @param options - The options for the page scroller.
 */
export function assignState(options: usePageScrollerOptions) {
    state.isDebug = options.isDebug;
    state.isWheelEnabled = options.isWheelEnabled ?? true;
    state.isKeyboardEnabled = options.isKeyboardEnabled ?? true;
    state.isTouchEnabled = options.isTouchEnabled ?? true;

    state.transitionTimingFunction = options.transitionTimingFunction ??  "ease";

    state.scrollingSpeed = options.scrollingSpeed ?? 700;
}

export function registerCallbacks(options: usePageScrollerOptions) {
    if(options.onSectionChange) {
        callback.onSectionChange = options.onSectionChange;

        emitter.on(EmitterEvents.onSectionChange, (event: onSectionChangeProps) => callback.onSectionChange(event));
    }

    if(options.onBeforeSectionChange) {
        callback.onBeforeSectionChange = options.onBeforeSectionChange;

        emitter.on(EmitterEvents.onBeforeSectionChange, (event: unknown) => callback.onBeforeSectionChange(event));
    }
}
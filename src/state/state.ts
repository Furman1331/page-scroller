import { usePageScrollerOptions } from "../types";

class State {
    container: HTMLElement | null = null;
    sections: HTMLElement[] | null = null;

    activeSectionIndex: number = 0;

    isDebug: boolean = false;
    isScrolling: boolean = false;
    isInitialized: boolean = false;

    isWheelEnabled: boolean = true;
    isKeyboardEnabled: boolean = true;
    isTouchEnabled: boolean = true;
}

export const state = new State();

/**
 * Assigns the state options for the page scroller.
 * @param options - The options for the page scroller.
 */
export function assignState(options: usePageScrollerOptions) {
    state.isDebug = options.isDebug;
    state.isWheelEnabled = options.isWheelEnabled ?? true;
    state.isKeyboardEnabled = options.isKeyboardEnabled ?? true;
    state.isTouchEnabled = options.isTouchEnabled ?? true;
}
import { callback, state } from "../state";
import { emitter, EmitterEvents } from "../emitter";

import type { onSectionChangeProps, usePageScrollerOptions } from "../types";

const defaultState: usePageScrollerOptions = {
    scrollingSpeed: 700,
    transitionTimingFunction: "ease",

    isDebug: false,
    isWheelEnabled: true,
    isKeyboardEnabled: true,
    isTouchEnabled: true,
}

export function initializeState(options: usePageScrollerOptions) {
    state.scrollingSpeed = options.scrollingSpeed ?? defaultState.scrollingSpeed;
    state.transitionTimingFunction = options.transitionTimingFunction ?? defaultState.transitionTimingFunction;

    state.isDebug = options.isDebug ?? defaultState.isDebug;
    state.isWheelEnabled = options.isWheelEnabled ?? defaultState.isWheelEnabled;
    state.isKeyboardEnabled = options.isKeyboardEnabled ?? defaultState.isKeyboardEnabled;
    state.isTouchEnabled = options.isTouchEnabled ?? defaultState.isTouchEnabled;
}

export function destroyState() {
    state.container = null;
    state.sections = null;

    state.activeSectionIndex = 0;

    state.transitionTimingFunction = "ease";

    state.scrollingSpeed = 700;

    state.isDebug = false;
    state.isScrolling = false;
    state.isInitialized = false;

    state.isWheelEnabled = true;
    state.isKeyboardEnabled = true;
    state.isTouchEnabled = true;
}

export function initializeCallbacks(options: usePageScrollerOptions) {
    if(options.onSectionChange) {
        callback.onSectionChange = options.onSectionChange;

        emitter.on(EmitterEvents.onSectionChange, (event: onSectionChangeProps) => callback.onSectionChange(event));
    }

    if(options.onBeforeSectionChange) {
        callback.onBeforeSectionChange = options.onBeforeSectionChange;

        emitter.on(EmitterEvents.onBeforeSectionChange, (event: onSectionChangeProps) => callback.onBeforeSectionChange(event));
    }
}

export function destroyCallbacks() {
    callback.onSectionChange = () => {};
    emitter.off(EmitterEvents.onSectionChange);
    callback.onBeforeSectionChange = () => {};
    emitter.off(EmitterEvents.onBeforeSectionChange);
}
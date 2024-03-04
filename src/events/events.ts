import { state } from "../state/state";

import { destroyWheelEvent, registerWheelEvent } from "./wheel.event";
import { destroyKeyboardEvents, registerKeyboardEvents } from "./keyboard.event";
import { destroyTouchEvents, registerTouchEvents } from "./touch.event";

/**
 * Registers the events for the page scroller.
 */
export function registerEvents() {
    state.isWheelEnabled && registerWheelEvent();
    state.isKeyboardEnabled && registerKeyboardEvents();
    state.isTouchEnabled && registerTouchEvents();
}

/**
 * Destroys the events for the page scroller.
 */
export function destroyEvents() {
    destroyKeyboardEvents();
    destroyWheelEvent();
    destroyTouchEvents();
}
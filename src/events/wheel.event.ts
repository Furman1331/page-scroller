import { useLogger } from "../logger";
import { changeSectionByDirection } from "../common";
import { getAverageFromArray } from "../utils";

import type { ScrollDirection } from "../types";

let scrollingTimeout;
let scrollings = [];

const logger = useLogger();

/**
 * Registers the wheel event listener on the document body.
 */
export function registerWheelEvent() {
    logger.info("Wheel event registered");

    document.body.addEventListener("wheel", wheelEventHandler);
}

/**
 * Removes the wheel event listener from the document body.
 */
export function destroyWheelEvent() {
    logger.info("Wheel event registered");

    document.body.removeEventListener("wheel", wheelEventHandler);
}

function wheelEventHandler(event: WheelEvent) {
    logger.info("Wheel event detected");

    clearTimeout(scrollingTimeout);

    scrollingTimeout = setTimeout(() => {
        scrollings = [];
    }, 200);

    const scrollValue = -event.deltaY || event.detail;
    const direction = getScrollDirection(scrollValue);

    if(scrollings.length > 100) { scrollings.shift(); }

    scrollings.push(Math.abs(scrollValue));

    if(!checkIsAccelerating()) return;

    return changeSectionByDirection(direction);
}

function checkIsAccelerating() {
    const avarageFromEnd = getAverageFromArray(scrollings, 5);
    const avarageFromMid = getAverageFromArray(scrollings, 50);

    return avarageFromEnd >= avarageFromMid;
}

/**
 * Determines the scroll direction based on the WheelEvent.
 * @param event - The WheelEvent object.
 * @returns The scroll direction, either "up" or "down".
 */
function getScrollDirection(value: number): ScrollDirection {
    const delta = Math.max(-1, Math.min(1, value));

    return delta < 0 ? "down" : "up";
}
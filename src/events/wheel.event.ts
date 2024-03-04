import { useLogger } from "../logger";
import { changeSectionByDirection } from "../common";

import type { ScrollDirection } from "../types";

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

    const direction = getScrollDirection(event);

    return changeSectionByDirection(direction);
}

/**
 * Determines the scroll direction based on the WheelEvent.
 * @param event - The WheelEvent object.
 * @returns The scroll direction, either "up" or "down".
 */
function getScrollDirection(event: WheelEvent): ScrollDirection {
    return event.deltaY < 0 ? "up" : "down";
}
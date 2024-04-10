import { prepareScrollModeAutomaticDOM, prepareScrollModeManualDOM } from "../common/dom";
import { destroyEvents, registerEvents } from "../events";

import { emitter, EmitterEvents } from "./emitter";

export function registerEmitterEvents() {
    emitter.on(EmitterEvents.onPageScrollModeAutomatic, () => {
        prepareScrollModeAutomaticDOM();
        registerEvents();
    })

    emitter.on(EmitterEvents.onPageScrollModeManual, () => {
        prepareScrollModeManualDOM();
        destroyEvents();
    })
}

export function destroyEmitterEvents() {
    emitter.off(EmitterEvents.onPageScrollModeManual);
    emitter.off(EmitterEvents.onPageScrollModeAutomatic);
}
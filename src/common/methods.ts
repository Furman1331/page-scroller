import { state } from "../state";
import { emitter, EmitterEvents } from "../emitter";

import type { ScrollingMode } from "../types";

export { onDestroy, changeSectionByDirection, changeSectionBySpecificIndex } from "./";

export function changeScrollingMode(mode: ScrollingMode): void {
    state.scrollMode = mode;

    emitter.emit(mode === "automatic" ? EmitterEvents.onPageScrollModeAutomatic : EmitterEvents.onPageScrollModeManual);
}

export const getActiveSection = (): number => state.activeSection;
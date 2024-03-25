import { useLogger } from "./logger";
import { assignState, registerCallbacks, state } from "./state/state";
import { initializePageScroller, changeSectionBySpecificIndex, changeSectionByDirection } from "./common";

import type { usePageScrollerOptions, usePageScrollerReturn } from "./types";

import "./index.css";

const logger = useLogger();

export function usePageScroller(options?: usePageScrollerOptions): usePageScrollerReturn {
    function initPageScroller(selector: string) {
        logger.info("Initializing page scroller...");

        if(state.isInitialized) throw new Error(logger.createMessage("Page scroller is already initialized."));

        if(selector === undefined) throw new Error(logger.createMessage("Please provide a valid selector."));

        state.container = document.querySelector(selector);

        if(!state.container) throw new Error(logger.createMessage("Container not found. Please provide a valid selector."));

        if (options) assignState(options);

        if (options) registerCallbacks(options);

        initializePageScroller();
    }

    return { initPageScroller, changeSectionByDirection, changeSectionBySpecificIndex };
}
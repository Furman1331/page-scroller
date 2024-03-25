import { state } from "../state/state";

import type { LoggerType, useLoggerReturn } from "../types";

export function useLogger(): useLoggerReturn {
    function info(message: string) {
        if(state.isDebug) console.log(createMessage(message, "info"));
    }

    function error(message: string) {
        if(state.isDebug) console.error(createMessage(message, "error"));
    }

    function warn(message: string) {
        if(state.isDebug) console.warn(createMessage(message, "warn"));
    }

    function createMessage(message: string, type?: LoggerType): string {
        return `[Page-Scroller]${type ? `[${type.toUpperCase()}]`: ""}: ${message}`
    }

    return { info, error, warn, createMessage };
}
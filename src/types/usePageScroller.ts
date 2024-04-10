import { ScrollDirection } from "./scroll";

import type { onSectionChangeProps, onBeforeSectionChangeProps, ScrollingMode } from "./";

export interface usePageScrollerOptions {
    isDebug?: boolean;
    isWheelEnabled?: boolean;
    isKeyboardEnabled?: boolean;
    isTouchEnabled?: boolean;

    transitionTimingFunction?: string;

    scrollingSpeed?: number;
    scrollMode?: ScrollingMode;

    onSectionChange?: (props: onSectionChangeProps) => unknown;
    onBeforeSectionChange?: (props: onBeforeSectionChangeProps) => unknown;
}

export interface usePageScrollerReturn {
    initPageScroller(selector: string): void;
    changeSectionBySpecificIndex: (index: number) => void;
    changeSectionByDirection: (direction: ScrollDirection) => void;
}
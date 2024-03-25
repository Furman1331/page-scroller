import { ScrollDirection } from "./scroll";

import type { onSectionChangeProps } from "./emitter";

export interface usePageScrollerOptions {
    isDebug?: boolean;
    isWheelEnabled?: boolean;
    isKeyboardEnabled?: boolean;
    isTouchEnabled?: boolean;

    transitionTimingFunction?: string;

    scrollingSpeed?: number;

    onSectionChange?: (props: onSectionChangeProps) => unknown;
    onBeforeSectionChange?: (props: onSectionChangeProps) => unknown;
}

export interface usePageScrollerReturn {
    initPageScroller(selector: string): void;
    changeSectionBySpecificIndex: (index: number) => void;
    changeSectionByDirection: (direction: ScrollDirection) => void;
}
import { ScrollDirection } from "./scroll";

export interface usePageScrollerOptions {
    isDebug: boolean;
    isWheelEnabled?: boolean;
    isKeyboardEnabled?: boolean;
    isTouchEnabled?: boolean;
}

export interface usePageScrollerReturn {
    initPageScroller(selector: string): void;
    changeSectionBySpecificIndex: (index: number) => void;
    changeSectionByDirection: (direction: ScrollDirection) => void;
}
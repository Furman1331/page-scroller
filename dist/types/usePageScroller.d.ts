import type { onSectionChangeProps, onBeforeSectionChangeProps } from './';
export interface usePageScrollerOptions {
    isDebug?: boolean;
    isWheelEnabled?: boolean;
    isKeyboardEnabled?: boolean;
    isTouchEnabled?: boolean;
    transitionTimingFunction?: string;
    scrollingSpeed?: number;
    scrollMode?: TScrollingMode;
    isAllowToScrollHorizontally?: boolean;
    onSectionChange?: (props: onSectionChangeProps) => unknown;
    onBeforeSectionChange?: (props: onBeforeSectionChangeProps) => unknown;
}
export interface usePageScrollerReturn {
    initPageScroller(selector: string): void;
    changeSectionBySpecificIndex: (index: number) => void;
    changeSectionByDirection: (direction: TScrollingDirectionVertically) => void;
}
//# sourceMappingURL=usePageScroller.d.ts.map
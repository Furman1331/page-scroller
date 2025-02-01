import type { TScrollingMode, TScrollingDirectionVertically } from '@/types/scroll';
export interface ISectionChangeProps {
    beforeIndex: number;
    afterIndex: number;
}
export type ISectionBeforeChangeProps = ISectionChangeProps;
export interface IPageScrollerOptions {
    isDebug?: boolean;
    isWheelEnabled?: boolean;
    isKeyboardEnabled?: boolean;
    isTouchEnabled?: boolean;
    scrollingSpeed?: number;
    scrollMode?: TScrollingMode;
    transitionTimingFunction?: string;
    slidesIdentifyAttribute?: string;
    isAllowToScrollThroughSlides?: boolean;
    onSectionChange?: (props: ISectionChangeProps) => unknown;
    onBeforeSectionChange?: (props: ISectionBeforeChangeProps) => unknown;
}
export interface IPageScrollerReturn {
    initPageScroller(selector: string): void;
    changeSectionBySpecificIndex: (index: number) => void;
    changeSectionByDirection: (direction: TScrollingDirectionVertically) => void;
}
//# sourceMappingURL=types.d.ts.map
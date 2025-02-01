import type { TScrollingMode, ISection } from '@/types';
export declare class State {
    container: HTMLElement | null;
    sections: ISection[] | null;
    activeSlide: number;
    activeSection: number;
    scrollMode: TScrollingMode;
    scrollingSpeed: number;
    transitionTimingFunction: string;
    isDebug: boolean;
    isScrolling: boolean;
    isResizing: boolean;
    isInitialized: boolean;
    isWheelEnabled: boolean;
    isKeyboardEnabled: boolean;
    isTouchEnabled: boolean;
    slidesIdentifyAttribute: string;
    isAllowToScrollThroughSlides: boolean;
}
export declare const state: State;
//# sourceMappingURL=state.d.ts.map
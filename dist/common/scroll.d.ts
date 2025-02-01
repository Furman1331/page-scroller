import type { TScrollingDirectionVertically, TScrollingDirectionHorizontally } from '@/types';
export declare function changeSectionOrSlideByDirection(direction: TScrollingDirectionVertically): void;
export declare function changeSlideByDirection(direction: TScrollingDirectionHorizontally): void;
export declare function changeSectionByDirection(direction: TScrollingDirectionVertically): boolean;
export declare function changeSectionBySpecificIndex(index: number): boolean;
export declare function reAdjustCurrentSection(): void;
export declare function changeSection(previousIndex: number, nextIndex: number): void;
export declare function changeSlide(previousIndex: number, nextIndex: number): void;
export declare function isAllowToChangeSection(direction: TScrollingDirectionVertically): boolean;
export declare function isAllowToChangeSlide(direction: TScrollingDirectionVertically): boolean;
export declare function isAllowToChangeByIndex(index: number): boolean;
//# sourceMappingURL=scroll.d.ts.map
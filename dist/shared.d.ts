export { onDestroy, changeSectionOrSlideByDirection, changeSectionByDirection, changeSectionBySpecificIndex, changeSlideByDirection, } from '@/common';
import type { TScrollingMode } from '@/types/scroll';
export declare const isManualScrollingMode: () => boolean;
export declare const isAutomaticScrollingMode: () => boolean;
export declare function changeScrollingMode(mode: TScrollingMode): void;
export declare const getActiveSection: () => number;
//# sourceMappingURL=shared.d.ts.map
import type { IEmitter, TEmitterEventType } from '@/types/emitter';
export declare enum EmitterEvents {
    onSectionChange = "onSectionChange",
    onBeforeSectionChange = "onBeforeSectionChange",
    onSlideChange = "onSlideChange",
    onBeforeSlideChange = "onBeforeSlideChange",
    onPageScrollStatusChanged = "onPageScrollStatusChanged",
    onPageScrollModeAutomatic = "onPageScrollModeAutomatic",
    onPageScrollModeManual = "onPageScrollModeManual"
}
export declare const emitter: IEmitter<Record<TEmitterEventType, unknown>>;
//# sourceMappingURL=emitter.d.ts.map
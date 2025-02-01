import type { ICoordinates } from '@/types/event';
export declare function registerTouchEvents(): void;
export declare function destroyTouchEvents(): void;
export declare let touchStartCoordinates: ICoordinates;
export declare function onTouchStartHandler(event: TouchEvent): void;
export declare function onTouchMoveHandler(event: TouchEvent): void;
export declare function getEventCoordinated(event: TouchEvent): ICoordinates;
//# sourceMappingURL=touch.event.d.ts.map
import type { Emitter, EventHandlerList, EventHandlerMap, EventType, Handler, WildCardEventHandlerList, WildcardHandler } from "../types";

export enum EmitterEvents {
    onSectionChange = "onSectionChange",
    onBeforeSectionChange = "onBeforeSectionChange",
    onPageScrollStatusChanged = "onPageScrollStatusChanged",
    onPageScrollModeAutomatic = "onPageScrollModeAutomatic",
    onPageScrollModeManual = "onPageScrollModeManual"
}

function mitt<Events extends Record<EventType, unknown>>(
    all?: EventHandlerMap<Events>
): Emitter<Events> {
    type GenericEventHandler =
        | Handler<Events[keyof Events]>
        | WildcardHandler<Events>;
    all = all || new Map();

    return {
        all,
        on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
            const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
            if (handlers) {
                handlers.push(handler);
            } else {
                all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
            }
        },

        off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
            const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
            if (handlers) {
                if (handler) {
                    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
                } else {
                    all!.set(type, []);
                }
            }
        },

        emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
            let handlers = all!.get(type);
            if (handlers) {
                (handlers as EventHandlerList<Events[keyof Events]>)
                    .slice()
                    .map((handler) => {
                        handler(evt!);
                    });
            }

            handlers = all!.get('*');
            if (handlers) {
                (handlers as WildCardEventHandlerList<Events>)
                    .slice()
                    .map((handler) => {
                        handler(type, evt!);
                    });
            }
        }
    }
}

export const emitter = mitt();

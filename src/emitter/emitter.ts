import type { Emitter, EventHandlerList, EventHandlerMap, EventType, Handler, WildCardEventHandlerList, WildcardHandler } from "../types";

export enum EmitterEvents {
    onSectionChange = "onSectionChange",
    onBeforeSectionChange = "onBeforeSectionChange"
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

        /**
         * Register an event handler for the given type.
         * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
         * @param {Function} handler Function to call in response to given event
         * @memberOf mitt
         */
        on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
            const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
            if (handlers) {
                handlers.push(handler);
            } else {
                all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
            }
        },

        /**
         * Remove an event handler for the given type.
         * If `handler` is omitted, all handlers of the given type are removed.
         * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
         * @param {Function} [handler] Handler function to remove
         * @memberOf mitt
         */
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

        /**
         * Invoke all handlers for the given type.
         * If present, `'*'` handlers are invoked after type-matched handlers.
         *
         * Note: Manually firing '*' handlers is not supported.
         *
         * @param {string|symbol} type The event type to invoke
         * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
         * @memberOf mitt
         */
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
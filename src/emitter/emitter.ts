export enum EmitterEvents {
	onSectionChange = 'onSectionChange',
	onBeforeSectionChange = 'onBeforeSectionChange',

	onSlideChange = 'onSlideChange',
	onBeforeSlideChange = 'onBeforeSlideChange',

	onPageScrollStatusChanged = 'onPageScrollStatusChanged',
	onPageScrollModeAutomatic = 'onPageScrollModeAutomatic',
	onPageScrollModeManual = 'onPageScrollModeManual',
}

function mitt<Events extends Record<TEmitterEventType, unknown>>(all?: IEventHandlerMap<Events>): IEmitter<Events> {
	type GenericEventHandler = TEmitterEventHandler<Events[keyof Events]> | TEmitterEventWildcardHandler<Events>
	all = all || new Map()

	return {
		all,
		on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
			const handlers: Array<GenericEventHandler> | undefined = all!.get(type)
			if (handlers) {
				handlers.push(handler)
			} else {
				all!.set(type, [handler] as TEmitterHandlerList<Events[keyof Events]>)
			}
		},

		off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
			const handlers: Array<GenericEventHandler> | undefined = all!.get(type)
			if (handlers) {
				if (handler) {
					handlers.splice(handlers.indexOf(handler) >>> 0, 1)
				} else {
					all!.set(type, [])
				}
			}
		},

		emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
			let handlers = all!.get(type)
			if (handlers) {
				;(handlers as TEmitterHandlerList<Events[keyof Events]>).slice().map((handler) => {
					handler(evt!)
				})
			}

			handlers = all!.get('*')
			if (handlers) {
				;(handlers as TEmitterWildcardHandlerList<Events>).slice().map((handler) => {
					handler(type, evt!)
				})
			}
		},
	}
}

export const emitter = mitt()

type TEmitterEventType = string | symbol

type TEmitterEventHandler<T = unknown> = (event: T) => void
type TEmitterEventWildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void

type TEmitterHandlerList<T = unknown> = Array<TEmitterEventHandler<T>>
type TEmitterWildcardHandlerList<T = Record<string, unknown>> = Array<TEmitterEventWildcardHandler<T>>

type IEventHandlerMap<Events extends Record<TEmitterEventType, unknown>> = Map<
	keyof Events | '*',
	TEmitterHandlerList<Events[keyof Events]> | TEmitterWildcardHandlerList<Events>
>

interface IEmitter<Events extends Record<TEmitterEventType, unknown>> {
	all: IEventHandlerMap<Events>

	on<Key extends keyof Events>(type: Key, handler: TEmitterEventHandler<Events[Key]>): void
	on(type: '*', handler: TEmitterEventWildcardHandler<Events>): void

	off<Key extends keyof Events>(type: Key, handler?: TEmitterEventHandler<Events[Key]>): void
	off(type: '*', handler: TEmitterEventWildcardHandler<Events>): void

	emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
	emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
}

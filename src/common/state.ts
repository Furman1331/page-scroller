import { callback, state } from '../state'
import { emitter, EmitterEvents } from '../emitter'

const defaultState: IPageScrollerOptions = {
	scrollMode: 'automatic',
	scrollingSpeed: 700,
	transitionTimingFunction: 'ease',
	isAllowToScrollThroughSlides: false,

	isDebug: false,
	isWheelEnabled: true,
	isKeyboardEnabled: true,
	isTouchEnabled: true,
}

export function initializeState(options: IPageScrollerOptions) {
	state.scrollMode = options.scrollMode ?? defaultState.scrollMode
	state.scrollingSpeed = options.scrollingSpeed ?? defaultState.scrollingSpeed
	state.transitionTimingFunction = options.transitionTimingFunction ?? defaultState.transitionTimingFunction

	state.isDebug = options.isDebug ?? defaultState.isDebug
	state.isWheelEnabled = options.isWheelEnabled ?? defaultState.isWheelEnabled
	state.isKeyboardEnabled = options.isKeyboardEnabled ?? defaultState.isKeyboardEnabled
	state.isTouchEnabled = options.isTouchEnabled ?? defaultState.isTouchEnabled

	state.isAllowToScrollThroughSlides = options.isAllowToScrollThroughSlides ?? defaultState.isAllowToScrollThroughSlides
}

export function destroyState() {
	state.container = null
	state.sections = null

	state.activeSlide = 0
	state.activeSection = 0

	state.transitionTimingFunction = 'ease'

	state.scrollingSpeed = defaultState.scrollingSpeed
	state.isAllowToScrollThroughSlides = false

	state.isDebug = defaultState.isDebug
	state.isScrolling = false
	state.isInitialized = false

	state.isWheelEnabled = defaultState.isWheelEnabled
	state.isKeyboardEnabled = defaultState.isKeyboardEnabled
	state.isTouchEnabled = defaultState.isTouchEnabled
}

export function initializeCallbacks(options: IPageScrollerOptions) {
	if (options.onSectionChange) {
		callback.onSectionChange = options.onSectionChange

		emitter.on(EmitterEvents.onSectionChange, (event: ISectionChangeProps) => callback.onSectionChange(event))
	}

	if (options.onBeforeSectionChange) {
		callback.onBeforeSectionChange = options.onBeforeSectionChange

		emitter.on(EmitterEvents.onBeforeSectionChange, (event: ISectionBeforeChangeProps) =>
			callback.onBeforeSectionChange(event)
		)
	}
}

export function destroyCallbacks() {
	callback.onSectionChange = () => {}
	emitter.off(EmitterEvents.onSectionChange)
	callback.onBeforeSectionChange = () => {}
	emitter.off(EmitterEvents.onBeforeSectionChange)
}

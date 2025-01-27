import { initializeState, destroyState, initializeCallbacks, destroyCallbacks, defaultState } from '../../common/state'
import { state, callback } from '../../state'
import { emitter, EmitterEvents } from '../../emitter'

describe('State Management', () => {
	const defaultOptions = defaultState

	afterEach(() => {
		destroyState()
		destroyCallbacks()
	})

	describe('initializeState', () => {
		it('should initialize state with provided options', () => {
			// @ts-ignore
			initializeState(defaultOptions)

			expect(state.scrollMode).toBe(defaultOptions.scrollMode)
			expect(state.scrollingSpeed).toBe(defaultOptions.scrollingSpeed)
			expect(state.transitionTimingFunction).toBe(defaultOptions.transitionTimingFunction)
			expect(state.slidesIdentifyAttribute).toBe(defaultOptions.slidesIdentifyAttribute)
			expect(state.isAllowToScrollThroughSlides).toBe(defaultOptions.isAllowToScrollThroughSlides)
			expect(state.isDebug).toBe(defaultOptions.isDebug)
			expect(state.isWheelEnabled).toBe(defaultOptions.isWheelEnabled)
			expect(state.isKeyboardEnabled).toBe(defaultOptions.isKeyboardEnabled)
			expect(state.isTouchEnabled).toBe(defaultOptions.isTouchEnabled)
		})

		it('should initialize state with default options if not provided', () => {
			initializeState({})

			expect(state.scrollMode).toBe('automatic')
			expect(state.scrollingSpeed).toBe(700)
			expect(state.transitionTimingFunction).toBe('ease')
			expect(state.slidesIdentifyAttribute).toBe('page-scroller-slide')
			expect(state.isAllowToScrollThroughSlides).toBe(false)
			expect(state.isDebug).toBe(false)
			expect(state.isWheelEnabled).toBe(true)
			expect(state.isKeyboardEnabled).toBe(true)
			expect(state.isTouchEnabled).toBe(true)
		})
	})

	describe('destroyState', () => {
		it('should reset state to default values', () => {
			// @ts-ignore
			initializeState(defaultOptions)
			destroyState()

			expect(state.container).toBeNull()
			expect(state.sections).toBeNull()
			expect(state.activeSlide).toBe(0)
			expect(state.activeSection).toBe(0)
			expect(state.transitionTimingFunction).toBe('ease')
			expect(state.scrollingSpeed).toBe(700)
			expect(state.slidesIdentifyAttribute).toBe('page-scroller-slide')
			expect(state.isAllowToScrollThroughSlides).toBe(false)
			expect(state.isDebug).toBe(false)
			expect(state.isScrolling).toBe(false)
			expect(state.isInitialized).toBe(false)
			expect(state.isWheelEnabled).toBe(true)
			expect(state.isKeyboardEnabled).toBe(true)
			expect(state.isTouchEnabled).toBe(true)
		})
	})

	describe('initializeCallbacks', () => {
		it('should initialize callbacks with provided options', () => {
			const onSectionChange = jest.fn()
			const onBeforeSectionChange = jest.fn()
			initializeCallbacks({ onSectionChange, onBeforeSectionChange })

			expect(callback.onSectionChange).toBe(onSectionChange)
			expect(callback.onBeforeSectionChange).toBe(onBeforeSectionChange)
		})

		it('should register event listeners for callbacks', () => {
			const onSectionChange = jest.fn()
			const onBeforeSectionChange = jest.fn()
			initializeCallbacks({ onSectionChange, onBeforeSectionChange })

			emitter.emit(EmitterEvents.onSectionChange, { section: 1 })
			expect(onSectionChange).toHaveBeenCalledWith({ section: 1 })

			emitter.emit(EmitterEvents.onBeforeSectionChange, { section: 1 })
			expect(onBeforeSectionChange).toHaveBeenCalledWith({ section: 1 })
		})
	})

	describe('destroyCallbacks', () => {
		it('should reset callbacks to default values', () => {
			const onSectionChange = jest.fn()
			const onBeforeSectionChange = jest.fn()
			initializeCallbacks({ onSectionChange, onBeforeSectionChange })
			destroyCallbacks()

			expect(callback.onSectionChange).toEqual(expect.any(Function))
			expect(callback.onBeforeSectionChange).toEqual(expect.any(Function))
		})

		it('should remove event listeners for callbacks', () => {
			const onSectionChange = jest.fn()
			const onBeforeSectionChange = jest.fn()
			initializeCallbacks({ onSectionChange, onBeforeSectionChange })
			destroyCallbacks()

			emitter.emit(EmitterEvents.onSectionChange, { section: 1 })
			expect(onSectionChange).not.toHaveBeenCalled()

			emitter.emit(EmitterEvents.onBeforeSectionChange, { section: 1 })
			expect(onBeforeSectionChange).not.toHaveBeenCalled()
		})
	})
})

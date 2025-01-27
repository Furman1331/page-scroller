import { registerEvents, destroyEvents } from '../../events/events'
import { state } from '../../state/state'
import * as wheelEvent from '../../events/wheel.event'
import * as keyboardEvent from '../../events/keyboard.event'
import * as touchEvent from '../../events/touch.event'
import * as resizeEvent from '../../events/resize.event'

jest.mock('../../events/wheel.event')
jest.mock('../../events/keyboard.event')
jest.mock('../../events/touch.event')
jest.mock('../../events/resize.event')

describe('Events', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('registerEvents', () => {
		it('should not register events if scrollMode is manual', () => {
			state.scrollMode = 'manual'
			registerEvents()
			expect(wheelEvent.registerWheelEvent).not.toHaveBeenCalled()
			expect(keyboardEvent.registerKeyboardEvents).not.toHaveBeenCalled()
			expect(touchEvent.registerTouchEvents).not.toHaveBeenCalled()
			expect(resizeEvent.registerResizeEvents).not.toHaveBeenCalled()
		})

		it('should register wheel event if isWheelEnabled is true', () => {
			state.scrollMode = 'automatic'
			state.isWheelEnabled = true
			registerEvents()
			expect(wheelEvent.registerWheelEvent).toHaveBeenCalled()
		})

		it('should register keyboard events if isKeyboardEnabled is true', () => {
			state.scrollMode = 'automatic'
			state.isKeyboardEnabled = true
			registerEvents()
			expect(keyboardEvent.registerKeyboardEvents).toHaveBeenCalled()
		})

		it('should register touch events if isTouchEnabled is true', () => {
			state.scrollMode = 'automatic'
			state.isTouchEnabled = true
			registerEvents()
			expect(touchEvent.registerTouchEvents).toHaveBeenCalled()
		})

		it('should always register resize events', () => {
			state.scrollMode = 'automatic'
			registerEvents()
			expect(resizeEvent.registerResizeEvents).toHaveBeenCalled()
		})
	})

	describe('destroyEvents', () => {
		it('should destroy all events', () => {
			destroyEvents()
			expect(wheelEvent.destroyWheelEvent).toHaveBeenCalled()
			expect(keyboardEvent.destroyKeyboardEvents).toHaveBeenCalled()
			expect(touchEvent.destroyTouchEvents).toHaveBeenCalled()
			expect(resizeEvent.destroyResizeEvents).toHaveBeenCalled()
		})
	})
})

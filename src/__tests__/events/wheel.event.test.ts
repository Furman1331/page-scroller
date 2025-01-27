import { destroyWheelEvent, registerWheelEvent, scrollings } from '@/events/wheel.event'

import { initializeTest } from '../utils/utils'
import { changeSectionOrSlideByDirection } from '@/common'

jest.mock('@/common', () => ({
	onInitialize: jest.fn(),
	changeSectionOrSlideByDirection: jest.fn(),
}))

describe('Wheel Event', () => {
	let wheelEvent: any

	beforeAll(() => {
		initializeTest()
	})

	beforeEach(() => {
		document.body.addEventListener = jest.fn((event, handler) => {
			if (event === 'wheel') {
				wheelEvent = handler
			}
		})

		document.body.removeEventListener = jest.fn((event) => {
			if (event === 'wheel') {
				wheelEvent = null
			}
		})
	})

	afterEach(() => {
		destroyWheelEvent()
	})

	test('registerWheelEvent should add event listeners', () => {
		registerWheelEvent()
		expect(document.body.addEventListener).toHaveBeenCalledWith('wheel', wheelEvent)
	})

	test('destroyWheelEvent should remove event listeners', () => {
		registerWheelEvent()
		destroyWheelEvent()
		expect(document.body.removeEventListener).toHaveBeenCalled()
	})

	describe('Wheel Event Handler', () => {
		test('should reset scrollings array after timeout', () => {
			jest.useFakeTimers()
			registerWheelEvent()

			const event = generateWheelEvent()
			wheelEvent(event)

			expect(scrollings.length).toBe(1)

			jest.advanceTimersByTime(200)
			expect(scrollings.length).toBe(0)
			jest.useRealTimers()
		})

		test('should call changeSectionOrSlideByDirection when accelerating', () => {
			registerWheelEvent()

			const event = generateWheelEvent()
			for (let i = 0; i < 101; i++) {
				wheelEvent(event)
			}

			expect(changeSectionOrSlideByDirection).toHaveBeenCalled()
		})

		test('should determine scroll direction as down', () => {
			registerWheelEvent()

			const event = new WheelEvent('wheel', {
				deltaY: 100,
			})
			wheelEvent(event)

			expect(changeSectionOrSlideByDirection).toHaveBeenCalledWith('down')
		})

		test('should determine scroll direction as up', () => {
			registerWheelEvent()

			const event = new WheelEvent('wheel', {
				deltaY: -100,
			})
			wheelEvent(event)

			expect(changeSectionOrSlideByDirection).toHaveBeenCalledWith('up')
		})
	})

	function generateWheelEvent() {
		return new WheelEvent('wheel', {
			deltaY: 100,
		})
	}
})

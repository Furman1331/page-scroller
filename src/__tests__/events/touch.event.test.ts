import { state } from '../../state'
import { initializeTest } from '../utils/utils'
import {
	registerTouchEvents,
	destroyTouchEvents,
	onTouchStartHandler,
	touchStartCoordinates,
	getEventCoordinated,
	onTouchMoveHandler,
} from '@/events/touch.event'

import { changeSectionOrSlideByDirection } from '@/common'

jest.mock('@/common', () => ({
	onInitialize: jest.fn(),
	changeSectionOrSlideByDirection: jest.fn(),
}))

describe('Touch Events', () => {
	let touchStartHandler: any
	let touchMoveHandler: any

	beforeAll(() => {
		initializeTest()
	})

	beforeEach(() => {
		touchStartHandler = jest.fn()
		touchMoveHandler = jest.fn()
		document.addEventListener = jest.fn((event, handler) => {
			if (event === 'touchstart') {
				touchStartHandler = handler
			}
		})

		document.removeEventListener = jest.fn((event) => {
			if (event === 'touchstart') {
				touchStartHandler = null
			}
		})

		state.container.addEventListener = jest.fn((event, handler) => {
			if (event === 'touchmove') {
				touchMoveHandler = handler
			}
		})

		state.container.removeEventListener = jest.fn((event) => {
			if (event === 'touchmove') {
				touchMoveHandler = null
			}
		})
	})

	afterEach(() => {
		destroyTouchEvents()
	})

	test('registerTouchEvents should add event listeners', () => {
		registerTouchEvents()
		expect(document.addEventListener).toHaveBeenCalledWith('touchstart', touchStartHandler)
		expect(state.container!.addEventListener).toHaveBeenCalledWith('touchmove', touchMoveHandler, { passive: false })
	})

	test('destroyTouchEvents should remove event listeners', () => {
		registerTouchEvents()
		destroyTouchEvents()
		expect(document.removeEventListener).toHaveBeenCalled()
		expect(state.container.removeEventListener).toHaveBeenCalled()
	})

	test('onTouchStartHandler should set touchStartCoordinates', () => {
		const event = generateTouchEvent()
		onTouchStartHandler(event)
		expect(touchStartCoordinates).toEqual({ x: 10, y: 20 })
	})

	test('getEventCoordinated should return coordinates from TouchEvent', () => {
		const event = generateTouchEvent()
		const coordinates = getEventCoordinated(event)
		expect(coordinates).toEqual({ x: 10, y: 20 })
	})

	test('After Touch the screen and move it down or up less then 5% of the screen height, should not call `changeSectionOrSlideByDirection`', () => {
		const startingEvent = generateTouchEvent({ x: 10, y: 20 })
		onTouchStartHandler(startingEvent)

		const moveUpEvent = generateTouchEvent({ x: 10, y: 20 + (window.innerHeight / 100) * 4.9 })
		onTouchMoveHandler(moveUpEvent)

		expect(changeSectionOrSlideByDirection).not.toHaveBeenCalled()

		const moveDownEvent = generateTouchEvent({ x: 10, y: 20 - (window.innerHeight / 100) * 4.9 })
		onTouchMoveHandler(moveDownEvent)

		expect(changeSectionOrSlideByDirection).not.toHaveBeenCalled()
	})

	test("After Touch the screen and move it down, should call `changeSectionOrSlideByDirection` with 'down' direction", () => {
		const startingEvent = generateTouchEvent({ x: 10, y: 20 })
		onTouchStartHandler(startingEvent)

		const moveEvent = generateTouchEvent({ x: 10, y: 100 })
		onTouchMoveHandler(moveEvent)

		expect(changeSectionOrSlideByDirection).toHaveBeenCalledWith('up')
	})

	test("After touch the screen and move it up, should call `changeSectionOrSlideByDirection` with 'down' direction", () => {
		const startingEvent = generateTouchEvent({ x: 10, y: 100 })
		onTouchStartHandler(startingEvent)

		const moveEvent = generateTouchEvent({ x: 10, y: 20 })
		onTouchMoveHandler(moveEvent)

		expect(changeSectionOrSlideByDirection).toHaveBeenCalledWith('down')
	})

	function generateTouchEvent(coordinates: { x: number; y: number } = { x: 10, y: 20 }) {
		return new TouchEvent('touchstart', {
			touches: [
				{
					pageX: coordinates.x,
					pageY: coordinates.y,
					clientX: 0,
					clientY: 0,
					force: 0,
					identifier: 0,
					radiusX: 0,
					radiusY: 0,
					rotationAngle: 0,
					screenX: 0,
					screenY: 0,
					target: undefined,
				},
			],
		})
	}
})

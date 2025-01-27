import { registerResizeEvents, destroyResizeEvents } from '../../events/resize.event'
import { state } from '../../state'
import { reAdjustCurrentSection } from '../../common'
import { initializeTest } from '../utils/utils'

jest.mock('../../state', () => ({
	state: {
		isResizing: false,
		sections: [{ element: { style: { height: '' } } }, { element: { style: { height: '' } } }],
	},
}))

jest.mock('../../common', () => ({
	onInitialize: jest.fn(),
	reAdjustCurrentSection: jest.fn(),
}))

describe('resize.event', () => {
	beforeAll(() => {
		initializeTest({ isDebug: true })
	})

	beforeEach(() => {
		jest.useFakeTimers()
	})

	afterEach(() => {
		jest.clearAllTimers()
		jest.resetAllMocks()
	})

	it('should register resize events', () => {
		const addEventListenerSpy = jest.spyOn(window, 'addEventListener')

		registerResizeEvents()

		expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
	})

	it('should destroy resize events', () => {
		const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

		destroyResizeEvents()

		expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
	})

	it('should handle resize event', () => {
		registerResizeEvents()

		window.dispatchEvent(new Event('resize'))
		jest.runAllTimers()

		expect(state.isResizing).toBe(true)
		expect(reAdjustCurrentSection).toHaveBeenCalled()
	})

	it('should set section sizes on resize', () => {
		const height = 800
		Object.defineProperty(window, 'innerHeight', { value: height, writable: true })

		registerResizeEvents()

		window.dispatchEvent(new Event('resize'))
		jest.runAllTimers()

		state.sections.forEach((section) => {
			expect(section.element.style.height).toBe(`${height}px`)
		})
	})
})

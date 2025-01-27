import { registerKeyboardEvents, destroyKeyboardEvents } from '../../events/keyboard.event'
import { EmitterEvents, emitter } from '../../emitter'
import { state } from '../../state/state'
import { changeSectionOrSlideByDirection, changeSectionBySpecificIndex, changeSlideByDirection } from '../../common'
import { isUserUsingInput } from '../../utils'

jest.mock('../../state/state')
jest.mock('../../utils')
jest.mock('../../common')
jest.mock('../../emitter')

describe('keyboard.event', () => {
	beforeEach(() => {
		document.addEventListener = jest.fn()
		document.removeEventListener = jest.fn()
		emitter.on = jest.fn()
		emitter.off = jest.fn()
		state.sections = [{ element: document.createElement('div'), slides: null }]
		state.activeSection = 0
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('registerKeyboardEvents', () => {
		it('should register keydown event listener and section change handler', () => {
			registerKeyboardEvents()
			expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
			expect(emitter.on).toHaveBeenCalledWith(EmitterEvents.onSectionChange, expect.any(Function))
		})
	})

	describe('destroyKeyboardEvents', () => {
		it('should remove keydown event listener and section change handler', () => {
			destroyKeyboardEvents()
			expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
			expect(emitter.off).toHaveBeenCalledWith(EmitterEvents.onSectionChange)
		})
	})

	describe('keyDownEventHandler', () => {
		let keyDownEventHandler: (event: KeyboardEvent) => void

		beforeEach(() => {
			registerKeyboardEvents()
			keyDownEventHandler = (document.addEventListener as jest.Mock).mock.calls[0][1]
		})

		it('should log keydown event', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
			keyDownEventHandler(event)
			expect(isUserUsingInput).toHaveBeenCalled()
		})

		it('should handle ArrowDown key', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
			keyDownEventHandler(event)
			expect(changeSectionOrSlideByDirection).toHaveBeenCalledWith('down')
		})

		it('should handle ArrowUp key', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
			keyDownEventHandler(event)
			expect(changeSectionOrSlideByDirection).toHaveBeenCalledWith('up')
		})

		it('should handle ArrowRight key', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
			keyDownEventHandler(event)
			expect(changeSlideByDirection).toHaveBeenCalledWith('right')
		})

		it('should handle ArrowLeft key', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
			keyDownEventHandler(event)
			expect(changeSlideByDirection).toHaveBeenCalledWith('left')
		})

		it('should handle End key', () => {
			const event = new KeyboardEvent('keydown', { key: 'End' })
			keyDownEventHandler(event)
			expect(changeSectionBySpecificIndex).toHaveBeenCalledWith(state.sections.length - 1)
		})

		it('should handle Home key', () => {
			const event = new KeyboardEvent('keydown', { key: 'Home' })
			keyDownEventHandler(event)
			expect(changeSectionBySpecificIndex).toHaveBeenCalledWith(0)
		})

		it('should handle Tab key', () => {
			const event = new KeyboardEvent('keydown', { key: 'Tab' })
			keyDownEventHandler(event)
			expect(changeSectionOrSlideByDirection).not.toHaveBeenCalled()
		})
	})
})

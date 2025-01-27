import { useLogger } from '@/logger'
import { state } from '@/state/state'
import { EmitterEvents, emitter } from '@/emitter'
import { focusableElementsString, isUserUsingInput } from '@/utils'
import { changeSectionOrSlideByDirection, changeSectionBySpecificIndex, changeSlideByDirection } from '@/common'

import type { TSupportedKeyboardKeys } from '@/types'

type FocusElementCollation = 'first' | 'last'

const logger = useLogger()

let focusElementCollation: FocusElementCollation = null

/**
 * Registers the keyboard event listeners for keyup and keydown events.
 */
export function registerKeyboardEvents(): void {
	document.addEventListener('keydown', keyDownEventHandler)

	emitter.on(EmitterEvents.onSectionChange, onSectionChangeHandler)
}

/**
 * Removes the keyboard event listeners for keyup and keydown events.
 */
export function destroyKeyboardEvents(): void {
	document.removeEventListener('keydown', keyDownEventHandler)

	emitter.off(EmitterEvents.onSectionChange)
}

/**
 * Hanldes the keydown event and changes the section based on the key pressed.
 * @param event KeyboardEvent - The keyboard event.
 * @returns void
 */
function keyDownEventHandler(event: KeyboardEvent): void {
	logger.info('Keydown event detected')
	const key = event.key as TSupportedKeyboardKeys

	if (isUserUsingInput()) return

	switch (key) {
		case ' ':
		case 'ArrowDown':
		case 'PageDown':
			changeSectionOrSlideByDirection('down')
			break
		case 'ArrowUp':
		case 'PageUp':
			changeSectionOrSlideByDirection('up')
			break
		case 'ArrowRight':
			changeSlideByDirection('right')
		case 'ArrowLeft':
			changeSlideByDirection('left')
		case 'End':
			changeSectionBySpecificIndex(state.sections.length - 1)
			break
		case 'Home':
			changeSectionBySpecificIndex(0)
			break
		case 'Tab':
			onTabPress(event)
			break
	}
}

/**
 * Make sure that the tab key will only focus elements within the current section.
 * Prevent page break when the tab key is pressed.
 * @param event - The keyboard event.
 */
export function onTabPress(event: KeyboardEvent) {
	const isShiftPressed = event.shiftKey
	const activeElement = document.activeElement
	const focusableElements = getFocusableElements(state.sections[state.activeSection].element)

	const isFirstFocusableInSection = activeElement === focusableElements[0]
	const isLastFocusableInSection = activeElement === focusableElements[focusableElements.length - 1]

	const shouldChangeSection = (isShiftPressed && isFirstFocusableInSection) || (!isShiftPressed && isLastFocusableInSection)

	if (shouldChangeSection) {
		event.preventDefault()

		const direction = isShiftPressed && isFirstFocusableInSection ? 'up' : 'down'

		focusElementCollation = direction === 'up' ? 'last' : 'first'

		changeSectionOrSlideByDirection(direction)
	}
}

/**
 * Focuses the first or last focusable element within the current section while changing the section by tag key
 */
function onSectionChangeHandler() {
	if (!focusElementCollation) return

	const focusableElements = getFocusableElements(state.sections[state.activeSection].element)

	focusableElements[focusElementCollation === 'first' ? 0 : focusableElements.length - 1].focus()

	focusElementCollation = null
}

function getFocusableElements(parent: HTMLElement) {
	return [].slice
		.call(parent.querySelectorAll(focusableElementsString))
		.filter((element) => element.getAttribute('tabindex') !== '-1' && element.offsetParent !== null)
}

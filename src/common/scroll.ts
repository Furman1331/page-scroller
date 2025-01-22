import { state } from '../state/state'
import { ClassName } from '../utils/class.enum'

import { EmitterEvents, emitter } from '../emitter'

export function changeSectionByDirection(direction: TScrollingDirectionVertically) {
	if (state.isScrolling) return

	state.isScrolling = true

	const currentSectionIndex = state.activeSection

	if (!isAllowToChangeSection(direction)) return (state.isScrolling = false)

	state.activeSection = direction === 'down' ? currentSectionIndex + 1 : currentSectionIndex - 1

	changeSection(currentSectionIndex, state.activeSection)
}

export function changeSectionBySpecificIndex(index: number) {
	if (state.isScrolling) return

	state.isScrolling = true

	const currentSectionIndex = state.activeSection

	if (!isAllowToChangeByIndex(index)) return (state.isScrolling = false)

	state.sections[currentSectionIndex].element.classList.remove(ClassName.activeSection)

	state.activeSection = index

	changeSection(currentSectionIndex, state.activeSection)
}

export function reAdjustCurrentSection() {
	if (state.scrollMode === 'manual') return

	const sectionOffset = state.sections[state.activeSection].element.offsetTop

	const transform = `translate3d(0px, -${sectionOffset}px, 0px)`

	state.container.style.transform = transform
	state.container.style.webkitTransform = transform
}

function changeSection(previousIndex: number, nextIndex: number) {
	emitter.emit(EmitterEvents.onBeforeSectionChange, { beforeIndex: previousIndex, afterIndex: nextIndex })

	state.sections[previousIndex].element.classList.remove(ClassName.activeSection)

	const sectionOffset = state.sections[nextIndex].element.offsetTop

	const transform = `translate3d(0px, -${sectionOffset}px, 0px)`

	state.container.style.transform = transform
	state.container.style.webkitTransform = transform

	state.sections[nextIndex].element.classList.add(ClassName.activeSection)

	setTimeout(() => {
		state.isScrolling = false

		emitter.emit(EmitterEvents.onSectionChange, { beforeIndex: previousIndex, afterIndex: nextIndex })
	}, 700)
}

function isAllowToChangeSection(direction: TScrollingDirectionVertically) {
	const isAllowToScrollVertically =
		direction === 'down' ? state.sections.length != state.activeSection + 1 : state.activeSection - 1 !== -1

	// const isSectionHasSlides = state.sections[state.activeSection].slides.length > 0

	// const isAllowToScrollHorizontally = state.isAllowToScrollHorizontally && isSectionHasSlides

	return isAllowToScrollVertically
}

function isAllowToChangeByIndex(index: number) {
	return index >= 0 && index < state.sections.length
}

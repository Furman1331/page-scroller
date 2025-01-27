import { state } from '../state/state'
import { ClassName, SlideClassName } from '../utils/class.enum'

import { EmitterEvents, emitter } from '../emitter'

export function changeSectionOrSlideByDirection(direction: TScrollingDirectionVertically) {
	if (isAllowToChangeSlide(direction)) {
		changeSlideByDirection(direction === 'down' ? 'right' : 'left')

		return
	}

	changeSectionByDirection(direction)
}

export function changeSlideByDirection(direction: TScrollingDirectionHorizontally) {
	if (state.isScrolling) return

	state.isScrolling = true

	const currentSlideIndex = state.activeSlide

	state.activeSlide = direction === 'right' ? currentSlideIndex + 1 : currentSlideIndex - 1

	changeSlide(currentSlideIndex, state.activeSlide)
}

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

function changeSlide(previousIndex: number, nextIndex: number) {
	emitter.emit(EmitterEvents.onBeforeSlideChange, { beforeIndex: previousIndex, afterIndex: nextIndex })

	const activeSection = state.sections[state.activeSection]

	activeSection.slides.elements[previousIndex]?.classList.remove(SlideClassName.active)

	const slideOffset = activeSection.slides.elements[nextIndex].offsetLeft

	const transform = `translate3d(-${slideOffset}px, 0px, 0px)`

	activeSection.slides.container.style.transform = transform
	activeSection.slides.container.style.webkitTransform = transform

	state.sections[state.activeSection].slides.elements[nextIndex].classList.add(SlideClassName.active)

	setTimeout(() => {
		state.isScrolling = false

		emitter.emit(EmitterEvents.onSlideChange, { beforeIndex: previousIndex, afterIndex: nextIndex })
	}, 700)
}

function isAllowToChangeSection(direction: TScrollingDirectionVertically) {
	return direction === 'down' ? state.sections.length != state.activeSection + 1 : state.activeSection - 1 !== -1
}

function isAllowToChangeSlide(direction: TScrollingDirectionVertically): boolean {
	if (!state.isAllowToScrollThroughSlides) return false

	const isCurrentSectionHasSlides = state.sections[state.activeSection].slides?.elements.length > 0

	if (!isCurrentSectionHasSlides) return false

	const slides = state.sections[state.activeSection].slides

	const isEdgeSlide = direction === 'down' ? state.activeSlide + 1 === slides.elements.length : state.activeSlide - 1 === -1

	if (isEdgeSlide) return false

	return true
}

function isAllowToChangeByIndex(index: number) {
	return index >= 0 && index < state.sections.length
}

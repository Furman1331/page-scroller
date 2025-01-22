import { state } from '../state'
import { Section } from '../types'
import { ClassName } from '../utils/class.enum'

export function initializeDOM() {
	const htmlElement = document.querySelector('html')
	htmlElement.classList.add(ClassName.html)

	const bodyElement = document.querySelector('body')
	bodyElement.classList.add(ClassName.body)

	state.container.classList.add(ClassName.container)

	const transition = `transform ${state.scrollingSpeed}ms ${state.transitionTimingFunction}`
	state.container.style.transition = transition

	prepareSections()

	state.sections = [].slice.call(state.container.children)
	state.sections.forEach((section) => section.classList.add(ClassName.section))

	state.scrollMode === 'automatic' ? prepareScrollModeAutomaticDOM() : prepareScrollModeManualDOM()
}

function prepareSections() {
	state.sections = Array.from(state.container.children).map((element) => {
		const section = element as HTMLElement
		const slides = Array.from(section.children) as HTMLElement[]

		const foundSlides = slides.filter((slide) => slide.className === 'slide')

		foundSlides.forEach((slide) => slide.classList.add(ClassName.slide))

		return { element: section, slides: foundSlides }
	}) as Section[]

	state.sections.forEach((section) => section.element.classList.add(ClassName.section))
}

export function destroyDOM() {
	const htmlElement = document.querySelector('html')
	htmlElement.classList.remove(ClassName.html)

	const bodyElement = document.querySelector('body')
	bodyElement.classList.remove(ClassName.body)

	state.container.classList.remove(ClassName.container)

	state.container.style.transition = ''
	state.container.style.transform = 'none'
	state.container.style.webkitTransform = 'none'

	state.sections.forEach((section) => section.element.classList.remove(ClassName.section))
}

export function prepareScrollModeAutomaticDOM() {
	const bodyElement = document.querySelector('body')

	bodyElement.style.overflow = 'hidden'
	bodyElement.style.height = '100%'

	const htmlElement = document.querySelector('html')

	htmlElement.style.overflow = 'hidden'
	htmlElement.style.height = '100%'

	const transition = `transform ${state.scrollingSpeed}ms ${state.transitionTimingFunction}`
	state.container.style.transition = transition
}

export function prepareScrollModeManualDOM() {
	const bodyElement = document.querySelector('body')

	bodyElement.style.overflow = 'auto'
	bodyElement.style.height = 'initial'

	const htmlElement = document.querySelector('html')

	htmlElement.style.overflow = 'auto'
	htmlElement.style.height = 'initial'

	state.container.style.transition = ''
	state.container.style.transform = 'none'
	state.container.style.webkitTransform = 'none'
}

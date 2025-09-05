import { state } from '../state'
import { useLogger } from '../logger'
import { reAdjustCurrentSection } from '../common'

const logger = useLogger()

let timeout
let isResizing = false

export function registerResizeEvents() {
	onResizeHandler()

	window.addEventListener('resize', onResizeHandler)
}

export function destroyResizeEvents() {
	resizeHandler()

	clearTimeout(timeout)

	window.removeEventListener('resize', onResizeHandler)
}

export function onResizeHandler() {
	logger.info('Resize event has been triggered.')
	if (!isResizing) {
		resizeHandler()
	}

	isResizing = true

	clearTimeout(timeout)
	timeout = setTimeout(() => {
		resizeAction()

		isResizing = false
	}, 400)
}

function resizeAction() {
	state.isResizing = true

	resizeHandler()

	reAdjustCurrentSection()
}

function resizeHandler() {
	const height = window ? window.innerHeight : document.documentElement.offsetHeight

	setSectionsSize(height)
}

function setSectionsSize(height: number) {
	state.sections.forEach((section) => {
		const getAdjustedHeight = () => {
			if (state.scrollMode === 'automatic') return height

			if (!section.slides) return height

			return height * section.slides.elements.length
		}

		const adjustedHeight = getAdjustedHeight()

		section.element.style.height = `${adjustedHeight}px`
	})
}

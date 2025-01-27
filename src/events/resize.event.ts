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

function onResizeHandler() {
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
	state.sections.forEach((section) => (section.element.style.height = `${height}px`))
}

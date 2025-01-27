import { useLogger } from '../logger'
import { state } from '../state/state'
import { changeSectionOrSlideByDirection } from '../common'

const logger = useLogger()

export function registerTouchEvents(): void {
	document.addEventListener('touchstart', onTouchStartHandler)
	state.container.addEventListener('touchmove', onTouchMoveHandler, { passive: false })
}

export function destroyTouchEvents(): void {
	document.removeEventListener('touchstart', onTouchStartHandler)
	state.container.removeEventListener('touchmove', onTouchMoveHandler)
}

export let touchStartCoordinates: ICoordinates = {}
export function onTouchStartHandler(event: TouchEvent): void {
	const coordinates = getEventCoordinated(event)

	touchStartCoordinates = {
		x: coordinates.x,
		y: coordinates.y,
	}
}

export function onTouchMoveHandler(event: TouchEvent): void {
	logger.info('Touch move event detected')

	const coordinates = getEventCoordinated(event)
	const isVerticalMovementEnought = Math.abs(coordinates.y - touchStartCoordinates.y) > (window.innerHeight / 100) * 5

	const direction = touchStartCoordinates.y > coordinates.y ? 'down' : 'up'

	if (isVerticalMovementEnought) changeSectionOrSlideByDirection(direction)
}

export function getEventCoordinated(event: TouchEvent): ICoordinates {
	return {
		x: event.touches[0].pageX,
		y: event.touches[0].pageY,
	}
}

import {
	prepareScrollModeAutomaticDOM,
	prepareScrollModeManualDOM,
	prepareScrollModeManualDOMForSlides,
	prepareScrollModeAutomaticDOMForSlides,
} from '../common/dom'
import { destroyEvents, registerEvents } from '../events'

import { emitter, EmitterEvents } from './emitter'

export function registerEmitterEvents() {
	emitter.on(EmitterEvents.onPageScrollModeAutomatic, () => {
		prepareScrollModeAutomaticDOM()
		prepareScrollModeAutomaticDOMForSlides()
		registerEvents()
	})

	emitter.on(EmitterEvents.onPageScrollModeManual, () => {
		prepareScrollModeManualDOM()
		prepareScrollModeManualDOMForSlides()
		destroyEvents()
	})
}

export function destroyEmitterEvents() {
	emitter.off(EmitterEvents.onPageScrollModeManual)
	emitter.off(EmitterEvents.onPageScrollModeAutomatic)
}

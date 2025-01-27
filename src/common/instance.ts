import { state } from '../state'

import { registerEmitterEvents, destroyEmitterEvents } from '../emitter'

import { useLogger } from '../logger'
import { initializeDOM, destroyDOM } from './dom'
import { destroyEvents, registerEvents } from '../events'
import { initializeCallbacks, initializeState, destroyState, destroyCallbacks } from './state'

import type { IPageScrollerOptions } from '@/types'

const logger = useLogger()

export function onInitialize(options?: IPageScrollerOptions) {
	logger.info('Initializing Page Scroller...')

	if (options) {
		initializeState(options)
		initializeCallbacks(options)
	}

	initializeDOM()
	registerEvents()
	registerEmitterEvents()

	state.isInitialized = true
	logger.info('Initialized Page Scroller.')
}

export function onDestroy() {
	logger.warn('Destroying Page Scroller...')

	destroyDOM()
	destroyEvents()
	destroyEmitterEvents()
	destroyState()
	destroyCallbacks()

	state.isInitialized = false

	logger.warn('Destroyed Page Scroller.')
}

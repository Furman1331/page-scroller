import { useLogger } from './logger'
import { state } from './state/state'
import { changeSectionBySpecificIndex, changeSectionByDirection, onInitialize } from './common'

import './index.css'

const logger = useLogger()

export function usePageScroller(options?: IPageScrollerOptions): IPageScrollerReturn {
	function initPageScroller(selector: string) {
		logger.info('Initializing page scroller...')

		if (state.isInitialized) throw new Error(logger.createMessage('Page scroller is already initialized.'))

		if (selector === undefined) throw new Error(logger.createMessage('Please provide a valid selector.'))

		state.container = document.querySelector(selector)

		if (!state.container) throw new Error(logger.createMessage('Container not found. Please provide a valid selector.'))

		onInitialize(options)
	}

	return { initPageScroller, changeSectionByDirection, changeSectionBySpecificIndex }
}

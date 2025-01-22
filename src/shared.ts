import { state } from './state'
import { emitter, EmitterEvents } from './emitter'

import type { ScrollingMode } from './types'

export { onDestroy, changeSectionByDirection, changeSectionBySpecificIndex } from './common'

export const isManualScrollingMode = (): boolean => state.scrollMode === 'manual'
export const isAutomaticScrollingMode = (): boolean => state.scrollMode === 'automatic'

export function changeScrollingMode(mode: ScrollingMode) {
	if (state.scrollMode === mode) return

	state.scrollMode = mode

	emitter.emit(mode === 'automatic' ? EmitterEvents.onPageScrollModeAutomatic : EmitterEvents.onPageScrollModeManual)
}

export const getActiveSection = (): number => state.activeSection

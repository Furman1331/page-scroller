import { state } from '@/state'
import { emitter, EmitterEvents } from '@/emitter'

export {
	onDestroy,
	changeSectionOrSlideByDirection,
	changeSectionByDirection,
	changeSectionBySpecificIndex,
	changeSlideByDirection,
} from '@/common'

import type { TScrollingMode } from '@/types/scroll'

export const isManualScrollingMode = (): boolean => state.scrollMode === 'manual'
export const isAutomaticScrollingMode = (): boolean => state.scrollMode === 'automatic'

export function changeScrollingMode(mode: TScrollingMode) {
	if (state.scrollMode === mode) return

	state.scrollMode = mode

	emitter.emit(mode === 'automatic' ? EmitterEvents.onPageScrollModeAutomatic : EmitterEvents.onPageScrollModeManual)
}

export const getActiveSection = (): number => state.activeSection

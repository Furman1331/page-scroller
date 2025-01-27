export class State {
	container: HTMLElement | null = null
	sections: ISection[] | null = null

	activeSlide: number = 0
	activeSection: number = 0

	scrollMode: TScrollingMode = 'automatic'
	scrollingSpeed: number = 700
	transitionTimingFunction: string = 'ease'

	isDebug: boolean = false
	isScrolling: boolean = false
	isResizing: boolean = false
	isInitialized: boolean = false

	isWheelEnabled: boolean = true
	isKeyboardEnabled: boolean = true
	isTouchEnabled: boolean = true

	slidesIdentifyAttribute: string = 'page-scroller-slide'
	isAllowToScrollThroughSlides: boolean = true
}

export const state = new State()

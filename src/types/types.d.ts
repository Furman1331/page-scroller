interface ISectionChangeProps {
	beforeIndex: number
	afterIndex: number
}

type ISectionBeforeChangeProps = ISectionChangeProps

interface IPageScrollerOptions {
	isDebug?: boolean
	isWheelEnabled?: boolean
	isKeyboardEnabled?: boolean
	isTouchEnabled?: boolean

	scrollingSpeed?: number
	scrollMode?: TScrollingMode
	transitionTimingFunction?: string

	slidesIdentifyAttribute?: string
	isAllowToScrollThroughSlides?: boolean

	onSectionChange?: (props: ISectionChangeProps) => unknown
	onBeforeSectionChange?: (props: ISectionBeforeChangeProps) => unknown
}

interface IPageScrollerReturn {
	initPageScroller(selector: string): void
	changeSectionBySpecificIndex: (index: number) => void
	changeSectionByDirection: (direction: TScrollingDirectionVertically) => void
}

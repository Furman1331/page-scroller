type TScrollingMode = 'automatic' | 'manual'

type TScrollingDirectionVertically = 'up' | 'down'
type TScrollingDirectionHorizontally = 'left' | 'right'

type TScrollingDirection = TScrollingDirectionVertically | TScrollingDirectionHorizontally

type TSupportedKeyboardKeys =
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowRight'
	| 'ArrowLeft'
	| 'PageUp'
	| 'PageDown'
	| 'End'
	| 'Home'
	| 'Tab'
	| ' '

interface IScrollingAction {
	direction: TScrollingDirection
}

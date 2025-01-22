type TScrollingMode = 'automatic' | 'manual'

type TScrollingDirectionVertically = 'up' | 'down'
type TScrollingDirectionHorizontal = 'left' | 'right'

type TScrollingDirection = TScrollingDirectionVertically | TScrollingDirectionHorizontal

type TSupportedKeyboardKeys = 'ArrowUp' | 'ArrowDown' | 'PageUp' | 'PageDown' | 'End' | 'Home' | 'Tab' | ' '

interface IScrollingAction {
	direction: TScrollingDirection
}

export const focusableElementsString = `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], summary:not([disabled]), [contenteditable]`

export function closestElement(element: Element, selector: string) {
	if (!element || element.nodeType !== 1) return null

	if (element.matches(selector)) return element

	return closestElement(element.parentNode as Element, selector)
}

export function isUserUsingInput() {
	const activeElement = document.activeElement

	const supportedElements = ['input', 'textarea']

	return supportedElements.includes(activeElement.tagName.toLowerCase())
}

export function getAverageFromArray(array: number[], number: number) {
	const last = array.slice(Math.max(array.length - number, 0))
	const sum = last.reduce((acc, curr) => acc + curr, 0)

	return Math.ceil(sum / number)
}

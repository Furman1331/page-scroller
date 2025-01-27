export interface ISection {
	element: HTMLElement
	slides: ISectionSlides | null
}

export interface ISectionSlides {
	container: HTMLElement
	elements: HTMLElement[]
}

interface ISection {
	element: HTMLElement
	slides: ISectionSlides | null
}

interface ISectionSlides {
	container: HTMLElement
	elements: HTMLElement[]
}

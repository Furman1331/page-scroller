export class Callback {
	onSectionChange: (props: ISectionChangeProps) => unknown
	onBeforeSectionChange: (props: ISectionBeforeChangeProps) => unknown
}

export const callback = new Callback()

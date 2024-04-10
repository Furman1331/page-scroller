import { onSectionChangeProps, onBeforeSectionChangeProps } from "../types";

export class Callback {
    onSectionChange: (props: onSectionChangeProps) => unknown;
    onBeforeSectionChange: (props: onBeforeSectionChangeProps) => unknown;
}

export const callback = new Callback();
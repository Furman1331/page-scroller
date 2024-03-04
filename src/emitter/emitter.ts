import { TinyEmitter } from "tiny-emitter";

export enum EmitterEvents {
    onSectionChange = "onSectionChange",
}

export const emitter = new TinyEmitter();
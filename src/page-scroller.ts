import { state } from "./state/state";

export { changeSectionByDirection, changeSectionBySpecificIndex } from "./common/scroll";

export const getActiveSlide = (): number => state.activeSectionIndex;
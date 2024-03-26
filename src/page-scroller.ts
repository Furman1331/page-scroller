import { state } from "./state/state";

export { onDestroy, changeSectionByDirection, changeSectionBySpecificIndex } from "./common";

export const getActiveSection = (): number => state.activeSectionIndex;
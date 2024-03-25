import { state } from "../../state/state";

export function initializeTest() {
    document.body.innerHTML = `
        <div id="page-scoller">
            <div class="section">Section 1</div>
            <div class="section">Section 1</div>
        </div>
    `;

    state.container = document.getElementById("page-scoller") as HTMLElement;
}
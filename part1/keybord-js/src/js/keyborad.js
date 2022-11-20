export class Keyboard {
    #swithEl;
    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    #assignElement() {
        this.#swithEl = document.getElementById("switch");
    }

    #addEvent() {
        this.#swithEl.addEventListener("change", e => {
            document.documentElement.setAttribute(
                "theme",
                e.target.checked ? "dark-mode" : ""
            )
            console.log(e.target.checked);
        });
    }
}
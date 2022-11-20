export class Keyboard {
    #swithEl; // 다크테마
    #fontSelectEl; // 폰트 변경

    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    #assignElement() {
        this.#swithEl = document.getElementById("switch");
        this.#fontSelectEl = document.getElementById("font");
    }

    #addEvent() {
        this.#swithEl.addEventListener("change", e => {
            document.documentElement.setAttribute(
                "theme",
                e.target.checked ? "dark-mode" : ""
            )
            // console.log(e.target.checked);
        });

        this.#fontSelectEl.addEventListener("change", e => {
            document.body.style.fontFamily = e.target.value;
            // console.log(e.target.value);
        })
    }
}
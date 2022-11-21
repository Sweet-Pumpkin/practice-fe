export class Keyboard {
    // 선언
    #containerEl; 
    #swithEl; // 다크테마
    #fontSelectEl; // 폰트 변경

    // 실행
    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    // 탐색
    #assignElement() {
        this.#containerEl = document.getElementById("container");
        this.#swithEl = this.#containerEl.querySelector("#switch");
        this.#fontSelectEl = this.#containerEl.querySelector("#font");
    }

    // 이벤트 설정
    #addEvent() {
        this.#swithEl.addEventListener("change", this.#onChangeTheme);

        this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    }

    // 다크모드 변경
    #onChangeTheme(e) {
        document.documentElement.setAttribute(
            "theme",
            e.target.checked ? "dark-mode" : ""
        );
    }

    // 폰트 변경
    #onChangeFont(e) {
        document.body.style.fontFamily = e.target.value;
    }
}
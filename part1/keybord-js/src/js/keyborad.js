export class Keyboard {
    // 선언
    #containerEl; 
    #swithEl; // 다크테마
    #fontSelectEl; // 폰트 변경
    #keyboardEl; // 키보드
    #inputGroupEl; // 한글 불가 메세지 출력
    #inputEl // 한글 입력 불가

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
        this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
        this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
        this.#inputEl = this.#inputGroupEl.querySelector("#input");
    }

    // 이벤트 설정
    #addEvent() {
        // 다크 모드 이벤트
        this.#swithEl.addEventListener("change", this.#onChangeTheme);
        // 폰트 변경 이벤트
        this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
        // 키보드 입력 모션 이벤트
        document.addEventListener("keydown", this.#onKeyDown.bind(this));
        document.addEventListener("keyup", this.#onKeyUp.bind(this));
        // 한글 입력 불가 이벤트
        this.#inputEl.addEventListener("input", this.#onInput);
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

    // 키보드 모션 이벤트
    #onKeyDown(e) {
        // 한글 입력 불가 경고 메세지 출력
        this.#inputGroupEl.classList.toggle("error", /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key));
        // 키다운 모션
        // ? => optional chaining
        this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.add("active");
    }
    #onKeyUp(e) {
        this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.remove("active");
    }

    // 한글 입력 불가 이벤트
    #onInput(e) {
        e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
    }
}
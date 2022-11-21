export class Keyboard {
    // 선언
    #containerEl; 
    #swithEl; // 다크테마
    #fontSelectEl; // 폰트 변경
    #keyboardEl; // 키보드
    #inputGroupEl; // 한글 불가 메세지 출력
    #inputEl; // 메세지 출력 (한글 출력 불가)

    //// 마우스 입력 시 키보드 사용 불가 기능
    #keyPress = false;  
    #mouseDown = false;

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
        // 마우스 이벤트
        this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown.bind(this));
        document.addEventListener("mouseup", this.#onMouseUp.bind(this));
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
        // 마우스 사용시 키보드 사용 불가 기능
        if (this.#mouseDown) return;
        this.#keyPress = true;

        // 한글 입력 불가 경고 메세지 출력
        this.#inputGroupEl.classList.toggle("error", /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key));
        //// ? => optional chaining
        this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.add("active");
    }
    #onKeyUp(e) {
        // 마우스 사용시 키보드 사용 불가 기능
        if (this.#mouseDown) return;
        this.#keyPress = false;

        this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.remove("active");
    }

    // 한글 입력 불가 이벤트
    #onInput(e) {
        e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
    }

    // 마우스 이벤트
    #onMouseDown(e) {
        // 키보드 사용 시 마우스 사용 불가 기능
        if (this.#keyPress) return;
        this.#mouseDown = true;

        //// closest => 일치하는 요소 중 가장 가까운 요소 찾기
        e.target.closest("div.key")?.classList.add("active");
    }
    #onMouseUp(e) {
        // 키보드 사용 시 마우스 사용 불가 기능
        if (this.#keyPress) return;
        this.#mouseDown = false;

        // 키 엘리먼트
        const keyEl = e.target.closest("div.key");
        // 키 엘리먼트 중 active 활성화 유무
        //// undefined => !undefined = true => !!undefined = false
        //// contains => 특정 값 유무에 따라 불린 값을 넘겨준다.
        //// false가 아닌 undefined를 넘겨줄 수 있으므로 => !!
        const isActive = !!keyEl?.classList.contains("active");
        // 키 엘리먼트에 data-val 값
        const val = keyEl?.dataset.val;

        // 일반 키 입력 조건문
        if (isActive && !!val && val !== "Space" && val !== "Backspace") {
            this.#inputEl.value += val;
        }
        // 스페이스 키 조건문
        if (isActive && val === "Space") {
            this.#inputEl.value += " ";
        }
        // 백스페이스 
        if (isActive && val === "Backspace") {
            this.#inputEl.value = this.#inputEl.value.slice(0, -1);
        }

        // 키업 모션
        this.#keyboardEl.querySelector(".active")?.classList.remove("active");
    }
}
// export => 함수명을 그대로 사용해야 함.
// export default => 함수명을 원하는 대로 사용 가능.
export default class ImageSlider {
    /** 선언 */
    /** private field - class 외부에서 값을 조회하거나 값을 덮어 씌울 수 없음 */
    #currentPosition = 0;
    #sliderNumber = 0;
    #sliderWidth = 0;

    /** public field */
    sliderWrapEl;
    sliderListEl;
    nextBtnEl;
    previousBtnEl;

    /** 실행 */
    constructor() {
        this.assignElement();
        this.initSliderNumber();
        this.initSliderWidth();
        this.initSliderListWidth();
        this.addEvent();
    }

    /** 탐색 */
    assignElement() {
        this.sliderWrapEl = document.getElementById('slider-wrap');
        this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
        this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
        this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    }

    /** 슬라이더 갯수 계산 */
    initSliderNumber() {
        this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length;
    }

    /** 슬라이더 가로 길이 계산 */
    initSliderWidth() {
        this.#sliderWidth = this.sliderListEl.clientWidth;
    }

    /** 슬라이더 리스트 가로 길이 동적 할당 */
    initSliderListWidth() {
        this.sliderListEl.style.width = `${this.#sliderNumber * this.#sliderWidth}px`;
    }

    /** 이벤트 실행 */
    addEvent() {
        this.nextBtnEl.addEventListener('click', this.moveToRigth.bind(this));
        this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    }

    /** 슬라이드를 오른쪽으로 움직이게 하는 함수 */
    moveToRigth() {
        this.#currentPosition++;

        /** 경계값 설정 */
        if (this.#currentPosition === this.#sliderNumber) {
            this.#currentPosition = 0;
        }

        this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPosition}px`;
    }

    /** 슬라이드를 왼쪽으로 움직이게 하는 함수 */
    moveToLeft() {
        this.#currentPosition--;

        /** 경계값 설정 */
        if (this.#currentPosition === -1) {
            this.#currentPosition = this.#sliderNumber - 1;
        }

        this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPosition}px`;
    }

}
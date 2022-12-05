class ImageSlider {
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
}
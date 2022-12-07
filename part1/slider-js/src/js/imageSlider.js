// export => 함수명을 그대로 사용해야 함.
// export default => 함수명을 원하는 대로 사용 가능.
export default class ImageSlider {
    /** 선언 */
    /** private field - class 외부에서 값을 조회하거나 값을 덮어 씌울 수 없음 */
    #currentPosition = 0;
    #sliderNumber = 0;
    #sliderWidth = 0;
    #intervalId;
    #autoplay = true;

    /** public field */
    sliderWrapEl;
    sliderListEl;
    nextBtnEl;
    previousBtnEl;
    indicaterWrapEl;
    controlWrapEl;

    /** 실행 */
    constructor() {
        this.assignElement();
        this.initSliderNumber();
        this.initSliderWidth();
        this.initSliderListWidth();
        this.addEvent();
        this.createIndicator();
        this.setIndicator();
        this.initAutoplay();
    }

    /** 탐색 */
    assignElement() {
        this.sliderWrapEl = document.getElementById('slider-wrap');
        this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
        this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
        this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
        this.indicaterWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
        this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap'); 
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
        // 버튼 이벤트
        this.nextBtnEl.addEventListener('click', this.moveToRigth.bind(this));
        this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));

        // 인디케이터 클릭 이벤트
        this.indicaterWrapEl.addEventListener('click', this.onClickIndicator.bind(this));

        // autoplay 이벤트
        this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
    }

    /** 슬라이드를 오른쪽으로 움직이게 하는 함수 */
    moveToRigth() {
        this.#currentPosition++;

        /** 경계값 설정 */
        if (this.#currentPosition === this.#sliderNumber) {
            this.#currentPosition = 0;
        }

        this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPosition}px`;

        // 인디케이터
        this.setIndicator();

        // autoplay 상태가 play일 경우 실행
        if (this.#autoplay) {
            // slider 동작 동안 autoplay 멈추기
            clearInterval(this.#intervalId); 
            // slider 실행 후 autoplay 실행
            this.#intervalId = setInterval(this.moveToRigth.bind(this), 3000);
        }
    }

    /** 슬라이드를 왼쪽으로 움직이게 하는 함수 */
    moveToLeft() {
        this.#currentPosition--;

        /** 경계값 설정 */
        if (this.#currentPosition === -1) {
            this.#currentPosition = this.#sliderNumber - 1;
        }

        this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPosition}px`;

        // 인디케이터
        this.setIndicator();

        // autoplay 상태가 play일 경우 실행
        if (this.#autoplay) {
            // slider 동작 동안 autoplay 멈추기
            clearInterval(this.#intervalId); 
            // slider 실행 후 autoplay 실행
            this.#intervalId = setInterval(this.moveToRigth.bind(this), 3000);
        }
    }

    /** 인디케이터 갯수 동적 할당 */
    createIndicator() {
        const docFragment = document.createDocumentFragment();

        for (let i = 0; i < this.#sliderNumber; i++) {
            const li = document.createElement('li');
            li.dataset.index = i;
            docFragment.appendChild(li);
        }

        this.indicaterWrapEl.querySelector('ul').appendChild(docFragment);
    }

    /** 인디케이터 활성화 */
    setIndicator() {
        // index 비활성화 => index에 따라서 활성화
        this.indicaterWrapEl.querySelector('li.active')?.classList.remove('active');
        this.indicaterWrapEl.querySelector(`ul li:nth-child(${this.#currentPosition + 1})`).classList.add('active');
    }

    /** 인디케이터 클릭 이벤트 */
    onClickIndicator(e) {
        // 정수형으로 변환
        const indexPosition = parseInt(e.target.dataset.index, 10);
        
        // 정수형이 아닐 경우 실행 x
        if (Number.isInteger(indexPosition)) {
            this.#currentPosition = indexPosition;
            this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPosition}px`;
            this.setIndicator();
        }
    }

    /** autoplay */
    initAutoplay() {
        this.#intervalId = setInterval(this.moveToRigth.bind(this), 3000);
    }

    /** 토글 이벤트 */
    togglePlay(e) {
        if (e.target.dataset.status === 'play') {
            this.#autoplay = true;
            this.controlWrapEl.classList.add('play');
            this.controlWrapEl.classList.remove('pause');

            this.initAutoplay();

        } else if (e.target.dataset.status === 'pause') {
            this.#autoplay = false;
            this.controlWrapEl.classList.remove('play');
            this.controlWrapEl.classList.add('pause');

            clearInterval(this.#intervalId);  
        }
    }
}
class DatePicker {
  /** 선언 */
  // Public
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  dataPickerEl;
  dataInputEl;
  calendarEl;
  canlendarMonthEl;
  nextBtnEl;
  prevBtnEl;
  calendarDatesEl;

  // Private
  #calendarDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  #selected = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  /** 실행 */
  constructor() {
    this.initCalendarDate();
    this.assignElement();
    this.addEvent();
  }

  /** 캘린더 날짜 초기화 */
  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();

    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  /** 탐색 */
  assignElement() {
    this.dataPickerEl = document.getElementById('date-picker');
    this.dataInputEl = this.dataPickerEl.querySelector('#date-input');
    this.calendarEl = this.dataPickerEl.querySelector('#calendar');
    this.canlendarMonthEl = this.calendarEl.querySelector('#month');
    this.monthContentEl = this.canlendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.canlendarMonthEl.querySelector('#next');
    this.prevBtnEl = this.canlendarMonthEl.querySelector('#prev');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates');
  }

  /** 이벤트 실행 */
  addEvent() {
    // 토글 실행
    this.dataInputEl.addEventListener('click', this.toggleCalendar.bind(this));
    // 다음 달 버튼
    this.nextBtnEl.addEventListener('click', this.moveToNextMonth.bind(this));
    // 이전 달 버튼
    this.prevBtnEl.addEventListener('click', this.moveToPrevMonth.bind(this));
  }

  /** 토글 이벤트 */
  toggleCalendar() {
    // 토글 active
    this.calendarEl.classList.toggle('active');
    // 날짜 동적 입력
    // 토글 상단 달 ex) December
    this.updateMonth();
    // 토글 달력 일 수
    this.updateDates();
  }

  updateMonth() {
    // 현재 날짜로 달 설정
    this.monthContentEl.textContent = `${this.#calendarDate.year} ${
      this.monthData[this.#calendarDate.month]
    }`;
  }

  updateDates() {
    // 달력 일수 초기화
    this.calendarDatesEl.innerHTML = '';
    // 해당 달 일수 계산
    const numberOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0,
    ).getDate();

    // 날짜 일수만큼 `div` 생성
    const fragment = new DocumentFragment();
    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl);
    }
    // 날짜 요일 매칭
    // getDay = 0(일) ~ 6(토)
    fragment.firstChild.style.gridColumnStart =
      new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay() +
      1;

    // 날짜 출력
    this.calendarDatesEl.appendChild(fragment);
    // 토,일요일 날짜 색상 변경
    this.colorSaturday();
    this.colorSunday();
    // 오늘 날짜 마킹
    this.markToday();
  }

  colorSaturday() {
    const saturdayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`,
    );
    for (let i = 0; i < saturdayEls.length; i++) {
      saturdayEls[i].style.color = 'blue';
    }
  }

  colorSunday() {
    const sundayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        (8 -
          new Date(
            this.#calendarDate.year,
            this.#calendarDate.month,
            1,
          ).getDay()) %
        7
      })`,
    );
    for (let i = 0; i < sundayEls.length; i++) {
      sundayEls[i].style.color = 'red';
    }
  }

  markToday() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = currentDate.getDate();

    if (
      currentYear === this.#calendarDate.year &&
      currentMonth === this.#calendarDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${today}']`)
        .classList.add('today');
    }
  }

  moveToNextMonth() {
    this.#calendarDate.month++;
    if (this.#calendarDate.month > 11) {
      this.#calendarDate.month = 0;
      this.#calendarDate.year++;
    }
    // 갱신
    this.updateMonth();
    this.updateDates();
  }

  moveToPrevMonth() {
    this.#calendarDate.month--;
    if (this.#calendarDate.month < 0) {
      this.#calendarDate.month = 11;
      this.#calendarDate.year--;
    }
    // 갱신
    this.updateMonth();
    this.updateDates();
  }
}

new DatePicker();

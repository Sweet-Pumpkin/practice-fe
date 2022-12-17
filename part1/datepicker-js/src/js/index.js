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
    this.assignElement();
  }

  /** 캘린더 날짜 초기화 */
  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  assignElement() {
    this.dataPickerEl = document.getElementById('data-picker');
    this.dataInputEl = this.dataPickerEl.querySelector('#data-input');
    this.calendarEl = this.dataPickerEl.querySelector('#calendar');
    this.canlendarMonthEl = this.calendarEl.querySelector('#month');
    this.monthContentEl = this.canlendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.canlendarMonthEl.querySelector('#next');
    this.prevBtnEl = this.canlendarMonthEl.querySelector('#prev');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates');
  }
}

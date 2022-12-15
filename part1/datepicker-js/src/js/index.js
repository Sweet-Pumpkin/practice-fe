class DatePicker {
  /** 선언 */
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
  constructor() {}

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
}

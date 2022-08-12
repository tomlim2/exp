const getWeekNumber = (date: any) => {
    const firstDayOfTheYear: any = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfTheYear) / 86400000;

    return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};

const isLeapYear = (year: number) => {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};

export class Day {
    public Date: Date;
    public date: number;
    public day: string;
    public dayNumber: number;
    public dayShort: string;
    public year: number;
    public yearShort: string;
    public month: string;
    public monthShort: string;
    public monthNumber: number;
    public timestamp: number;
    public week: number;

    constructor(date: Date | null = null, lang = "en-us") {
        date = date ?? new Date();
        this.Date = date;
        this.date = date.getDate();
        this.day = date.toLocaleString(lang, { weekday: "long" });
        this.dayNumber = date.getDay() + 1;
        this.dayShort = date.toLocaleString(lang, { weekday: "short" });
        this.year = date.getFullYear();
        this.yearShort = date.toLocaleString(lang, { year: "2-digit" });
        this.month = date.toLocaleString(lang, { month: "long" });
        this.monthShort = date.toLocaleString(lang, { month: "short" });
        this.monthNumber = Number(
            date.toLocaleString(lang, { month: "2-digit" })
        );
        this.timestamp = date.getTime();
        this.week = getWeekNumber(date);
    }

    get isToday() {
        return this.isEqualTo(new Date());
    }

    isEqualTo(date: any) {
        date = date instanceof Day ? date.Date : date;

        return (
            date.getDate() === this.date &&
            date.getMonth() === this.monthNumber - 1 &&
            date.getFullYear() === this.year
        );
    }

    format(formatString: string) {
        return formatString
            .replace(/\bYYYY\b/, String(this.year))
            .replace(/\bYYY\b/, String(this.year))
            .replace(/\bWW\b/, this.week.toString().padStart(2, "0"))
            .replace(/\bW\b/, String(this.week))
            .replace(/\bDDDD\b/, this.day)
            .replace(/\bDDD\b/, this.dayShort)
            .replace(/\bDD\b/, this.day.toString().padStart(2, "0"))
            .replace(/\bD\b/, String(this.Date.toLocaleString('en-us', { day: '2-digit' })))
            .replace(/\bMMMM\b/, this.month)
            .replace(/\bMMM\b/, this.monthShort)
            .replace(/\bMM\b/, this.monthNumber.toString().padStart(2, "0"))
            .replace(/\bM\b/, this.monthNumber.toString());
    }
}

export class Month {
    public lang: string;
    public name: string;
    public number: number;
    public displayedNumber: string;
    public year: number;
    public numberOfDays: number;
    public [Symbol.iterator]: any;

    constructor(date: Date | null = null, lang = "en-us") {
        const day = new Day(date, lang);
        const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.lang = lang;

        this.name = day.month;
        this.number = day.monthNumber;
        this.displayedNumber = day.monthNumber.toString().padStart(2, "0");
        this.year = day.year;
        this.numberOfDays = monthsSize[this.number - 1];

        if (this.number === 2) {
            this.numberOfDays += isLeapYear(day.year) ? 1 : 0;
        }

        this[Symbol.iterator] = function* () {
            let number = 1;
            yield this.getDay(number);
            while (number < this.numberOfDays) {
                ++number;
                yield this.getDay(number);
            }
        };
    }

    getDay(date: number) {
        return new Day(new Date(this.year, this.number - 1, date), this.lang);
    }
}

export class Calendar {
    today: Day;
    year: number;
    month: Month;
    lang: string;
    [Symbol.iterator]: any;

    weekDays = Array.from({ length: 7 });

    constructor(
        year: number | null = null,
        monthNumber: number | null = null,
        lang: string = "en-us"
    ) {
        this.today = new Day(null, lang);
        this.year = year ?? this.today.year;
        this.month = new Month(
            new Date(this.year, (monthNumber || this.today.monthNumber) - 1),
            lang
        );
        this.lang = lang;
        this[Symbol.iterator] = function* () {
            let number = 1;
            yield this.getMonth(number);
            while (number < 12) {
                ++number;
                yield this.getMonth(number);
            }
        };

        this.weekDays.forEach((_, i) => {
            const day = this.month.getDay(i);
            if (!this.weekDays.includes(day.day)) {
                this.weekDays[day.dayNumber - 1] = day.day;
            }
        });
    }

    get isLeapYear() {
        return isLeapYear(this.year);
    }

    getMonth(monthNumber: number) {
        return new Month(new Date(this.year, monthNumber - 1), this.lang);
    }
    getPreviousMonth() {
        if (this.month.number === 1) {
            return new Month(new Date(this.year - 1, 11), this.lang);
        }

        return new Month(new Date(this.year, this.month.number - 2), this.lang);
    }
    getNextMonth() {
        if (this.month.number === 12) {
            return new Month(new Date(this.year + 1, 0), this.lang);
        }

        return new Month(new Date(this.year, this.month.number + 2), this.lang);
    }
    goToDate(monthNumber: number, year: number) {
        this.month = new Month(new Date(year, monthNumber - 1), this.lang);
        this.year = year;
    }
    goToPreviousYear() {
        this.year -= 1;
        this.month = new Month(new Date(this.year, 11), this.lang);
    }
    goToNextYear() {
        this.year += 1;
        this.month = new Month(new Date(this.year, 0), this.lang);
    }
    goToPreviousMonth() {
        if (this.month.number === 1) {
            return this.goToPreviousYear();
        }
        this.month = new Month(
            new Date(this.year, this.month.number - 2),
            this.lang
        );
    }
    goToNextMonth() {
        if (this.month.number === 12) {
            return this.goToNextYear();
        }

        this.month = new Month(
            new Date(this.year, this.month.number + 1 - 1),
            this.lang
        );
    }
}

export class DatePicker extends HTMLElement {
    // format: string;
    shadow: any;
    date: any;
    calendar: any;
    position: string;
    visible: any;
    // selectedDayElement: null | HTMLElement

    format = "MMM D DD, YYYY";
    // @ts-ignore
    position = "bottom";
    // @ts-ignore
    visible = false;
    // @ts-ignore
    date = null;
    mounted = false;
    // elements
    toggleButton = null;

    calendarDropDown = null;
    calendarDateElement = null;
    calendarDaysContainer = null;
    selectedDayElement = null;

    constructor() {
        super();

        const lang = window.navigator.language;
        const date = new Date(this.date ?? (this.getAttribute("date") || Date.now()));

        this.shadow = this.attachShadow({ mode: "open" });
        this.date = new Day(date, lang);
        this.calendar = new Calendar(
            this.date.year,
            this.date.monthNumber,
            lang
        );
        this.format = this.getAttribute('format') || this.format;
        // @ts-ignore
        this.position = DatePicker.position.includes(
            // @ts-ignore
            this.getAttribute("position")
                ? this.getAttribute("position")
                : // @ts-ignore
                this.position
        );

        this.visible =
            this.getAttribute("visible") === "" ||
            this.getAttribute("visible") === "true" ||
            this.visible;

        this.render();
    }

    connectedCallback() {
        this.mounted = true;

        this.toggleButton = this.shadow.querySelector(".date-toggle");
        this.calendarDropDown = this.shadow.querySelector(".calendar-dropdown");

        // @ts-ignore
        const [prevBtn, calendarDateElement, nextButton] =
            // @ts-ignore
            this.calendarDropDown.querySelector(".header").children;
        this.calendarDateElement = calendarDateElement;
        // @ts-ignore
        this.calendarDaysContainer = this.calendarDropDown.querySelector('.month-days');

        // @ts-ignore
        this.toggleButton.addEventListener("click", () =>
            this.toggleCalendar()
        );
        prevBtn.addEventListener("click", () => this.prevMonth());
        nextButton.addEventListener("click", () => this.nextMonth());
        // @ts-ignore
        document.addEventListener("click", (e) => this.handleClickOut(e));

        this.renderCalendarDays();
    }
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if (!this.mounted) return;

        switch (name) {
            case 'date':
                this.date = new Day(new Date(newValue));
                this.calendar.goToDate(this.date.monthNumber, this.date.year)
                this.renderCalendarDays();
                this.updateToggleText()
                break;
            case 'format':
                this.format = newValue;
                this.updateToggleText()
                break;
            case 'visible':
                this.visible = ['', 'true', 'false'].includes(newValue)
                newValue === "" ||
                    newValue === "true" ||
                    this.visible;
                this.toggleCalendar(this.visible)
                break;
            case "position":
                this.position = DatePicker.position.includes(newValue)
                    ? newValue
                    : this.position;
                // @ts-ignore
                this.calendarDropDown.className =
                    `calendar-dropdown ${this.visible ? 'visible' : ''} ${this.position}`;
                break;
        }
    }
    toggleCalendar(visible: boolean | null = null) {
        if (visible === null) {
            // @ts-ignore
            this.calendarDropDown.classList.toggle("visible");
        } else if (visible) {
            // @ts-ignore
            this.calendarDropDown.classList.add("visible");
        } else {
            // @ts-ignore
            this.calendarDropDown.classList.remove("visible");
        }
        // @ts-ignore
        this.visible = this.calendarDropDown.className.includes("visible");

        if (this.visible) {
            // @ts-ignore
            this.calendarDateElement.focus();
        } else {
            // @ts-ignore
            this.toggleButton.focus();

            if (!this.isCurrentCalendarMonth()) {
                this.calendar.goToDate(this.date.monthNumber, this.date.year);
                this.renderCalendarDays();
            }
        }
    }

    prevMonth() {
        this.calendar.goToPreviousMonth();
        this.renderCalendarDays()
        // @ts-ignore
        this.calendarDateElement.focus();
    }
    nextMonth() {
        this.calendar.goToNextMonth();
        this.renderCalendarDays()
        // @ts-ignore
        this.calendarDateElement.focus();
    }
    updateHeaderText() {
        // @ts-ignore
        this.calendarDateElement.textContent = `${this.calendar.month.name}, ${this.calendar.year}`;
        const monthYear = `${this.calendar.month.name}, ${this.calendar.year}`
        // @ts-ignore
        this.calendarDateElement
            .setAttribute('aria-label', `current month ${monthYear}`);
    }
    isCurrentCalendarMonth() {
        return (
            this.calendar.month.number === this.date.monthNumber &&
            this.calendar.year === this.date.year
        );
    }
    isSelectedDate(date: any) {
        return date.date === this.date.date &&
            date.monthNumber === this.date.monthNumber &&
            date.year === this.date.year;
    }
    selectDay(el: any, day: Day) {
        if (day.isEqualTo(this.date)) return;

        this.date = day

        if (day.monthNumber !== this.calendar.month.number) {
            this.prevMonth()
        } else {
            el.classList.add('selected');
            // @ts-ignore
            this.selectedDayElement.classList.remove('selected')
            this.selectedDayElement = el
        }

        this.toggleCalendar();
        this.updateToggleText();
    }

    updateToggleText() {
        const date = this.date.format(this.format)
        // @ts-ignore
        this.toggleButton.textContent = date
    }

    handleClickOut(e: any) {
        if (this.visible && this !== e.target) {
            this.toggleCalendar(false);
        }
    }

    getWeekDaysElementStrings() {
        return this.calendar.weekDays
            .map((weekDay: string) => `<span>${weekDay.substring(0, 3)}</span>`)
            .join("");
    }

    getMonthDaysGrid() {
        const firstDayOfTheMonth = this.calendar.month.getDay(1);
        const prevMonth = this.calendar.getPreviousMonth();
        const totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1;
        const totalDays = this.calendar.month.numberOfDays + totalLastMonthFinalDays;
        const monthList = Array.from({ length: totalDays });

        for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
            monthList[i] = this.calendar.month.getDay(i + 1 - totalLastMonthFinalDays)
        }

        for (let i = 0; i < totalLastMonthFinalDays; i++) {
            const inverted = totalLastMonthFinalDays - (i + 1);
            monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted)
        }

        return monthList
    }

    updateMonthDays() {
        // @ts-ignore
        this.calendarDaysContainer.innerHTML = '';

        // @ts-ignore
        this.getMonthDaysGrid().forEach((day: any) => {
            const el = document.createElement('button');
            el.className = 'month-day';
            el.textContent = day.date;
            el.addEventListener('click', () => this.selectDay(el, day));
            el.setAttribute('aria-label', day.format(this.format))
            if (day.monthNumber === this.calendar.month.number) {
                el.classList.add('current')
            }
            if (this.isSelectedDate(day)) {
                el.classList.add('selected')
                // @ts-ignore
                this.selectedDayElement = el;
            }
            // @ts-ignore
            this.calendarDaysContainer.appendChild(el);
        })
    }

    renderCalendarDays() {
        this.updateHeaderText()
        this.updateMonthDays()
        // @ts-ignore
        this.calendarDateElement.focus();
    }

    static get observedAttributes() {
        return ['date', 'format', 'visible', 'position']
    }

    static get position() {
        return ["top", "left", "bottom", "right"];
    }
    // @ts-ignore
    get style() {
        return `
      :host {
      position: relative;
      font-family: sans-serif;
    }
    
    .date-toggle {
      padding: 8px 15px;
      border: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: #eee;
      color: #333;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      text-transform: capitalize;
    }
    
    .calendar-dropdown {
      display: none;
      width: 300px;
      height: 300px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 8px);
      padding: 20px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 0 8px rgba(0,0,0,0.2);
      color: #000
    }
    
    .calendar-dropdown.top {
      top: auto;
      bottom: 100%;
      transform: translate(-50%, -8px);
    }
    
    .calendar-dropdown.left {
      top: 50%;
      left: 0;
      transform: translate(calc(-8px + -100%), -50%);
    }
    
    .calendar-dropdown.right {
      top: 50%;
      left: 100%;
      transform: translate(8px, -50%);
    }
    
    .calendar-dropdown.visible {
      display: block;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0 30px;
    }
    
    .header h4 {
      margin: 0;
      text-transform: capitalize;
      font-size: 21px;
      font-weight: bold;
      color:#000
    }
    
    .header button {
      padding: 0;
      border: 8px solid transparent;
      width: 0;
      height: 0;
      border-radius: 2px;
      border-top-color: #222;
      transform: rotate(90deg);
      cursor: pointer;
      background: none;
      position: relative;
    }
    
    .header button::after {
      content: '';
      display: block;
      width: 25px;
      height: 25px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    
    .header button:last-of-type {
      transform: rotate(-90deg);
    }
    
    .week-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 5px;
      margin-bottom: 10px;
    }
    
    .week-days span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      text-transform: capitalize;
    }
    
    .month-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 5px;
    }
    
    .month-day {
      padding: 8px 5px;
      background: #c7c9d3;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      cursor: pointer;
      border: none;
    }
    
    .month-day.current {
      background: #444857;
    }
    
    .month-day.selected {
      background: #28a5a7;
      color: #ffffff;
    }
    
    .month-day:hover {
      background: #34bd61;
    }`;
    }

    render() {
        const monthYear = `${this.calendar.month.name}, ${this.calendar.year}`;
        const date = this.date.format(this.format);
        this.shadow.innerHTML = `<style>${this.style}</style>
      <button type="button" class="date-toggle">${date}</button>
      <div class="calendar-dropdown ${this.visible ? "visible" : ""} ${this.position
            }"> 
          <div class='header'>
              <button type='button' class="prev-month" aria-label="previous month"></button>
                  <h4 tobindex="0" aria-label="current month ${date}">
                  ${monthYear}
                  </h4>
              <button type='button' class="prev-month" aria-label="next month"></button>
          </div>
          <div class="week-days">${this.getWeekDaysElementStrings()}</div>
          <div class="month-days"></div>
      </div>
      `;
    }
}

export const useDatePicker = () => {
    // @ts-ignore
    customElements.define("date-picker", DatePicker);
}
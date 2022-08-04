<template>
  <div class="date-picker-vue3-component">
    <button
      ref="toggleButton"
      type="button"
      class="date-toggle"
      @click="toggleCalendar"
    >
      {{ state.formattedDate }}
    </button>
    <div
      ref="calendarDropDown"
      class="calendar-dropdown"
      :class="{ visible: state.visible, position: state.position }"
    >
      <div class="header">
        <button
          type="button"
          class="prev-month"
          aria-label="previous month"
          @click="onClick('previousMonth')"
        ></button>
        <h4 ref="calendarDateElement" aria-label="current month">
          {{ state.monthYear }}
        </h4>
        <button
          type="button"
          class="prev-month"
          aria-label="next month"
          @click="onClick('nextMonth')"
        ></button>
      </div>
      <div class="week-days">
        <span :key="index" v-for="(weekDay, index) of state.weekDays">{{
          weekDay
        }}</span>
      </div>
      <div class="month-days">
        <button
          class="month-day"
          :key="index"
          :class="{
            current: date.monthNumber === state.month.number,
            selected: isSelectedDate(date),
          }"
          @click="selectDay(date)"
          v-for="(date, index) of state.calendarDaysContainer"
        >
          {{ date.date }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="state.visible" class="backdrop" @click="toggleCalendar" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { Day, Month, Calendar } from "./DatePicker";

const dateFormat = "D-MM-YYYY";

export default defineComponent({
  emits: ["onDateSelect"],
  props: {
    id: {
      type: String,
      default: null,
    },
    selectedDate: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const state: any = reactive({
      languageForWeekday: "default",
      language: "default",
      year: new Day().year,
      date: new Day(),
      month: new Month(),
      calendar: new Calendar(),
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      formattedDate: "",
      monthYear: computed(
        () => `${state.month.displayedNumber}, ${state.year}`
      ),
      visible: false,
      mounted: false,
      position: "bottom",
      calendarDaysContainer: [],
    });

    const calendarDropDown = ref();
    const calendarDateElement = ref();
    const toggleButton = ref();

    const getWeekDays = (language: string) => {
      const weekDays = Array.from({ length: 7 });
      const weekDay = (index: number) =>
        new Date(state.year, 1, index - 1).toLocaleString(language, {
          weekday: "short",
        });

      weekDays.forEach((_, i) => {
        const day = weekDay(i);
        if (!weekDays.includes(day)) {
          weekDays[i] = day;
        }
      });
      state.weekDays = weekDays;
    };

    const goToPreviousYear = () => {
      state.year -= 1;
      state.month = new Month(new Date(state.year, 11), state.language);
      state.calendar = new Calendar(state.year, state.month, state.language);
      renderCalendarDateContainer();
    };

    const goToNextYear = () => {
      state.year += 1;
      state.month = new Month(new Date(state.year, 0), state.language);
      state.calendar = new Calendar(state.year, state.month, state.language);
      renderCalendarDateContainer();
    };

    const goToPreviousMonth = () => {
      if (state.month.number === 1) {
        return goToPreviousYear();
      }

      const prevMonth = state.month.number - 2;
      state.month = new Month(new Date(state.year, prevMonth), state.language);
      state.calendar = new Calendar(state.year, state.month, state.language);
      renderCalendarDateContainer();
    };

    const goToNextMonth = () => {
      if (state.month.number === 12) {
        return goToNextYear();
      }
      const nextMonth = state.month.number + 1 - 1;
      state.month = new Month(new Date(state.year, nextMonth), state.language);
      state.calendar = new Calendar(state.year, state.month, state.language);

      renderCalendarDateContainer();
    };

    const getPreviousMonth = () => {
      if (state.month.number === 1) {
        return new Month(new Date(state.year - 1, 11), state.language);
      }

      return new Month(
        new Date(state.year, state.month.number - 2),
        state.language
      );
    };

    const getNextMonth = () => {
      if (state.month.number === 12) {
        return new Month(new Date(state.year + 1, 0), state.language);
      }

      return new Month(
        new Date(state.year, state.month.number),
        state.language
      );
    };

    const getMonthDaysGrid = () => {
      const firstDayOfTheMonth = state.month.getDay(1);
      const prevMonth = getPreviousMonth();
      const nextMonth = getNextMonth();
      const totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1;
      const totalDays = state.month.numberOfDays + totalLastMonthFinalDays;
      const leftDaysOfTheCalendar = () => {
        const leftDays = 7 - (totalDays % 7);
        return leftDays !== 7 ? leftDays : 0;
      };
      const monthList = Array.from({ length: totalDays });

      for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
        monthList[i] = state.month.getDay(i + 1 - totalLastMonthFinalDays);
      }

      for (let i = 0; i < totalLastMonthFinalDays; i++) {
        const inverted = totalLastMonthFinalDays - (i + 1);
        monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted);
      }

      if (leftDaysOfTheCalendar() !== 0) {
        for (let i = 0; i < leftDaysOfTheCalendar(); i++) {
          monthList.push(nextMonth.getDay(i + 1));
        }
      }

      return (state.calendarDaysContainer = monthList);
    };

    const renderCalendarDateContainer = () => {
      getMonthDaysGrid();
      calendarDateElement.value.focus();
    };

    const getData = () => {
      state.date = new Day(
        props.selectedDate ? new Date(props.selectedDate) : null,
        state.language
      );
      state.year = state.date.year;
      state.month = new Month(state.date.Date, state.language);
      state.formattedDate = state.date.format(dateFormat);

      console.log(state.month);

      if (!isCurrentCalendarMonth()) {
        goToDate(state.date.monthNumber, state.date.year);
      }
      getMonthDaysGrid();
    };

    onMounted(() => {
      state.languageForWeekday = props.language ?? window.navigator.language;
      getWeekDays(state.languageForWeekday);
      getData();
    });

    const isSelectedDate = (date: any) => {
      return (
        date.date === state.date.date &&
        date.monthNumber === state.date.monthNumber &&
        date.year === state.date.year
      );
    };

    const prevMonth = () => {
      state.calendar.goToPreviousMonth();
      renderCalendarDateContainer();
    };

    const nextMonth = () => {
      state.calendar.goToNextMonth();
      renderCalendarDateContainer();
    };

    const isCurrentCalendarMonth = () => {
      return (
        state.month.number === state.date.monthNumber &&
        state.calendar.year === state.date.year
      );
    };

    const goToDate = (monthNumber: number, year: number) => {
      state.month = new Month(new Date(year, monthNumber - 1), state.language);
      state.year = year;
    };

    const onClick = (id: string) => {
      switch (id) {
        case "previousMonth":
          goToPreviousMonth();
          break;

        case "nextMonth":
          goToNextMonth();
          break;
      }
    };

    const selectDay = (day: Day) => {
      if (day.isEqualTo(state.date)) return;
      state.date = day;
      state.formattedDate = state.date.format(dateFormat);
      if (day.monthNumber < state.month.number) {
        prevMonth();
      }
      if (day.monthNumber > state.month.number) {
        nextMonth();
      }
      emit("onDateSelect", { id: props.id, selectedDate: state.date.Date });
      toggleCalendar();
    };

    const toggleCalendar = () => {
      state.visible = !state.visible;
      if (state.visible) {
        calendarDateElement.value.focus();
      } else {
        toggleButton.value.focus();

        if (!isCurrentCalendarMonth()) {
          goToDate(state.date.monthNumber, state.date.year);
          renderCalendarDateContainer();
        }
      }
    };

    return {
      props,
      state,
      getMonthDaysGrid,
      isSelectedDate,
      toggleButton,
      calendarDropDown,
      calendarDateElement,
      onClick,
      selectDay,
      toggleCalendar,
    };
  },
});
</script>

<style lang="scss" scoped>
.date-picker-vue3-component {
  position: relative;
}
.backdrop {
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.date-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 300px;
  height: 40px;
  padding: 11px 12px;
  cursor: pointer;
  text-transform: capitalize;
  color: #cdd1da;
  background: #000000;
  border: 1px solid #1c202a;
  border-radius: 6px;
  font-weight: bold;
  text-align: left;
  transition: 150ms ease-in-out background-color;

  &::after {
    content: "";
    width: 24px;
    height: 24px;
    background-image: url("~@/assets/icon/icon-calender-dark.svg");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
  }

  &:hover {
    background-color: rgba(28, 32, 42, 0.5);
  }
}

.calendar-dropdown {
  display: none;
  width: 260px;
  height: 300px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  background: #000000;
  border: 1px solid #1c202a;
  z-index: 10;
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
  color: #fff;
}

.header button {
  padding: 0;
  border: 8px solid transparent;
  width: 0;
  height: 0;
  border-radius: 2px;
  border-top-color: #727580;
  transform: rotate(90deg);
  cursor: pointer;
  background: none;
  position: relative;
  transition: border-top-color 150ms ease-in-out;
}

.header button:hover {
  border-top-color: #00bfa5;
}

.header button::after {
  content: "";
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
  background: #1c202a;
  color: #727580;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  transition: 150ms background-color ease-in-out;
}

.month-day.current {
  color: #cdd1da;
  background-color: #444857;
}

.month-day.selected {
  color: #000;
  background-color: #00e3bc;
}

.month-day:hover {
  color: #000;
  background-color: #00bfa5;
}
</style>
<template>
  <div class="calendar-wrapper">
    <date-picker ref="startDate" @click="getDate"></date-picker>
    <date-picker date="2022-02-02" ref="endDate"></date-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useDatePicker } from "./DatePicker";

export default defineComponent({
  setup() {
    const startDate = ref();
    const endDate = ref();
    
    useDatePicker();

    const getDate = () => {
      console.log(startDate.value.date.Date);
    };

    onMounted(() => {
      endDate.value.date.Date
    });

    return {
      startDate,
      endDate,
      getDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
}
</style>
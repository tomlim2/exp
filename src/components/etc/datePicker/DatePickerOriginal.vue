<template>
  <div class="calendar-wrapper">
    <date-picker ref="startDate" @click="getDate"></date-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useDatePicker } from "./DatePicker";

export default defineComponent({
  setup() {
    const startDate = ref();
    useDatePicker();

    const getDate = () => {
      console.log(startDate.value.date.Date);
    };

    onMounted(() => {
      // startDate.value.date.Date
    });

    return {
      startDate,
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
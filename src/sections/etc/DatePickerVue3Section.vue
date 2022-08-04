<template>
  <section class="date-picker-vue3-section">
    DataPickerVue3Component
    <div class="date-pickers">
      <DataPickerVue3Component
        id="startDate"
        :selectedDate="state.startDate"
        @onDateSelect="onDateSelect"
      />
      <DataPickerVue3Component
        id="endDate"
        :selectedDate="state.endDate"
        @onDateSelect="onDateSelect"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataPickerVue3Component from "@/components/etc/DataPickerVue3Component.vue";

export default defineComponent({
  components: {
    DataPickerVue3Component,
  },
  setup() {
    const state = {
      startDate: "",
      endDate: "2020-01-31",
    };

    const onDateSelect = (params: any) => {
      console.log(params);
    };

    return { state, onDateSelect };
  },
});
</script>

<style lang="scss" scoped>
.date-picker-vue3-section {
  .date-pickers {
    margin-top: 8px;
    display: flex;
    gap: 12px;
  }
}
</style>
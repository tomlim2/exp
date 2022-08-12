<template>
  <div class="date-picker-vue3-section">
    <div class="date-pickers">
      {{ state.startDate }}
      <DataPickerVue3Component
        id="startDate"
        :selectedDate="state.startDate"
        :error="state.hasError"
        :language="state.language"
        :disabled="state.isDisabled"
        @onDateSelect="onDateSelect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import DataPickerVue3Component from "@/components/etc/datePicker/DataPickerVue3Component.vue";

export default defineComponent({
  components: {
    DataPickerVue3Component,
  },
  setup() {
    const state = reactive({
      startDate: "",
      language: "ko",
      hasError: false,
      isDisabled: false,
    });

    const onDateSelect = (params: any) => {
      console.log(params);

      switch (params.id) {
        case "startDate":
          state.startDate = params.selectedDate;
          break;
      }
    };

    onMounted(() => {
      state.startDate = "";
    });

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
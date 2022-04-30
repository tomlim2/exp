<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="user-name"> Your Name </label>
      <input
        id="user-name"
        name="user-name"
        type="text"
        v-model="state.userName"
      />
    </div>
    <div class="form-control">
      <label for="age">Your Age (Years)</label>
      <input id="age" name="age" type="number" />
    </div>
    <div class="form-control">
      <label for="referer">How did you hear about us?</label>
      <select name="referer" id="referer">
        <option value="google">Google</option>
        <option value="facebook">Facebook</option>
      </select>
    </div>
    <div><button>Save</button></div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      userName: "",
    });
    const submitForm = () => {
      console.log("Username " + state.userName);
      state.userName = "";
    };
    return {
      submitForm,
      state,
    };
  },
});
</script>
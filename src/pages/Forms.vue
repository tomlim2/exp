<template>
  <div class="page">
    <form @submit.prevent="submitForm">
      <div
        class="form-control"
        :class="{ invalid: state.userNameValidity === 'invalid' }"
      >
        <label for="user-name"> Your Name </label>
        <input
          id="user-name"
          name="user-name"
          type="text"
          v-model.trim="state.userName"
          @blur="validateInput"
        />
        <p v-if="state.userNameValidity === 'invalid'">
          Please enter a valid name
        </p>
      </div>
      <div class="form-control">
        <label for="age">Your Age (Years)</label>
        <input id="age" name="age" type="number" v-model="state.userAge" />
      </div>
      <div class="form-control">
        <label for="referer">How did you hear about us?</label>
        <select name="referer" id="referer" v-model="state.referer">
          <option value="google">Google</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>
      <div class="form-control">
        <h2>interest</h2>
        <div>
          <input
            id="interest-news"
            name="interest"
            type="checkbox"
            value="news"
            v-model="state.interest"
          />
          <label for="interest-news">News</label>
        </div>
        <div>
          <input
            id="interest-tv"
            name="interest"
            type="checkbox"
            value="tv"
            v-model="state.interest"
          />
          <label for="interest-tv">Tv</label>
        </div>
        <div>
          <input
            id="interest-game"
            name="interest"
            type="checkbox"
            value="game"
            v-model="state.interest"
          />
          <label for="interest-game">Game</label>
        </div>
      </div>
      <div class="form-control">
        <h2>how</h2>
        <div>
          <input
            id="how-blog"
            name="how"
            type="radio"
            value="blog"
            v-model="state.how"
          />
          <label for="how-blog">Blogs</label>
        </div>
        <div>
          <input
            id="how-video"
            name="how"
            type="radio"
            value="video"
            v-model="state.how"
          />
          <label for="how-video">Video</label>
        </div>
        <div>
          <input
            id="how-offline"
            name="how"
            type="radio"
            value="offline"
            v-model="state.how"
          />
          <label for="how-offline">offline</label>
        </div>
      </div>
      <div><Rating v-model="state.rating" /></div>
      <div><button>Save</button></div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {  },
  setup() {
    const state = reactive({
      userName: "" as string,
      userAge: "" as number | string,
      referer: "" as string,
      interest: [] as Array<string>,
      how: "" as string,
      userNameValidity: "" as string,
      rating: "" as string,
    });
    const submitForm = () => {
      state.userName = "";
      state.userAge = "";
      state.referer = "";
      state.interest = [];
      state.how = "";
      state.userNameValidity = "";
      state.rating = "";
    };

    const validateInput = () => {
      if (state.userName === "") {
        state.userNameValidity = "invalid";
      } else {
        state.userNameValidity = "valid";
      }
    };

    return {
      validateInput,
      submitForm,
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.form-control {
  &.invalid {
    input {
      border-color: red;
    }
    label {
      color: red;
    }
  }
}
</style>
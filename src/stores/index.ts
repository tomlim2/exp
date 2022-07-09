import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        counter: 1,
        name: 'Eduardo',
        isAdmin: true
    }),
    getters: {
        doubleCounter(state) {
            console.log(state.counter);
            state.counter *= 2
            console.log(state.counter);

            return state.counter
        }
    }
})
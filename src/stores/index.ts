import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        counter: 0,
        name: 'Eduardo',
        isAdmin: true
    }),
    getters: {
        doubleCounter(state) {
            return state.counter * 2
        }
    }
})
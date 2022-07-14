import { defineStore } from 'pinia'

export const useCounterStore = defineStore('main', {
    state: () => ({
        counter: 1,
        name: 'Eduardo',
        isAdmin: true
    }),
    getters: {
        changeName(state) {
            state.name = 'Alex'
            return state.name
        }
    }, actions: {
        increment() {
            this.counter++
        },
        randomizeCounter() {
            this.counter = Math.round(100 * Math.random())
        },
    }
})
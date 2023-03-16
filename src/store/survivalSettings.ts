import { reactive } from 'vue'

export const survivalSettings = reactive({
    difficultyLvl: 1,
    maxInvokeTime: 5,
    invokedSpell: false,
    isCompleted: false
})
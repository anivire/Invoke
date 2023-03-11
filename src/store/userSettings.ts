import { reactive } from 'vue'

export const userSettings = reactive({
   selectedComboId: 0,
   isInvokeStarted: false,
   lastTime: 0
})
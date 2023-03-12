import { reactive } from 'vue'
import { Combo } from '../models/Combo'

export const userSettings = reactive({
   selectedCombo: new Combo(0, '', 0, []),
   isInvokeStarted: false,
   invokeComboComplete: false,
   lastTime: 0
})
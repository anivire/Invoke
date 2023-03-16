import { reactive } from 'vue'
import { Mode } from '../models/Mode'
import { ModeType } from '../models/ModeType'

export const userSettings = reactive({
   selectedMode: new Mode(ModeType.Unset, '', ''),
   isInvokeStarted: false,
   isInvokeComplete: false,
   lastInvokeTime: 0,
   lastInvokeExecution: [0, 0]
})
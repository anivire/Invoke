<template>
    <div @click="selectMode(modeData[modeType])" 
        :class="userSettings.selectedMode.ModeType == modeType ? 'border-emerald-500/50 bg-gradient-to-r from-green-600/25 to-emerald-600/50 hover:bg-emerald-800' 
        :'border-zinc-700/50 bg-zinc-800 hover:bg-zinc-600/50'"
        class="flex mode transition easy-in-out duration-300 border-2 py-2 rounded-lg shadow-md easy-out transition duration-300 flex px-6 mb-5 w-full justify-center cursor-pointer">
        <div class="grid place-items-start place-items-start grow">
            <p>{{modeData[modeType].Title}}</p>
            <p :class="userSettings.selectedMode.ModeType == modeType ? 'text-zinc-300' : 'text-zinc-400'" 
                class="break-all transition easy-in-out duration-300">{{modeData[modeType].Content}}</p>
        </div>
        <ArrowUpRightIcon class="h-6 w-6 place-self-center ml-5" />
    </div>
</template>

<script setup lang="ts">
    import modeData from '../data/ModeData.json'
    import { ArrowUpRightIcon } from "@heroicons/vue/20/solid";
    import { userSettings } from '../store/userSettings';
    import { ModeType } from '../models/ModeType';
    import { Mode } from '../models/Mode';

    defineProps<{ modeType: ModeType }>()
</script>

<script lang="ts">
    export default{
        methods: {
            selectMode(mode: Mode) {
                if (!userSettings.isInvokeStarted) { 
                    userSettings.selectedMode = mode;
                    document.title = userSettings.selectedMode.ModeType == ModeType.Classic ? 'Classic mode › Invoke' : 'Survival mode › Invoke'
                }
            }
        }
    }
</script>
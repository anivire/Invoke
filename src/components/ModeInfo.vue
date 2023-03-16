<template>
    <div @click="selectMode(modeData[modeType])" class="flex mode bg-zinc-800 py-2 rounded-lg shadow-md hover:bg-zinc-600/50 easy-out transition duration-300 flex px-6 mb-5 w-full justify-center cursor-pointer">
        <div class="grid place-items-start place-items-start grow">
            <p>{{modeData[modeType].Title}}</p>
            <p class="break-all text-zinc-500">{{modeData[modeType].Content}}</p>
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
                if (!userSettings.isInvokeStarted) { userSettings.selectedMode = mode; }
            }
        }
    }
</script>
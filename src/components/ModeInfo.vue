<script setup lang="ts">
    import modeData from '../data/ModeData.json'
    import comboData from '../data/ComboData.json'
    import { ArrowUpRightIcon } from "@heroicons/vue/20/solid";
    import { userSettings } from '../store/userSettings';

    defineProps<{ modeId: number }>()
</script>

<script lang="ts">
    export default {
        methods: {
            selectCombo(combo: any) {
                userSettings.selectedCombo = comboData[combo];
                userSettings.selectedCombo.Spells.sort(() => Math.random() - 0.5);
            }
        }
    }
</script>

<template>
    <div @click="selectCombo(modeData[modeId].ComboId)" class="flex mode bg-zinc-800 py-2 rounded-lg shadow-md hover:bg-zinc-600/50 easy-out transition duration-300 flex px-6 mb-5 w-full justify-center cursor-pointer">
        <div class="grid place-items-start place-items-start grow">
            <p>{{modeData[modeId].Title}}</p>
            <p class="break-all text-zinc-500">{{modeData[modeId].Content}}</p>
        </div>
        <ArrowUpRightIcon class="h-6 w-6 place-self-center ml-5" />
    </div>
</template>

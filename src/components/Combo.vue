<script setup lang="ts">
    import SpellIcon from "./SpellIcon.vue";
    import { ArrowSmallDownIcon, ArrowSmallUpIcon } from "@heroicons/vue/20/solid";
    import comboData from '../data/ComboData.json';
    import { userSettings } from "../store/userSettings";
    import { Combo } from '../models/Combo'
</script>

<script lang="ts">
    export default{
        data() {
            return {
                comboData: comboData,
                isShowed: true
            };
        },
        methods: {
            selectCombo(combo: any) {
                userSettings.selectedCombo = combo;
            },
            isShow() {
                this.isShowed = !this.isShowed;
            },
            format(time: number) {
                let diffInHrs = time / 3600000;
                let hh = Math.floor(diffInHrs);

                let diffInMin = (diffInHrs - hh) * 60;
                let mm = Math.floor(diffInMin);

                let diffInSec = (diffInMin - mm) * 60;
                let ss = Math.floor(diffInSec);

                let diffInMs = (diffInSec - ss) * 1000;
                let ms = Math.floor(diffInMs);

                let formattedMM = mm.toString().padStart(2, "0");
                let formattedSS = ss.toString().padStart(2, "0");
                let formattedMS = ms.toString().padStart(3, "0");

                return formattedMM == '00' ? `${formattedSS}:${formattedMS}` : `${formattedMM}:${formattedSS}:${formattedMS}`;
            }
        }
    }
</script>

<template>
    <button class="bg-zinc-800 py-2 rounded-lg shadow-md hover:bg-zinc-600/50 easy-out transition duration-300 flex px-6 mb-5 w-full justify-center" @click="isShow">
        Toggle list of prokast-combo 
        <div v-if="!isShowed">
            <ArrowSmallDownIcon class="h-6 w-6 ml-1"/>
        </div>
        <div v-else>
            <ArrowSmallUpIcon class="h-6 w-6 ml-1"/>
        </div>
    </button>
    <div v-show="isShowed">
        <div v-for="combo in comboData">    
            <div @click="selectCombo(combo)">  
                <div :class="(userSettings.selectedCombo.Id != combo.Id)?'from-zinc-700/50 border-zinc-800':'to-emerald-600/50 from-green-600/25 border-green-600/25'" class="combo-info-container flex flex-row flex-nowrap pl-3 bg-gradient-to-r border-2 p-1 mb-2 rounded-lg">
                    <p class="pr-5">{{combo.Title}}</p>
                    <p class="pr-5">AVG cast time: <code class="mx-1 bg-zinc-600/50 px-1">{{format(combo.AvgCastTime)}}s</code></p>
                    <p>Your cast time: <code class="bg-zinc-600/50 px-1">n/a</code></p>
                </div>

                <div class=" bg-zinc-800 p-3 rounded-lg shadow-md mb-6">
                    <div class="spells-container flex flex-nowrap gap-3">
                        <div v-for="id in combo.Spells">
                            <SpellIcon :spellId="id" v-auto-animate></SpellIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>
<template>
    <div @click="isShow = !isShow"
        class="flex justify-between mode bg-zinc-800 py-2 rounded-lg shadow-md hover:bg-zinc-600/50 easy-out transition duration-300 flex px-6 mb-5 w-full justify-center cursor-pointer">
        <p>Toggle spells list</p>
        <ChevronDownIcon :class="isShow ? 'rotate-180' : ''" class="h-6 w-6 duration-300 transition-all ml-5" />
    </div>

    <div class="grid grid-cols-3 gap-3 mb-5" v-show="isShow">
        <div v-for="i in 10">  
            <div :class="(spellData[i].Id == 10)?'from-sky-500/25 via-fuchsia-500/10 to-amber-500/5'
                 :(spellData[i].Combination[1] == 'exort')?'from-amber-500/10'
                 :(spellData[i].Combination[1] == 'quas')?'from-sky-500/10'
                 :'from-fuchsia-500/10'"
                  class="flex flex-row justify-items-center bg-gradient-to-r justify-center spell p-2 rounded-md shadow-md">
                <!-- <SpellIcon :spellId="spellData[i].Id"></SpellIcon> -->
                <img :src="spellData[i].Img + '.png'" class="overflow-hidden rounded-lg">
                <div class="flex flex-col ml-4 justify-center">
                    <p :class="(spellData[i].Id == 10)?'bg-gradient-to-r from-sky-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent':(spellData[i].Combination[1] == 'exort')?'text-amber-500':(spellData[i].Combination[1] == 'quas')?'text-sky-500':'text-fuchsia-500'">{{spellData[i].Title}}</p>
                    <div class="flex flex-row ">
                        <SphereIcon :sphereTitle="spellData[i].Combination[0]"></SphereIcon>
                        <SphereIcon :sphereTitle="spellData[i].Combination[1]"></SphereIcon>
                        <SphereIcon :sphereTitle="spellData[i].Combination[2]"></SphereIcon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import spellData from '../data/SpellData.json'
    import SpellIcon from "./SpellIcon.vue";
    import SphereIcon from './SphereIcon.vue';
    import { ChevronDownIcon } from "@heroicons/vue/20/solid";

    export default {
        data() {
            return {
                spellData: spellData,
                isShow: true
            }
        },
        components: { SpellIcon, SphereIcon, ChevronDownIcon }
    }
    
</script>
<script setup lang="ts">
    import SpellIcon from "./SpellIcon.vue";
</script>

<script lang="ts">
    import comboData from '../data/ComboData.json';
    import { userSettings } from "../store/userSettings";

    export default{
        data() {
            return {
                comboData: comboData
            };
        },
        methods: {
            selectCombo(comboId: number) {
                userSettings.selectedComboId = comboId;
            }
        }
    }
</script>

<template>
    <div v-for="combo in comboData">    
        <div @click="selectCombo(combo.Id)" >  
            <!--ToDO: rewrite class implement-->
            <div v-if="userSettings.selectedComboId != combo.Id" class="combo-info-container flex flex-row flex-nowrap pl-3 bg-gradient-to-r from-zinc-700/50 border-2 border-zinc-800 transition easy-out p-1 mb-2 rounded-lg">
                <p class="pr-5">{{combo.Title}}</p>
                <p class="pr-5">AVG cast time: <code class="bg-zinc-600/50 px-1">{{combo.AvgCastTime}}</code></p>
                <p>Your cast time: <code>n/a</code></p>
            </div>

            <div v-else class="combo-info-container flex flex-nowrap pl-3 bg-gradient-to-r to-emerald-600/50 from-green-600/25 border-2 border-green-600/25 transition easy-out p-1 mb-2 rounded-lg">
                <p class="pr-5">{{combo.Title}}</p>
                <p class="pr-5">AVG cast time: <code class="bg-zinc-600/50 px-1">{{combo.AvgCastTime}}</code></p>
                <p>Your cast time: <code>n/a</code></p>
            </div>

            <div class=" bg-zinc-800 p-3 rounded-lg shadow-md mb-6">
                <div class="spells-container flex flex-nowrap gap-3">
                    <div v-for="id in combo.Spells">
                        <SpellIcon :spellId="id"></SpellIcon>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>
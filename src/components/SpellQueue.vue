<script setup lang="ts">
    import { userSettings } from "../store/userSettings";
    import SpellIcon from "./SpellIcon.vue";
</script>

<script lang="ts">
    import comboData from '../data/ComboData.json';

    export default{
        data() {
            return {
                comboData: comboData
            };
        },
        methods: {
            getComboInfo(comboId: number) {
                userSettings.selectedComboId = comboId;
            }
        }
    }
</script>

<template>
    <div class="spell-queue">
        <!--<img src="quas.png">
        <img src="wex.png">
        <img src="exort.png">-->
        <div v-if="userSettings.selectedComboId == 0">
            <p class="pb-5">Selected combo: <code>n/a</code></p>
            <div class="bg-zinc-800 p-3 rounded-lg shadow-md mb-6 w-fit">
                <div class="spells-container flex flex-nowrap gap-2">
                    <div v-for="i in 10">
                        <SpellIcon :spellId="0"></SpellIcon>
                    </div>
                </div>
            </div>
        </div>
        <div v-else v-for="combo in comboData">
            <div v-if="combo.Id == userSettings.selectedComboId">
                <p class="pb-5">Selected combo: <code>{{combo.Title}}</code></p>
                <div class=" bg-zinc-800 p-3 rounded-lg shadow-md mb-6 w-fit">
                    <div class="spells-container flex flex-nowrap gap-2">
                        <div v-for="id in combo.Spells">
                            <SpellIcon :spellId="id"></SpellIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { userSettings } from "../store/userSettings";
    import SpellIcon from "./SpellIcon.vue";
    import SphereQueue from "./SphereQueue.vue";
    import MessageModule from "./MessageModule.vue";
    import Timer from './Timer.vue';
</script>

<script lang="ts">
    import comboData from '../data/ComboData.json';
    import spellData from '../data/SpellData.json'
    import { MessageType } from '../models/MessageType';

    export default{
    data() {
        return {
            comboData: comboData,
            firstSphere: 'empty-sphere',
            secondSphere: 'empty-sphere',
            thirdSphere: 'empty-sphere',
            currentSpell: 0,
            spellData: spellData
        };
    },
    created() {
        window.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyQ':
                    this.sphereSet('quas');
                    break;
                case 'KeyW':
                    this.sphereSet('wex');
                    break;
                case 'KeyE':
                    this.sphereSet('exort');
                    break;
            
                default:
                    break;
            }
        });
    },
    methods: {
        getComboInfo(comboId: number) {
            userSettings.selectedComboId = comboId;
        },
        sphereSet(sphere: string) {
            this.thirdSphere = this.secondSphere;
            this.secondSphere = this.firstSphere;
            this.firstSphere = sphere;
        }
    },
    components: { SphereQueue, MessageModule }
}
</script>

<template>
    <div class="spell-queue my-5">
        <div v-if="userSettings.selectedComboId == 0">
            <div>
                <MessageModule :messageType="MessageType.warn" message="Please select Invoker prokast-combo in panel below to continue."></MessageModule>
            </div>
        </div>
        <div v-else v-for="combo in comboData">
            <div v-if="combo.Id == userSettings.selectedComboId">
                <div class="grid grid-cols-2 gap-2 place-items-start pb-5">
                    <div class="flex flex-col place-content-start items-start">
                        <p>Selected combo: <code class="bg-zinc-600/50 px-1">{{combo.Title}}</code></p>
                        <p>Current spell: 
                            <code :class="(spellData.find(x => x.Id == combo.Spells[0])?.Combination[1] == 'quas')?'text-sky-500'
                                            :(spellData.find(x => x.Id == combo.Spells[0])?.Combination[1] == 'wex')?'text-fuchsia-500':'text-amber-500'"
                                class="px-1 font-bold">{{spellData.find(x => x.Id == combo.Spells[0])?.Title}}
                            </code>
                        </p>
                    </div>
                    <p>Note: select spheres by pressing 
                        <code class="px-1 font-bold text-sky-500 bg-zinc-600/50">Q</code>, 
                        <code class="px-1 font-bold text-fuchsia-500 bg-zinc-600/50">W</code>, 
                        <code class="px-1 font-bold text-amber-500 bg-zinc-600/50">E</code> 
                       and Invoke them by pressing 
                        <code class="bg-zinc-600/50 px-1">R</code>
                        button.
                    </p>
                    
                </div>
                
                <div class="flex flex-row justify-center gap-2 pb-5">
                    <SphereQueue :firstSphere="firstSphere" :secondSphere="secondSphere" :thirdSphere="thirdSphere"></SphereQueue>
                </div>
                <div class=" bg-zinc-800 p-3 rounded-lg shadow-md mb-6">
                    <div class="spells-container flex flex-nowrap gap-3">
                        <div v-for="id in combo.Spells">
                            <SpellIcon :spellId="id"></SpellIcon>
                        </div>
                    </div>
                </div>
                <Timer></Timer>
            </div>
        </div>
    </div>
</template>
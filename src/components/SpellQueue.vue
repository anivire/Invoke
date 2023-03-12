<script setup lang="ts">
    import { userSettings } from "../store/userSettings";
    import SphereQueue from "./SphereQueue.vue";
    import MessageModule from "./MessageModule.vue";
    import Timer from './Timer.vue';
    import SpellIconKey from "./SpellIconKey.vue";
    import comboData from '../data/ComboData.json';
    import spellData from '../data/SpellData.json'
    import { MessageType } from '../models/MessageType';
</script>

<script lang="ts">
    
    


    export default{
    data() {
        return {
            comboData: comboData,
            firstSphere: 'empty-sphere',
            secondSphere: 'empty-sphere',
            thirdSphere: 'empty-sphere',
            currentSpell: 0,
            firstSpell: 0,
            secondSpell: 0,
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
                case 'KeyR':
                    this.checkSpell();
                    break;
            
                default:
                    break;
            }
        });
    },
    methods: {
        getComboInfo(comboId: number) {
            userSettings.selectedComboId = comboId;
            this.currentSpell = comboData[userSettings.selectedComboId].Spells[0];
        },
        sphereSet(sphere: string) {
            if (userSettings.isInvokeStarted) {
                this.thirdSphere = this.secondSphere;
                this.secondSphere = this.firstSphere;
                this.firstSphere = sphere;
            }
        },
        checkSpell() {
            if ((this.firstSphere && this.secondSphere && this.thirdSphere) != 'empty-sphere' && userSettings.isInvokeStarted) {
                let userSpheres = [this.firstSphere, this.secondSphere, this.thirdSphere];
                
                for (let i = 0; i < spellData.length; i++) {
                    if (JSON.stringify(spellData[i].Combination.sort()) == JSON.stringify(userSpheres.sort())) {
                        if (this.firstSpell != spellData[i].Id) {
                            this.secondSpell = this.firstSpell;
                            this.firstSpell = spellData[i].Id;

                            // console.log(userSettings.selectedComboId)
                            // if (spellData[i].Id == comboData[userSettings.selectedComboId].Spells[0]) {
                            //     console.log('pass')
                            //     this.currentSpell++;
                            // }
                        }
                        else {
                            this.firstSpell = spellData[i].Id;
                        }
                    }
                }
            }
        }
    },
    components: { SphereQueue, MessageModule, SpellIconKey }
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
                            <code :class="(spellData.find(x => x.Id == combo.Spells[currentSpell])?.Combination[1] == 'quas')?'text-sky-500'
                                            :(spellData.find(x => x.Id == combo.Spells[currentSpell])?.Combination[1] == 'wex')?'text-fuchsia-500':'text-amber-500'"
                                class="px-1 font-bold">{{spellData.find(x => x.Id == combo.Spells[currentSpell])?.Title}}
                            </code>
                        </p>
                        <!-- <p>Next spell: 
                            <code :class="(spellData.find(x => x.Id == combo.Spells[1])?.Combination[1] == 'quas')?'text-sky-500'
                                            :(spellData.find(x => x.Id == combo.Spells[1])?.Combination[1] == 'wex')?'text-fuchsia-500':'text-amber-500'"
                                class="px-1 font-bold">{{spellData.find(x => x.Id == combo.Spells[1])?.Title}}
                            </code>
                        </p> -->
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
                    <SphereQueue v-if="userSettings.isInvokeStarted" :firstSphere="firstSphere" :secondSphere="secondSphere" :thirdSphere="thirdSphere"></SphereQueue>
                    <SphereQueue v-else :firstSphere="firstSphere = 'empty-sphere'" :secondSphere="secondSphere = 'empty-sphere'" :thirdSphere="thirdSphere = 'empty-sphere'"></SphereQueue>
                </div>

                <div class="flex flex-row justify-center gap-2 pb-5">
                    <SpellIconKey :spellId="11" keyDown="Q"></SpellIconKey>
                    <SpellIconKey :spellId="12" keyDown="W"></SpellIconKey>
                    <SpellIconKey :spellId="13" keyDown="E"></SpellIconKey>
                    <SpellIconKey :spellId="secondSpell" keyDown=""></SpellIconKey>
                    <SpellIconKey :spellId="firstSpell" keyDown=""></SpellIconKey>
                    <SpellIconKey :spellId="14" keyDown="R"></SpellIconKey>
                </div>
                <!-- <div class=" bg-zinc-800 p-3 rounded-lg shadow-md mb-6">
                    <div class="spells-container flex flex-nowrap gap-3">
                        <div v-for="id in combo.Spells">
                            <SpellIcon :spellId="id"></SpellIcon>
                        </div>
                    </div>
                </div> -->
                <Timer></Timer>
            </div>
        </div>
    </div>
</template>
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
            userSettings: userSettings,
            comboData: comboData,
            firstSphere: 'empty-sphere',
            secondSphere: 'empty-sphere',
            thirdSphere: 'empty-sphere',
            currentSpell: 0,
            firstSpell: 0,
            secondSpell: 0,
            correctSpells: 0,
            invalidSpells: 0,
            spellData: spellData
        };
    },
    watch: {
        currentSpell: {
            handler(value) {
                if (value == userSettings.selectedCombo.Spells.length) {
                    userSettings.invokeComboComplete = true;
                    this.currentSpell = 0;
                }
            }
        },
        userSettings: {
            handler(value) {
                if (!userSettings.isInvokeStarted) {
                    this.correctSpells = 0;
                    this.invalidSpells = 0;
                }
                if (userSettings.invokeComboComplete && JSON.stringify(userSettings.lastTryExecution) != JSON.stringify([this.correctSpells, this.invalidSpells])) {
                    userSettings.lastTryExecution = [this.correctSpells, this.invalidSpells];
                }
            },
            deep: true
        }
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

                            if (spellData[i].Id == userSettings.selectedCombo.Spells[this.currentSpell]) {
                                this.currentSpell++;
                                this.correctSpells++;
                            }
                            else {
                                this.invalidSpells++;
                            }
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
        <MessageModule v-if="userSettings.selectedCombo.Id == 0" :messageType="MessageType.warn" message="Please select mode in panel below to continue."></MessageModule>
        <div v-else v-for="combo in comboData">
            <div v-if="combo.Id == userSettings.selectedCombo.Id">
                <div class="grid grid-cols-2 gap-2 place-items-start pb-5">
                    <div class="flex flex-col place-content-start items-start">
                        <p>Selected mode: <code class="bg-zinc-600/50 px-1">{{combo.Title}}</code></p>
                        <p>Execution ratio: <code class="bg-emerald-600/50 px-1">{{correctSpells}}</code> / <code class="bg-rose-600/50 px-1">{{invalidSpells}}</code> / <code class="px-1">{{correctSpells != 0 || invalidSpells != 0 ? (correctSpells / (correctSpells + invalidSpells) * 100).toFixed(0) : 100}}%</code></p>
                    </div>
                    <p class="place-self-center">Note: select spheres by pressing 
                        <code class="px-1 font-bold text-sky-500 bg-zinc-600/50">Q</code>, 
                        <code class="px-1 font-bold text-fuchsia-500 bg-zinc-600/50">W</code>, 
                        <code class="px-1 font-bold text-amber-500 bg-zinc-600/50">E</code> 
                        and Invoke them by pressing 
                        <code class="bg-zinc-600/50 px-1">R</code>
                        button.
                    </p>
                    
                </div>
                <p class="flex place-content-center mb-5">Invoke spell: <img class="ml-3 mr-1 w-6" :src="spellData[combo.Spells[currentSpell]].Img + '.png'">
                    <code :class="(spellData[combo.Spells[currentSpell]].Combination[1] == 'quas')?'text-sky-500'
                                    :(spellData[combo.Spells[currentSpell]].Combination[1] == 'wex')?'text-fuchsia-500':'text-amber-500'"
                        class="px-1 font-bold">{{spellData[combo.Spells[currentSpell]].Title}}
                    </code>
                </p>
                <div class="flex flex-row justify-center gap-2 pb-5">
                    <SphereQueue v-if="userSettings.isInvokeStarted" :firstSphere="firstSphere" :secondSphere="secondSphere" :thirdSphere="thirdSphere"></SphereQueue>
                    <SphereQueue v-else :firstSphere="firstSphere = 'empty-sphere'" :secondSphere="secondSphere = 'empty-sphere'" :thirdSphere="thirdSphere = 'empty-sphere'"></SphereQueue>
                </div>

                <div class="flex flex-row justify-center gap-2 pb-5">
                    <SpellIconKey :spellId="11" keyDown="Q"></SpellIconKey>
                    <SpellIconKey :spellId="12" keyDown="W"></SpellIconKey>
                    <SpellIconKey :spellId="13" keyDown="E"></SpellIconKey>
                    <SpellIconKey :spellId="userSettings.isInvokeStarted ? secondSpell : secondSpell = 0" keyDown=""></SpellIconKey>
                    <SpellIconKey :spellId="userSettings.isInvokeStarted ? firstSpell : firstSpell = 0" keyDown=""></SpellIconKey>
                    <SpellIconKey :spellId="14" keyDown="R"></SpellIconKey>
                </div>
                
                <Timer></Timer>
            </div>
        </div>
    </div>
</template>
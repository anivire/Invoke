<template>
    <div class="spell-queue">
        <MessageModule v-if="userSettings.selectedMode.ModeType == ModeType.Unset" :messageType="MessageType.warn" message="Please select mode to continue."></MessageModule>
        <div v-else class="mb-5 bg-zinc-800 p-5 rounded-lg shadow-md border-2 border-zinc-700/50">
            <div class="grid grid-cols-2 gap-2 place-items-start pb-5">
                <div class="flex flex-col place-content-start items-start">
                    <p>Selected mode: <code class="bg-zinc-600/50 px-1">{{modeData[userSettings.selectedMode.ModeType].Title}}</code></p>
                    <p>Accuracy: <code class="bg-emerald-600/50 px-1">{{correctSpells}}</code> / <code class="bg-rose-600/50 px-1">{{invalidSpells}}</code> / <code class="px-1">{{correctSpells != 0 || invalidSpells != 0 ? (correctSpells / (correctSpells + invalidSpells) * 100).toFixed(0) : 0}}%</code></p>
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

            <p v-if="userSettings.isInvokeStarted && userSettings.selectedMode.ModeType == ModeType.Classic" class="flex place-content-center mb-5">Invoke spell: <img class="ml-3 mr-1 w-6" :src="spellData[classicModeSpells[currentSpell]].Img + '.png'">
                <code :class="(spellData[classicModeSpells[currentSpell]].Combination[1] == 'quas')?'text-sky-500'
                                :(spellData[classicModeSpells[currentSpell]].Combination[1] == 'wex')?'text-fuchsia-500':'text-amber-500'"
                    class="px-1 font-bold">{{spellData[classicModeSpells[currentSpell]].Title}}
                </code>
            </p>
            
            <p v-else-if="userSettings.isInvokeStarted && userSettings.selectedMode.ModeType == ModeType.Survival" class="flex place-content-center mb-5">Invoke spell: <img class="ml-3 mr-1 w-6" :src="spellData[currentSpell].Img + '.png'">
                <code :class="(spellData[currentSpell].Combination[1] == 'quas')?'text-sky-500'
                                :(spellData[currentSpell].Combination[1] == 'wex')?'text-fuchsia-500':'text-amber-500'"
                    class="px-1 font-bold">{{spellData[currentSpell].Title}}
                </code>
            </p>
            
            <p v-else class="flex place-content-center mb-5">Invoke spell:
                <code class="bg-zinc-600/50 px-1 ml-1">Start timer to see current spell</code>
            </p>

            <div class="flex flex-row justify-center gap-2 pb-5">
                <SphereQueue :firstSphere="firstSphere" :secondSphere="secondSphere" :thirdSphere="thirdSphere"></SphereQueue>
            </div>

            <div class="flex flex-row justify-center gap-2 pb-5">
                <SpellIconKey :spellId="11" keyDown="Q"></SpellIconKey>
                <SpellIconKey :spellId="12" keyDown="W"></SpellIconKey>
                <SpellIconKey :spellId="13" keyDown="E"></SpellIconKey>
                <SpellIconKey :spellId="userSettings.isInvokeStarted ? secondSpellQueue : secondSpellQueue = 0" keyDown=""></SpellIconKey>
                <SpellIconKey :spellId="userSettings.isInvokeStarted ? firstSpellQueue : firstSpellQueue = 0" keyDown=""></SpellIconKey>
                <SpellIconKey :spellId="14" keyDown="R"></SpellIconKey>
            </div>
            
            <Timer></Timer>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { userSettings } from "../store/userSettings";
    import { survivalSettings } from "../store/survivalSettings";
    import SphereQueue from "./SphereQueue.vue";
    import MessageModule from "./MessageModule.vue";
    import Timer from './Timer.vue';
    import SpellIconKey from "./SpellIconKey.vue";
    import modeData from '../data/ModeData.json';
    import spellData from '../data/SpellData.json'
    import { MessageType } from '../models/MessageType';
    import { ModeType } from "../models/ModeType";
</script>

<script lang="ts">
    export default{
    data() {
        return {
            modeData: modeData,
            spellData: spellData,
            classicModeSpells: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            userSettings: userSettings,
            survivalSettings: survivalSettings,
            firstSphere: 'empty-sphere',
            secondSphere: 'empty-sphere',
            thirdSphere: 'empty-sphere',
            currentSpell: 0,
            firstSpellQueue: 0,
            secondSpellQueue: 0,
            correctSpells: 0,
            invalidSpells: 0
        };
    },
    watch: {
        userSettings: {
            handler(value) {
                if (!userSettings.isInvokeStarted) {
                    // Reset variables after Invoke ended
                    this.correctSpells = 0;
                    this.invalidSpells = 0;
                    this.currentSpell = 0;
                    this.firstSphere = 'empty-sphere';
                    this.secondSphere = 'empty-sphere';
                    this.thirdSphere = 'empty-sphere';
                }
                else {
                    this.initMode();
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
        initMode() {
            switch (userSettings.selectedMode.ModeType) {
                case ModeType.Classic: {
                    // Shuffle spell array after selecting it
                    this.classicModeSpells.sort(() => Math.random() - 0.5);
                    console.log(this.classicModeSpells)
                    break;
                }
                case ModeType.Survival: {
                    this.spellGenerator();
                    break;
                }
            }
        },
        sphereSet(sphere: string) {
            if (userSettings.isInvokeStarted) {
                this.thirdSphere = this.secondSphere;
                this.secondSphere = this.firstSphere;
                this.firstSphere = sphere;
            }
        },
        spellGenerator() {
            let generatedNumber = 0;
            let prevSpell = this.currentSpell
            
            do {
                generatedNumber = Math.floor(Math.random() * 10) + 1;
            } while (this.currentSpell == generatedNumber && this.currentSpell == prevSpell);

            this.currentSpell = generatedNumber;
        },
        checkSpell() {
            // Check empty spheres
            if (userSettings.isInvokeStarted && (this.firstSphere && this.secondSphere && this.thirdSphere) != 'empty-sphere') {
                let userSpheres = [this.firstSphere, this.secondSphere, this.thirdSphere];
                
                for (let i = 0; i < spellData.length; i++) {
                    // Sort current spheres array and parse to json, to check for a match
                    if (JSON.stringify(spellData[i].Combination.sort()) == JSON.stringify(userSpheres.sort())) {
                        if (this.firstSpellQueue != spellData[i].Id) {
                            this.secondSpellQueue = this.firstSpellQueue;
                            this.firstSpellQueue = spellData[i].Id;

                            switch (userSettings.selectedMode.ModeType) {
                                case ModeType.Classic: {
                                    if (spellData[i].Id == this.classicModeSpells[this.currentSpell]) {
                                        this.correctSpells++;
                                        this.currentSpell++;

                                        if (this.currentSpell == this.classicModeSpells.length) {
                                            // Complete Invoke, send variable to Timer.vue completeTimer() event
                                            userSettings.isInvokeComplete = true;
                                            userSettings.lastInvokeExecution = [this.correctSpells, this.invalidSpells];

                                            // Reset variables after Invoke ended
                                            this.correctSpells = 0;
                                            this.invalidSpells = 0;
                                            this.currentSpell = 0;
                                            this.firstSphere = 'empty-sphere';
                                            this.secondSphere = 'empty-sphere';
                                            this.thirdSphere = 'empty-sphere';
                                        }
                                    }
                                    else {
                                        this.invalidSpells++;
                                    }
                                    break;
                                }
                                case ModeType.Survival: {
                                    if (spellData[i].Id == this.currentSpell) {
                                        survivalSettings.invokedSpell = true;
                                        this.correctSpells++;
                                        userSettings.lastInvokeExecution = [this.correctSpells, this.invalidSpells];

                                        switch(survivalSettings.difficultyLvl) {
                                            case 1: {
                                                survivalSettings.maxInvokeTime = 5;
                                                if (this.correctSpells >= 14) {
                                                    survivalSettings.difficultyLvl++;
                                                }
                                                break;
                                            }
                                            case 2: {
                                                survivalSettings.maxInvokeTime = 4;
                                                if (this.correctSpells >= 29) {
                                                    survivalSettings.difficultyLvl++;
                                                }
                                                break;
                                            }
                                            case 3: {
                                                survivalSettings.maxInvokeTime = 3;
                                                if (this.correctSpells >= 44) {
                                                    survivalSettings.difficultyLvl++;
                                                }
                                                break;
                                            }
                                            case 4: {
                                                survivalSettings.maxInvokeTime = 2;
                                                break;
                                            }
                                            default: {
                                                survivalSettings.maxInvokeTime = 5;
                                            }
                                        }

                                        console.log('survivalSettings.difficultyLvl: ' + survivalSettings.difficultyLvl)
                                    }
                                    else {
                                        this.invalidSpells++;
                                    }
                                    break;
                                }
                            }
                        }
                        else {
                            this.firstSpellQueue = spellData[i].Id;
                        }
                    }
                }
            }
        }
    },
    components: { SphereQueue, MessageModule, SpellIconKey }
}
</script>
<template>
    <div class="flex flex-row items-center">
        <div v-if="isStarted" class="grow pr-2 rounded-lg">
            <p v-if="userSettings.selectedMode.ModeType == ModeType.Survival" class="bg-gradient-to-r from-green-600/25 to-emerald-600/50 border-2 border-green-600/25 rounded-lg p-1">{{format(elapsedTime)}}s / Level {{survivalSettings.difficultyLvl}}: {{survivalRemainingTime}}s</p>
            <p v-else class="bg-gradient-to-r from-green-600/25 to-emerald-600/50 border-2 border-emerald-500/50 rounded-lg p-1">{{format(elapsedTime)}}s</p>
        </div>

        <div v-else class="grow pr-2 rounded-lg">
            <p v-if="isCanceled" class="bg-gradient-to-r from-zinc-900 bg-zinc-900/50 border-2 border-zinc-800 rounded-lg p-2">Result:
                <code class="bg-rose-600/25 px-1">canceled</code> 
            </p>
            <p v-else class="bg-gradient-to-r from-zinc-900 bg-zinc-900/50 border-2 border-zinc-800 rounded-lg p-2">Result: 
                <code class="bg-zinc-600/50 px-1">{{format(userSettings.lastInvokeTime)}}s</code> <code class="bg-emerald-600/50 px-1">{{ userSettings.lastInvokeExecution[0] }}</code> /
                <code class="bg-rose-600/50 px-1">{{ userSettings.lastInvokeExecution[1] }}</code> /
                <code class="bg-zinc-600/50 px-1">{{ getExecutionPercent() }}</code>
            </p>
        </div>

        <button v-if="!isStarted" class="bg-zinc-900 py-2 rounded-lg shadow-md hover:bg-emerald-600/50 easy-out transition duration-300 flex px-6" @click="startTimer()">
            <PlayCircleIcon class="h-6 w-6 mr-1"></PlayCircleIcon>
            Click here or press 
            <code class="mx-1 bg-zinc-600/50 px-1">Enter</code> to start
        </button>
        
        <button v-else class="bg-zinc-900 py-2 rounded-lg shadow-md hover:bg-rose-600/50 easy-out transition duration-300 flex px-6" @click="stopTimer()">
            <StopCircleIcon class="h-6 w-6 mr-1"></StopCircleIcon>Cancel
        </button>
    </div>

    <div v-if="userSettings.selectedMode.ModeType == ModeType.Survival" class="survival-timer-bar mt-3">
        <div class="width-full bg-zinc-900 rounded-md border-4 border-zinc-800">
            <div :style="'width: ' + survivalRemainingTime / survivalMaxReminingTime * 100 + '%'" 
                 :class="(survivalRemainingTime / survivalMaxReminingTime * 100) >= 85 ? 'from-green-600 to-emerald-600 p-1'
                        :(survivalRemainingTime / survivalMaxReminingTime * 100) >= 50 ? 'from-orange-600 to-amber-600 p-1'
                        :'from-rose-600 to-red-600 py-1'"
                  class="bg-gradient-to-r transition-all duration-300 ease-in-out rounded-md">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { StopCircleIcon, PlayCircleIcon } from "@heroicons/vue/20/solid";
    import { userSettings } from "../store/userSettings";
    import { survivalSettings } from "../store/survivalSettings";
    import { ModeType } from "../models/ModeType";
</script>

<script lang="ts">  
    export default {
        data() {
            return {
                userSettings: userSettings,
                survivalSettings: survivalSettings,

                isStarted: false,
                isCanceled: false,
                startTime: 0,
                elapsedTime: 0,

                survivalRemainingTime: 0,
                survivalMaxReminingTime: survivalSettings.maxInvokeTime,
                survivalTimerId: 0,
                survivalLastInvokedSpells: 0
            };
        },
        
        watch: {
            elapsedTime: {
                handler(value) {
                    this.render();
                }
            },
            userSettings: {
                handler(value) {
                    if (userSettings.isInvokeComplete) {
                        this.completeTimer();
                    }
                },
                deep: true
            },
            survivalSettings: {
                handler(value) {
                    if (userSettings.isInvokeStarted && survivalSettings.invokedSpell) {
                        survivalSettings.invokedSpell = false;
                        this.survivalRemainingTime = survivalSettings.maxInvokeTime;
                        window.clearTimeout(this.survivalTimerId)
                    }
                },
                deep: true
            },
            survivalRemainingTime: {
                handler(value) {
                    //console.log(this.survivalRemainingTime)
                    this.renderSurvival();

                    if (this.survivalRemainingTime == 0) {
                        this.completeTimer();
                    }
                }
            }
        },
        created() {
            window.addEventListener('keydown', (event) => {
                if (event.code == 'Enter') {
                    if (!this.isStarted) { this.startTimer(); }
                    else { this.stopTimer(); }
                }
            });
        },
        methods: {
            getExecutionPercent() {
                if (userSettings.lastInvokeExecution[0] != 0 || userSettings.lastInvokeExecution[1] != 0) {
                    return (userSettings.lastInvokeExecution[0] / (userSettings.lastInvokeExecution[0] + userSettings.lastInvokeExecution[1]) * 100).toFixed(0) + '%';
                }
                else {
                    return '0%'
                }
            },
            startTimer() {
                if (userSettings.selectedMode.ModeType == ModeType.Survival) {
                    this.survivalRemainingTime = survivalSettings.maxInvokeTime;
                }

                userSettings.isInvokeStarted = true;
                this.isStarted = true;
                this.isCanceled = false;
                this.startTime = Date.now();
                this.render();
            },
            stopTimer() {
                if (userSettings.selectedMode.ModeType == ModeType.Survival) {
                    this.survivalRemainingTime = 0;
                    this.survivalMaxReminingTime = survivalSettings.maxInvokeTime;
                }

                userSettings.isInvokeComplete = false;
                userSettings.isInvokeStarted = false;
                this.isStarted = false;
                this.isCanceled = true;
                this.elapsedTime = 0;
            },
            completeTimer() {
                if (userSettings.selectedMode.ModeType == ModeType.Survival) {
                    this.survivalRemainingTime = 0;
                    this.survivalMaxReminingTime = survivalSettings.maxInvokeTime;
                    survivalSettings.isCompleted = true;
                }

                userSettings.isInvokeComplete = false;
                userSettings.isInvokeStarted = false;
                userSettings.lastInvokeTime = this.elapsedTime;
                this.isStarted = false;
                this.elapsedTime = 0;
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
            },
            render() {
                setTimeout(() => {
                    if (this.isStarted) {
                        this.elapsedTime = Date.now() - this.startTime;
                    }
                }, 10);
            },
            renderSurvival() {
                this.survivalTimerId = setTimeout(() => {
                    if (userSettings.isInvokeStarted) {
                        this.survivalRemainingTime--;
                    }
                }, 1000);
            }
        }
    }
</script>
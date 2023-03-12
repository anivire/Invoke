<script setup lang="ts">
    import { StopCircleIcon, PlayCircleIcon } from "@heroicons/vue/20/solid";
import { render } from "vue";
</script>

<script lang="ts">
    export default {
        data() {
            return {
                isStarted: false,
                lastTimerTime: 0,
                startTime: 0,
                elapsedTime: 0
            };
        },
        watch: {
            elapsedTime: {
                handler(value) {
                    if (this.isStarted) {
                        this.render();
                    }
                }
            }
        },
        methods: {
            startTimer() {
                this.isStarted = true;
                this.startTime = Date.now();
                this.render();
            },
            stopTimer() {
                this.isStarted = false;
                this.lastTimerTime = this.elapsedTime;
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

                return `${formattedMM}:${formattedSS}:${formattedMS}`;
            },
            render() {
                setTimeout(() => {
                    if (this.isStarted) {
                        this.elapsedTime = Date.now() - this.startTime;
                    }
                }, 10);
            }
        }
    }
</script>

<template>
    <div class="flex flex-row items-center">
        <div v-if="isStarted" class="grow pr-2 rounded-lg">
            <p class="bg-gradient-to-r from-green-600/25 to-emerald-600/50 border-2 border-green-600/25 rounded-lg p-1">{{format(elapsedTime)}}s</p>
        </div>
        <div v-else class="grow pr-2 rounded-lg">
            <p class="bg-gradient-to-r from-zinc-700/50 border-2 border-zinc-800 rounded-lg p-1">Last time: <code class="bg-zinc-600/50 px-1">{{format(lastTimerTime)}}s</code></p>
        </div>
        <button v-if="!isStarted" class="bg-zinc-800 py-2 rounded-lg shadow-md hover:bg-emerald-600/50 easy-out transition duration-300 flex px-6" @click="startTimer()"><PlayCircleIcon class="h-6 w-6 mr-1"></PlayCircleIcon>Click here or press <code class="mx-1 bg-zinc-600/50 px-1">Enter</code> to start</button>
        <button v-else class="bg-zinc-800 py-2 rounded-lg shadow-md hover:bg-rose-600/50 easy-out transition duration-300 flex px-6" @click="stopTimer()"><StopCircleIcon class="h-6 w-6 mr-1"></StopCircleIcon>Cancel</button>
    </div>
    
</template>
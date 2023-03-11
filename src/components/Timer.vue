<script setup lang="ts">
    import { StopCircleIcon, PlayCircleIcon } from "@heroicons/vue/20/solid";
</script>

<script lang="ts">
    export default {
        data() {
            return {
                timerTime: 0,
                isStarted: false,
                lastTimerTime: 0
            };
        },
        watch: {
            isStarted: {
                handler(value) {
                    if (value == true) {
                        this.timer();
                    }
                }
            },
            timerTime: {
                handler(value) {
                    if (this.isStarted) {
                        this.timer();
                    }
                }
            }
        },
        methods: {
            startTimer() {
                if (!this.isStarted) { 
                    this.timerTime = 0;
                    this.isStarted = true;
                }
            },
            stopTimer() {
                if (this.isStarted) { 
                    this.isStarted = false;
                    this.lastTimerTime = this.timerTime;
                }
            },
            timer() {
                setTimeout(() => {
                    if (this.isStarted) {
                        this.timerTime++;
                    }
                }, 10);
            }
        }
    }
</script>

<template>
    <div class="flex flex-row items-center">
        <div v-if="isStarted" class="grow pr-2 rounded-lg">
            <p class="bg-gradient-to-r from-green-600/25 to-emerald-600/50 border-2 border-green-600/25 rounded-lg p-1">{{timerTime / 100}}s</p>
        </div>
        <div v-else class="grow pr-2 rounded-lg">
            <p class="bg-gradient-to-r from-zinc-700/50 border-2 border-zinc-800 rounded-lg p-1">Last time: <code class="bg-zinc-600/50 px-1">{{lastTimerTime / 100}}s</code></p>
        </div>
        <button v-if="!isStarted" class="bg-zinc-800 py-2 rounded-lg shadow-md hover:bg-emerald-600/50 easy-out transition duration-300 flex px-6" @click="startTimer()"><PlayCircleIcon class="h-6 w-6 mr-1"></PlayCircleIcon>Click here or press <code class="mx-1 bg-zinc-600/50 px-1">Enter</code> to start</button>
        <button v-else class="bg-zinc-800 py-2 rounded-lg shadow-md hover:bg-rose-600/50 easy-out transition duration-300 flex px-6" @click="stopTimer()"><StopCircleIcon class="h-6 w-6 mr-1"></StopCircleIcon>Cancel</button>
    </div>
    
</template>
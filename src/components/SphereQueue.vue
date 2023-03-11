<script setup lang="ts">
    defineProps<{ firstSphere: string, secondSphere: string, thirdSphere: string }>()
</script>

<template>
    <img :class="(thirdSphere != 'empty-sphere')?'border-green-600':'border-zinc-600'" class="rounded-full border-4 w-16 h-16 bg-zinc-800" :src="thirdSphere + '.png'">
    <img :class="(secondSphere != 'empty-sphere')?'border-green-600':'border-zinc-600'" class="rounded-full border-4 w-16 h-16 bg-zinc-800" :src="secondSphere + '.png'">
    <img :class="(firstSphere != 'empty-sphere')?'border-green-600':'border-zinc-600'" class="rounded-full border-4 w-16 h-16 bg-zinc-800" :src="firstSphere + '.png'">
</template>
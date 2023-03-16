<template>
    <img :src="sphereTitle + '.png'" class="rounded-full w-8">
</template>

<script setup lang="ts">
    defineProps<{ sphereTitle: string }>()
</script>
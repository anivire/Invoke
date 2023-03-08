<script setup lang="ts">
    defineProps<{ sphereTitle: string }>()
</script>

<template>
    <img :src="sphereTitle + '.png'" :alt="sphereTitle" class="rounded-full w-8">
</template>
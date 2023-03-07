<script setup lang="ts">
    defineProps<{ title: string }>()
</script>

<template>
    <div class="title-module w-full flex pb-5">
        <h1 class="">{{title}}</h1>
    </div>
</template>
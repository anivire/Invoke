<template>
    <div class="title-module w-full grid justify-start justify-items-start pb-5">
        <h1>{{title}}</h1>
        <p>{{content}}</p>
    </div>
</template>

<script setup lang="ts">
    defineProps<{ title: string, content: string }>()
</script>
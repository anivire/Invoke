<script setup lang="ts">
    import SpellIcon from "./SpellIcon.vue";

    defineProps<{ title: string, spellsId: number[], avgCastTime: string, isSelected: boolean }>()
</script>

<template>
    <div class="hover:scale-105 transition ease-out">
        <div class="combo-info-container flex flex-nowrap pl-3 bg-gradient-to-r from-zinc-700/50 transition easy-out p-1 mb-2 rounded-lg">
            <p class="pr-5">{{title}}</p>
            <p class="pr-5">AVG cast time: <code>{{avgCastTime}}</code></p>
            <p>Your cast time: <code>n/a</code></p>
        </div>

        <div class=" bg-zinc-800 p-3 rounded-lg shadow-md mb-6 w-fit">
            <div class="spells-container flex flex-nowrap gap-2">
                <div v-for="id in spellsId">
                    <SpellIcon v-bind:spellId="id"></SpellIcon>
                </div>
            </div>
        </div>
    </div>
</template>
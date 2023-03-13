<script setup lang="ts">
    import spellData from '../data/SpellData.json'
    import SphereIcon from './SphereIcon.vue';
    defineProps<{ spellId: number }>()
</script>

<script lang="ts">
    export default{
        data() {
            return {
                active: false,
                spellData: spellData
            };
        },
    components: { SphereIcon }
}
</script>

<template>
    <div class="popover flex flex-col absolute gap-1 bg-zinc-900/75 backdrop-blur-md p-2 rounded-lg shadow-md">
        <p :class="(spellData[spellId].Id == 10)?'bg-gradient-to-r from-sky-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent':(spellData[spellId].Combination[1] == 'exort')?'text-amber-500':(spellData[spellId].Combination[1] == 'quas')?'text-sky-500':'text-fuchsia-500'">{{spellData[spellId].Title}}</p>
        <div v-if="spellData[spellId].Id != 0" class="px-4 flex flex-row">
            <div v-for="i in 3">
                <SphereIcon class="transition duration-300 opacity" :sphereTitle="spellData[spellId].Combination[i - 1]"></SphereIcon>
            </div>
        </div>
    </div>
</template>

<style>
    .popover {
        border: 1px solid rgba(255, 255, 255, 0.100);
    }
</style>
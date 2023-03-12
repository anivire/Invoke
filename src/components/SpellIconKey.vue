<script setup lang="ts">
    defineProps<{ spellId: number, keyDown: string }>()
</script>

<script lang="ts">
    import spellData from '../data/SpellData.json'
    import SpellPopup from './SpellPopup.vue';
    
    export default{
        data() {
            return {
                active: false,
                spellData: spellData
            };
    },
    components: { SpellPopup }
}
</script>

<template>
    <div class="relative ">
        <div class="absolute bg-zinc-800 px-2 text-sm m-1 shadow-lg rounded-md">
            <code class="">{{keyDown}}</code>
        </div>
        <img v-on:mouseenter="active = true"
        v-on:mouseleave="active = false"
        :src="spellData[spellId].Img + '.png'" :alt="spellData[spellId].Title" class="rounded-md w-16 h-16">
    </div>
</template>
<template>
    <img @mouseenter="active = true" @mouseleave="active = false" :src="spellData[spellId].Img + '.png'" class="rounded-lg transition ease-out hover:scale-105">
    <SpellPopover v-show="active" :spell-id="spellId"></SpellPopover>
</template>

<script setup lang="ts">
    import spellData from '../data/SpellData.json'
    import SpellPopover from './SpellPopover.vue';
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
    components: { SpellPopover }
}
</script>
<script setup lang="ts">
    defineProps<{ spellId: number }>()
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
    <img v-on:mouseenter="active = true"
    v-on:mouseleave="active = false"
    :src="spellData[spellId].Img + '.png'" :alt="spellData[spellId].Title" class="rounded-lg transition ease-out hover:scale-105">
    <div v-show="active">
        <SpellPopup :spell-id="spellId"></SpellPopup>
    </div>
</template>
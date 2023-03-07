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
    <div v-for="spell in spellData">
        <div v-if="spell.Id == spellId">
            <img v-on:mouseenter="active = true"
            v-on:mouseleave="active = false"
            v-bind:src="spell.Img + '.png'" v-bind:alt="spell.Title" class="rounded-lg transition ease-out hover:scale-105">
            <div v-show="active">
                <SpellPopup :spell-id="spell.Id"></SpellPopup>
            </div>
        </div>
    </div>
</template>
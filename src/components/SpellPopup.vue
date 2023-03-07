<script setup lang="ts">
    defineProps<{ spellId: number }>()
</script>

<script lang="ts">
    import spellData from '../data/SpellData.json'
import SphereIcon from './SphereIcon.vue';
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
    <div v-for="spell in spellData">
        <div v-if="spell.Id == spellId">
            <div class="popup flex flex-col absolute gap-1 bg-zinc-900 p-2 rounded-lg shadow-md">
                <p>{{spell.Title}}</p>
                <div class="px-4 flex flex-row">
                    <div v-for="i in 3">
                        <SphereIcon v-bind:sphereTitle="spell.Combination[i - 1]"></SphereIcon>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
    .popup {
        border: 1px solid rgba(255, 255, 255, 0.100);
    }
</style>
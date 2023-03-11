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
                <p class="bg-gradient-to-r from-sky-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent" v-if="spell.Id == 10">{{spell.Title}}</p>
                <p class="text-amber-500" v-else-if="spell.Combination[1] == 'exort'">{{spell.Title}}</p>
                <p class="text-sky-500" v-else-if="spell.Combination[1] == 'quas'">{{spell.Title}}</p>
                <p class="text-fuchsia-500" v-else-if="spell.Combination[1] == 'wex'">{{spell.Title}}</p>
                <p v-else>{{spell.Title}}</p>
                <div v-if="spell.Id != 0" class="px-4 flex flex-row">
                    <div v-for="i in 3">
                        <SphereIcon :sphereTitle="spell.Combination[i - 1]"></SphereIcon>
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
<script setup lang="ts">
  import Combo from './components/Combo.vue'
  import Queue from './components/SpellQueue.vue';
  import TitleModule from './components/TitleModule.vue';
</script>

<script lang="ts">
    import comboData from './data/ComboData.json'
    export default{
        data() {
            return {
              comboData: comboData,
            };
        },
    }
</script>

<template>
  <TitleModule title="Invoke Combo" content="Click to select Invoker prokast-combo to try it yourself."></TitleModule>
  <Combo></Combo>
  <Queue></Queue>
</template>

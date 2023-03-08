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
  <TitleModule title="Invoke Combo" content="Select Invoker prokast-combo to try it yourself."></TitleModule>
  <Combo></Combo>
  <Queue></Queue>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

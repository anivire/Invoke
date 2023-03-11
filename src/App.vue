<script setup lang="ts">
  import Combo from './components/Combo.vue'
  import Queue from './components/SpellQueue.vue';
  import Timer from './components/Timer.vue';
  import TitleModule from './components/TitleModule.vue';
</script>

<template>
  <div class="text-zinc-200">
    <TitleModule title="Invoke Combo" content="Click to select Invoker prokast-combo to try it yourself."></TitleModule>
    <Combo></Combo>
    <Queue></Queue>
    <Timer></Timer>
  </div>
  
</template>

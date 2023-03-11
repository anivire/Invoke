<script setup lang="ts">
  import Combo from './components/Combo.vue'
  import Queue from './components/SpellQueue.vue';
  import TitleModule from './components/TitleModule.vue';
</script>

<template>
  <div class="text-zinc-200 max-w-3xl">
    <TitleModule title="Select Combo" content="Click to select Invoker prokast-combo to try it yourself."></TitleModule>
    <Combo></Combo>
  
    <!-- <TitleModule title="Invoke" content="Invoke selected combo quickly as possible!"></TitleModule> -->
    <Queue></Queue>
  </div>
  
</template>

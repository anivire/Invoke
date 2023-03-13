<script setup lang="ts">
  import Combo from './components/Combo.vue'
  import ModeInfo from './components/ModeInfo.vue';
  import Queue from './components/SpellQueue.vue';
  import TitleModule from './components/TitleModule.vue';
</script>

<template>
  <div class="text-zinc-200 max-w-3xl w-screen">
    <TitleModule title="Invoke" content="Invoke selected combo quickly as possible!"></TitleModule>
    <Queue></Queue>

    <TitleModule title="Select Combo" content="Click to select mode to try it yourself."></TitleModule>
    <ModeInfo :mode-id="0"></ModeInfo>
    <ModeInfo :mode-id="1"></ModeInfo>
    <!-- <Combo></Combo> -->
  </div>
  
</template>

<script setup lang="ts">
  import Combo from './components/Combo.vue'
  import ModeInfo from './components/ModeInfo.vue';
  import Queue from './components/SpellQueue.vue';
  import SpellVitrine from './components/SpellVitrine.vue';
  import TitleModule from './components/TitleModule.vue';
  import { ModeType } from './models/ModeType';
</script>

<template>
  <div class="text-zinc-200">
    <TitleModule title="Spells" content="If you forgot one of them..."></TitleModule>
    <SpellVitrine></SpellVitrine>

    <TitleModule title="Invoke" content="Invoke selected combo quickly as possible!"></TitleModule>
    <Queue></Queue>

    <TitleModule title="Select mode" content="Click to select mode to try it yourself."></TitleModule>
    <ModeInfo :modeType="ModeType.Classic"></ModeInfo>
    <ModeInfo :modeType="ModeType.Survival"></ModeInfo>
    <!-- <Combo></Combo> -->
  </div>
  
</template>

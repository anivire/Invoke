<script setup lang="ts">
  import ModeInfo from './components/ModeInfo.vue';
  import Queue from './components/SpellQueue.vue';
  import Footer from './components/Footer.vue';
  import SpellVitrine from './components/SpellVitrine.vue';
  import TitleModule from './components/TitleModule.vue';
  import { ModeType } from './models/ModeType';
</script>

<template>
  <div class="text-zinc-200 p-5 m-auto max-w-3xl min-h-screen flex flex-col">
    <TitleModule title="Select mode" content="Click to select mode to try it yourself."></TitleModule>
    <ModeInfo :modeType="ModeType.Classic"></ModeInfo>
    <ModeInfo :modeType="ModeType.Survival"></ModeInfo>

    <TitleModule title="Invoke" content="Invoke selected combo quickly as possible!"></TitleModule>
    <Queue></Queue>

    <TitleModule title="Spells" content="If you forgot one of them..."></TitleModule>
    <SpellVitrine></SpellVitrine>
  </div>

  <Footer class="text-zinc-200"></Footer>
</template>

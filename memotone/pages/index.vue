<template>
<div class="index">
  <app-header />
  <main>
    <note-visualizer
      v-if="false"
      :pitch="0"
      :activeNote="0"
      :isPlaying="false"
      :isRecording="false"
    />

    <onboarding />

    <app-navigation />
  </main>
</div>
</template>

<script>
import appHeader from '../components/app-header'
import appNavigation from '../components/app-navigation'
import noteVisualizer from '../components/note-visualizer'
import onboarding from '../components/onboarding'

export default {
  components: {
    appHeader,
    appNavigation,
    onboarding,
    noteVisualizer,
  },
}
</script>

<style>

</style>

<template>
<div class="index">
  <header>
    <app-logo />
  </header>
  <main>
    <note-visualizer
      v-if="false"
      :pitch="0"
      :activeNote="0"
      :isPlaying="false"
      :isRecording="false"
    />

    <onboarding />

    <record-button />

    <nuxt-link to="/archief">Archief</nuxt-link>
  </main>
</div>
</template>

<script>
import recordButton from '../components/record-button'
import appLogo from '../components/app-logo'
import noteVisualizer from '../components/note-visualizer'
import onboarding from '../components/onboarding'

export default {
  components: {
    recordButton,
    appLogo,
    onboarding,
    noteVisualizer,
  },
}
</script>

<style>

</style>

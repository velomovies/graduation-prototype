<template>
<div class="index">
  <app-header :page="'/music'" />
  <main>
    <page-title
      :title="'Jouw eigen muziek'"
    >
      Je hebt nog niets opgenomen
    </page-title>
    <onboarding />
  </main>
  <transition name="fade">
    <speech-bubble @clicked="() => this.showHelp = false" v-if="showHelp">
      Druk hier om je eerste opname te starten!
    </speech-bubble>
  </transition>
  <app-navigation />
</div>
</template>

<script>
import appHeader from '../components/app-header'
import appNavigation from '../components/app-navigation'
import onboarding from '../components/onboarding'
import pageTitle from '../components/page-title'
import speechBubble from '../components/speech-bubble'

export default {
  components: {
    appHeader,
    appNavigation,
    onboarding,
    pageTitle,
    speechBubble,
  },
  data () {
    return {
      showHelp: false,
    }
  },
  mounted () {
    setTimeout(() => {
      this.showHelp = true
    }, 2500)
  },
}
</script>

<style>

</style>

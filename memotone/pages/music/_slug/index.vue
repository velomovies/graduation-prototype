<template>
  <div
    class="detail"
  >
    <app-header
      isBack
      :page="`/music/`"
    />
    <app-share @toggleShare="(data) => this.showShare = data"/>
    <main class="detail__main">
      <settings-tab
        @toggleEdit="(data) => this.showSettings = data"
        :title="getSlug($route.params.slug)"
      />
      <music-bars />
    </main>
    <play-controls
      @shareClicked="() => this.showShare = true"
      @settingsClicked="() => this.showSettings = true"
    />
    <transition name="fade">
      <div v-if="showSettings || showShare" class="settings__underlay"></div>
    </transition>
  </div>
</template>

<script>
import appHeader from '../../../components/app-header'
import appShare from '../../../components/app-share'
import playControls from '../../../components/play-controls'
import settingsTab from '../../../components/settings-tab'
import musicBars from '../../../components/music-bars'

export default {
  components: {
    appHeader,
    appShare,
    playControls,
    settingsTab,
    musicBars,
  },
  data () {
    return {
      showShare: false,
      showSettings: false,
    }
  },
  methods: {
    getSlug(string) {
      string = string.replace(/-/g,' ')
      string = string.charAt(0).toUpperCase() + string.slice(1)
      return string
    },
  },
}
</script>

<style>
  .detail {
    min-height: 100vh;
    background: var(--white);
  }

  .settings__underlay {
    position: fixed;
    background: #33333333;
    width: 100vw;
    height: 100vh;
    top: 0;
  }
</style>


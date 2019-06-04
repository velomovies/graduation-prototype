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
        @changeNotes="transposeNotes"
        :title="getSlug($route.params.slug)"
      />
      <music-bars
        :transpose="transposeNumber"
        :play="musicPlaying"
      />
    </main>
    <transition name="fade">
      <speech-bubble
        @clicked="() => this.showHelp = false"
        v-if="showHelp"
        isDark
      >
        Druk hier om je eigen muziek af te spelen!
      </speech-bubble>
    </transition>
    <play-controls
      @toggleMusic="toggleMusic"
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
import speechBubble from '../../../components/speech-bubble'

export default {
  components: {
    appHeader,
    appShare,
    playControls,
    settingsTab,
    musicBars,
    speechBubble,
  },
  data () {
    return {
      showShare: false,
      showSettings: false,
      transposeNumber: 0,
      showHelp: false,
      showHelpTimeout: null,
      musicPlaying: false,
    }
  },
  mounted () {
    this.showHelpTimeout = setTimeout(() => {
      this.showHelp = true
    }, 2500)
  },
  methods: {
    getSlug(string) {
      string = string.replace(/-/g,' ')
      string = string.charAt(0).toUpperCase() + string.slice(1)
      return string
    },
    transposeNotes (data) {
      if (data == 0 || data == -1 || data == 1) {
        this.transposeNumber = 0
      } else if (data == 2) {
        this.transposeNumber = 5.5
      } else if (data == 3) {
        this.transposeNumber = 11
      } else if (data == 4) {
        this.transposeNumber = 0
      } else if (data == 5) {
        this.transposeNumber = -18
      } else if (data == 6) {
        this.transposeNumber = -11
      } else if (data == 7) {
        this.transposeNumber = -6.5
      }
    },
    toggleMusic (data) {
      this.musicPlaying = data
      clearTimeout(this.showHelpTimeout)
      this.showHelp = false
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


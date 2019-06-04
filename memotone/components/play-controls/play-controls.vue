<template>
  <nav class="play-controls">
    <app-button
      isPlay
      @toggleMusic="toggleMusic"
    />
  </nav>
</template>

<script>
import appButton from '../app-button'

export default {
  components: {
    appButton,
  },
  data () {
    return {
      musicAudio: null,
    }
  },
  methods: {
    toggleMusic (data)  {
      if (data) {
        this.musicAudio = new Audio('/sound/whistling3.ogg')
        this.musicAudio.play()
      } else {
        this.musicAudio.pause()
        this.musicAudio.currentTime = 0
      }
      this.$emit('toggleMusic', data)
    },
  },
}
</script>

<style>
  .play-controls {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .play-controls__link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    color: var(--black);
  }

  .play-controls__link-icon {
    margin-bottom: .35rem;
  }
</style>

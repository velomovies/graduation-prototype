<template>
  <nav class="play-controls">
    <button
      @click="e => this.openSettings = true"
      class="play-controls__link small-text"
    >
      <settings-icon class="play-controls__link-icon" />
      Instellingen
    </button>
    <app-button
      isPlay
    />
    <button
      to="/music"
      class="play-controls__link small-text"
    >
      <share-icon class="play-controls__link-icon" />
      Delen
    </button>
  </nav>
</template>

<script>
import settingsIcon from '../../static/images/icons/sliders.svg'
import shareIcon from '../../static/images/icons/share.svg'
import appButton from '../app-button'

export default {
  components: {
    appButton,
    settingsIcon,
    shareIcon,
  },
  data () {
    return {
      openSettings: false,
    }
  },
}
</script>

<style>
  .play-controls {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: var(--white);
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

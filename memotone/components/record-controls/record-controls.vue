<template>
  <nav class="record-controls">
    <button
      @click="e => $emit('toggleAudio', e)"
      class="record-controls__link small-text"
      :class="{ 'record-controls__link--inactive' : !audioFile }"
    >
      <play-icon v-if="!isPlaying" class="record-controls__link-icon" />
      <pause-icon v-if="isPlaying" class="record-controls__link-icon" />
      Afspelen
    </button>
    <record-button
      @toggleRecord="e => $emit('toggleRecord', e)"
      :isListening="isListening"
      isRecord
    />
    <nuxt-link
      to="/music"
      class="record-controls__link small-text"
      :class="{ 'record-controls__link--inactive' : !audioFile }"
    >
      <save-icon class="record-controls__link-icon" />
      Opslaan
    </nuxt-link>
  </nav>
</template>

<script>
import playIcon from '../../static/images/icons/play.svg'
import pauseIcon from '../../static/images/icons/pause.svg'
import saveIcon from '../../static/images/icons/save.svg'
import recordButton from '../record-button'

export default {
  components: {
    recordButton,
    playIcon,
    pauseIcon,
    saveIcon,
  },
  props: {
    isListening: {
      type: Boolean,
      default: true,
    },
    audioFile: {
      type: String,
      default: null,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
  .record-controls {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: var(--white);
    display: flex;
    justify-content: space-around;
  }

  .record-controls__link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    color: var(--black);
  }

  .record-controls__link--inactive {
    pointer-events: none;
    opacity: .5;
  }

  .record-controls__link.nuxt-link-exact-active {
    color: var(--theme-color);
  }

  .record-controls__link-icon {
    margin-bottom: .35rem;
  }
</style>

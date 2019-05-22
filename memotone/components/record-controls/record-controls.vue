<template>
  <section class="record-controls">
    <button
      class="record-controls__audio"
      :class="{ 'record-controls__audio--active' : !isListening && audioFile }"
      @click="e => $emit('toggleAudio', e)"
    >
      <play-icon  v-if="!isPlaying" class="record-controls__play-icon"/>
      <pause-icon v-if="isPlaying" class="record-controls__pause-icon"/>
    </button>

    <pause-button
      class="record-controls__pause"
      :isListening="isListening"
      @toggleInput="e => $emit('toggleInput', e)"
    />

    <nuxt-link class="record-controls__save" to="/archief/opgenomen/opname-1">Opslaan</nuxt-link>
  </section>
</template>

<script>
import pauseButton from '../pause-button'
import playIcon from '../../static/images/icons/play.svg'
import pauseIcon from '../../static/images/icons/pause.svg'

export default {
  components: {
    pauseButton,
    playIcon,
    pauseIcon,
  },
  props: {
    isListening: {
      type: Boolean,
      default: false,
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
    position: absolute;
    width: 100%;
    bottom: 10vh;
    text-align: center;
  }

  .record-controls__audio {
    position: absolute;
    left: 1rem;
    opacity: .6;
  }

  .record-controls__audio--active {
    opacity: 1;
  }

  .record-controls__play-icon path {
    fill: var(--black);
  }

  .record-controls__pause-icon path {
    fill: var(--black);
  }

  .record-controls__save {
    position: absolute;
    color: var(--black);
  }
</style>


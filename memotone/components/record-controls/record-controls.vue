<template>
  <nav class="record-controls__container">
    <div class="record-controls">
      <button
        @click="e => $emit('toggleAudio', e)"
        class="record-controls__link"
        v-if="audioFile"
      >
        <play-icon v-if="!isPlaying" class="record-controls__link-icon" />
        <pause-icon v-if="isPlaying" class="record-controls__link-icon" />
        <p class="a11y-sr-only">Afspelen</p>
      </button>
      <app-button
        @toggleRecord="e => $emit('toggleRecord', e)"
        :isListening="isListening"
        isRecord
      />
      <nuxt-link
        to="/music/muziekopname"
        class="record-controls__link"
        v-if="audioFile"
      >
        <save-icon class="record-controls__link-icon" />
        <p class="a11y-sr-only">Opslaan</p>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import playIcon from '../../static/images/icons/play.svg'
import pauseIcon from '../../static/images/icons/pause.svg'
import saveIcon from '../../static/images/icons/save.svg'
import appButton from '../app-button'

export default {
  components: {
    appButton,
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
  .record-controls__container {
    position: fixed;
    bottom: 1rem;
    width: 100%;
    height: 5.5rem;
  }

  .record-controls {
    max-width: var(--app-width);
    padding: 0 1rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 25rem) {
    .record-controls {
      padding: 0 2rem;
    }
  }

  .record-controls__link {
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    border-radius: 50%;
    background: var(--gray);
    padding: 1rem;
    color: var(--black);
    box-shadow: var(--box-shadow);
  }

  .record-controls__link--inactive {
    pointer-events: none;
    opacity: .5;
  }

  .record-controls__link.nuxt-link-exact-active {
    color: var(--theme-color);
  }

  .record-controls__link-icon {
    width: 1.5rem;
    height: 1.5rem;
    stroke-width: 1;
  }
</style>

<template>
  <div class="app-button__container">
    <nuxt-link
      v-if="!isListening && !isRecord && !isPlay"
      class="app-button app-button__to-record"
      to="/record"
    >
      <div
        class="app-button__button-container"
      >
        <div
          class="app-button__button"
          :class="{ 'app-button__button--error' : errorMessage }"
        >
          <p
            class="a11y-sr-only"
          >
            {{ buttonText }}
          </p>
        </div>
      </div>
    </nuxt-link>

    <div
      v-if="isRecord"
      class="app-button__button-container"
      :class="{
        'app-button__button-container--oval' : !isListening && isRecord,
        'app-button__button-container--record' : isRecord,
      }"
    >
      <record-pause-button
        @toggleRecord="e => $emit('toggleRecord', e)"
        :isListening="isListening"
      />
    </div>

    <div v-if="isPlay" class="app-button">
      <button
        @click="e => { this.isPlaying = !this.isPlaying }"
        class="app-button__button-container app-button__button-container--play"
      >
        <div
          class="app-button__button app-button__button--play"
          :class="{ 'app-button__button--isPlaying' : isPlaying }"
        >
          <playIcon v-if="!isPlaying" class="app-button__button-icon app-button__button-icon--play" />
          <pauseIcon v-if="isPlaying" class="app-button__button-icon app-button__button-icon--isPlaying" />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import pauseIcon from '../../static/images/icons/pause.svg'
import playIcon from '../../static/images/icons/play.svg'

import recordPauseButton from '../record-pause-button'

export default {
  props: {
    micOff: {
      type: Boolean,
      default: false,
    },
    isListening: {
      type: Boolean,
      default: false,
    },
    isRecord: {
      type: Boolean,
      default: false,
    },
    isPlay: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    recordPauseButton,
    pauseIcon,
    playIcon,
  },
  data() {
    return {
      errorMessage: false,
      isPlaying: false,
    }
  },
  mounted() {
    this.checkPermissions()
  },
  methods: {
    checkPermissions () {
      if(navigator.permissions) {
        navigator.permissions.query({name: 'microphone'})
          .then(permissionStatus => {
            if (permissionStatus.state === 'denied') {
              this.errorMessage = true
            } else {
              this.errorMessage = false
            }
          })
      }
    },
  },
  computed: {
    buttonText: function () {
      return this.errorMessage ? 'Kan niet opnemen' : 'Opnemen'
    },
  },
}
</script>

<style>
  .app-button__button-container {
    position: absolute;
    left: 50%;
    transform: translateY(-90%) translateX(-50%);
    height: 7.75rem;
    width: 7.75rem;
    border-radius: 50%;
    transition: all .3s;
  }

  .app-button__button {
    box-shadow: var(--box-shadow);
  }

  .app-button__button-container--play {
    height: 6.5rem;
    width: 6.5rem;
  }

  .app-button__button-container--record {
    transform: translateY(0) translateX(-50%);
  }

  .app-button__button {
    position: absolute;
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
    border: .75rem solid var(--record-color-half);
    background: var(--record-color);
    left: 50%;
    transform: translateX(-50%);
    transition: all .3s;
  }

  .app-button__button--play {
    height: 5rem;
    width: 5rem;
    border: none;
    transform: translateY(-80%) translateX(-50%);
  }

  .app-button__button--isPlaying {
    background: var(--record-color-half);
  }

  .app-button__button--error {
    opacity: .5;
  }

  .app-button__button-icon {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    stroke-width: 1;
    color: var(--white);
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  .app-button__button-container--play:hover {
    color: var(--white);
  }

  .app-button__button-icon--play {
    transform: translateY(-50%) translateX(-40%);
  }

  .app-button__button-icon--isPlaying {
    color: var(--white);
  }

  .app-button__button-text {
    position: absolute;
    bottom: -.2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (min-width: 25rem) {
  .app-button__button-text {
    bottom: -.4rem;
  }
}
</style>


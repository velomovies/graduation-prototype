<template>
  <button
    class="pause-button"
    @click="e => $emit('toggleInput', e)"
  >
    <div
      class="pause-button__button"
      :class="{
        'pause-button__button--pause' : isListening,
        'pause-button__button--resume' : !isListening
      }"
    >
      <pause class="pause-button__icon" v-if="isListening"/>
      <p class="pause-button__text">Hervat</p>
      <p
        class="a11y-sr-only"
        v-if="isListening"
      >
        Pause
      </p>
    </div>
  </button>
</template>

<script>
import pause from '../../static/images/icons/pause.svg'

export default {
  components: {
    pause,
  },
  props: {
    isListening: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style>
  .pause-button {
    position: relative;
    border: none;
    background: none;
  }

  .pause-button:hover,
  .pause-button:focus {
    background: none;
    outline: none;
  }

  .pause-button__button {
    height: 3.5rem;
    transition: all .3s;
  }

  .pause-button__button--pause {
    border: .1rem solid transparent;
    width: 3.5rem;
    border-radius: 50%;
    transition: all .3s;
  }

  .pause-button__button--pause::after,
  .pause-button__button--pause::before {
    content: '';
    position: absolute;
    background: var(--theme-color);
    opacity: .6;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(.75);
    animation: pulsating ease infinite;
    border-radius: 50%;
  }

  .pause-button__button--pause::before {
    height: 4.5rem;
    width: 4.5rem;
    animation-duration: 2s;
  }

  .pause-button__button--pause::after {
    height: 3.5rem;
    width: 3.5rem;
    animation-duration: 1.5s;
    animation-delay: .5s;
  }

  .pause-button__button--pause,
  .pause-button__button--pause::after,
  .pause-button__button---pause::before {
    background: var(--theme-color);
  }

  .pause-button__button--resume {
    border: .1rem solid var(--theme-color);
    width: 7rem;
    transition: all .3s;
    border-radius: 5rem;
  }


  .pause-button__text {
    position: absolute;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-size: 1.25rem;
    color: var(--theme-color);
  }

  .pause-button__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: var(--z-index-low);
  }

  .pause-button__icon path {
    fill: var(--gray);
  }

  @keyframes pulsating {
    0% {
      transform: translateY(-50%) translateX(-50%) scale(.75);
    }
    50%{
      transform: translateY(-50%) translateX(-50%) scale(1.3);
    }
    100%{
      transform: translateY(-50%) translateX(-50%) scale(.75);
    }
  }
</style>


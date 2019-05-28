<template>
  <button
    class="record-pause-button"
    @click="e => $emit('toggleRecord', e)"
  >
    <div
      class="record-pause-button__button"
      :class="{
        'record-pause-button__button--pause' : isListening,
        'record-pause-button__button--resume' : !isListening
      }"
    >
      <pause class="record-pause-button__icon" v-if="isListening"/>
      <p class="record-pause-button__text">Hervat</p>
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
      default: true,
    },
  },
}
</script>

<style>
  .record-pause-button {
    position: absolute;
    border: none;
    background: none;
    cursor: pointer;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  .record-pause-button:hover,
  .record-pause-button:focus {
    background: none;
    outline: none;
  }

  .record-pause-button__button--pause {
    height: 5.5rem;
    width: 5.5rem;
    border-radius: 50%;
    /* border: .625rem solid var(--record-color-half); */
    background: var(--record-color);
    transition: all .3s;
  }

  .record-pause-button__icon {
    position: absolute;
    height: 3.75rem;
    width: 2.25rem;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    color: var(--white);
    opacity: 0;
    transition: all .3s;
  }

  .record-pause-button__button--pause .record-pause-button__icon {
    opacity: 1;
  }

  .record-pause-button__button--pause::after,
  .record-pause-button__button--pause::before {
    content: '';
    position: absolute;
    background: var(--record-color);
    opacity: .5;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(.75);
    animation: pulsating ease infinite;
    border-radius: 50%;
    z-index: -1;
    transition: all .3s;
  }

  .record-pause-button__button--pause::before {
    height: 6.5rem;
    width: 6.5rem;
    animation-duration: 2s;
  }

  .record-pause-button__button--pause::after {
    height: 5rem;
    width: 5rem;
    animation-duration: 1.5s;
    animation-delay: .5s;
  }

  .record-pause-button__button--resume {
    position: relative;
    border: .1rem solid var(--record-color);
    height: 5.5rem;
    width: 9rem;
    margin-top: .5rem;
    border-radius: 5rem;
    transition: all .3s;
  }

  .record-pause-button__text {
    position: absolute;
    margin: 0 auto;
    text-transform: uppercase;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    color: var(--record-color);
    font-size: var(--font-size-small);
    opacity: 0;
    transition: all .3s;
  }

  .record-pause-button__button--resume .record-pause-button__text {
    opacity: 1;
  }

  @keyframes pulsating {
    0% {
      transform: translateY(-50%) translateX(-50%) scale(1);
    }
    50%{
      transform: translateY(-50%) translateX(-50%) scale(1.5);
    }
    100%{
      transform: translateY(-50%) translateX(-50%) scale(1);
    }
  }
</style>


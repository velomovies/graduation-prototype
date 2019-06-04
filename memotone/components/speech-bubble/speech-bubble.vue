<template>
<!-- Created with help of https://auralinna.blog/post/2017/how-to-make-a-css-speech-bubble-with-borders-and-drop-shadow  -->
  <div
    @click="(e) => this.$emit('clicked', e)"
    class="speech-bubble"
    :class="{ 'speech-bubble--dark' : isDark }"
  >
    <slot></slot>
    <div
      class="speech-bubble__arrow"
      :class="{ 'speech-bubble__arrow--dark' : isDark }"
    >
    </div>
</div>
</template>

<script>
export default {
  props: {
    isDark: {
      type: Boolean,
      default: false,
    },
  },
}
</script>


<style>
  .speech-bubble {
    bottom: 8.5rem;
    background: var(--white);
    border-radius: .5rem;
    box-shadow: var(--box-shadow);
    margin: 0 auto;
    width: 80%;
    max-width: 15rem;
    padding: 1rem 1.5rem;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  }

  .speech-bubble--dark {
    background: var(--gray);
  }

  .speech-bubble__arrow {
    position: absolute;
    right: 30%;
    width: 0;
    height: 0;
    bottom: -1rem;
    border-left: 0 solid transparent;
    border-right: 1rem solid transparent;
    border-top: 1rem solid var(--white);
    filter: drop-shadow(var(--box-shadow));
  }

  .speech-bubble__arrow--dark {
    border-top: 1rem solid var(--gray);
  }
</style>


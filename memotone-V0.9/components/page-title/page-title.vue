<template>
  <section class="page-title">
    <div v-if="withImage" class="page-title__image">
      <music-icon class="page-title__image-icon" />
    </div>
    <h1
      class="page-title__h1"
      :class="{
        'page-title__h1--up' : uppercase,
        'page-title__h1--small' : isSmall,
      }"
    >
      <slot></slot>
    </h1>
  </section>
</template>

<script>
import musicIcon from '../../static/images/icons/music.svg'

export default {
  components: {
    musicIcon,
  },
  props: {
    uppercase: {
      type: Boolean,
      default: false,
    },
    withImage: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
}
</script>


<style>
  .page-title {
    margin: 2rem 2rem 1.5rem 2rem;
    display: flex;
    align-items: center;
  }

  .page-title__image {
    width: 3rem;
    height: 3rem;
    background: var(--record-color-half);
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }

  .page-title__image-icon {
    width: 2rem;
    height: 2rem;
  }

  .page-title__h1 {
    text-transform: capitalize;
  }

  .page-title__h1--up {
    text-transform: uppercase;
  }

  .page-title__h1--small {
    font-size: var(--font-size);
  }
</style>


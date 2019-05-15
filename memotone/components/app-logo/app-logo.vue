<template>
  <nuxt-link class="logo" :to="page">
    <logo v-if="!isBack" class="logo__icon"/>
    <p
      class="logo__text"
      :class="{ 'logo__text--lite' : isLite }"
      v-if="isBack"
    >
      <back
        class="logo__back-icon"
        :class="{ 'logo__back-icon--lite' : isLite }"
      />
      Terug
    </p>

    <p class="a11y-sr-only" v-if="!isBack">Home</p>
  </nuxt-link>
</template>

<script>
import logo from '../../static/images/icons/logo.svg'
import back from '../../static/images/icons/play.svg'

export default {
  components: {
    logo,
    back,
  },
  props: {
    isBack: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: '/',
    },
    isLite: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
  .logo {
    padding: 1rem;
    display: block;
  }

  .logo__icon {
    height: 4rem;
    width: 4rem;
  }

  .logo__text--lite {
    color: var(--gray);
  }

  .logo__back-icon {
    transform: rotate(180deg) translateY(-.05rem);
    height: .8rem;
    width: 1rem;
    margin-right: -.25rem;
  }

  .logo__back-icon path {
    fill: var(--black);
  }

  .logo__back-icon--lite path {
    fill: var(--gray);
  }
</style>


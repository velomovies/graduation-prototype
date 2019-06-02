<template>
    <section class="settings-tab__article">
      <button
        class="settings-tab__back"
        @click="e => this.$emit('close', e)"
      >
          <back-logo
            class="settings-tab__back-icon"
          />
          Terug
      </button>
      <button @click="e => this.$emit('close', e)" class="settings-tab__article-link">
        Opslaan
      </button>
    </section>
</template>

<script>
import backLogo from '../../static/images/icons/arrow-left.svg'

export default {
  components: {
    backLogo,
  },
}
</script>

<style>
  .settings-tab__article {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 90%;
    padding: 2rem;
    background: var(--white);
    text-align: center;
    z-index: var(--z-index-overlay);
  }

  @media (min-width: 30rem) {
    .settings-tab__article {
      width: 70%;
    }
  }

  @media (min-width: 30rem) {
    .settings-tab__article {
      width: 50%;
    }
  }

  .settings-tab__back {
    text-align: left;
    margin-bottom: 1rem;
    font-size: var(--font-size-small);
  }

  .settings-tab__article-text-link {
    color: var(--record-color);
    text-decoration: underline;
  }

  .settings-tab__article-link {
    color: var(--theme-color);
    font-size: var(--font-size);
  }

  .settings-tab__back-icon {
    transform: translate(.25rem, .175rem);
    height: 1rem;
    width: 1rem;
    transition: transform .3s;
  }

  .settings-tab__back:hover,
  .settings-tab__back:focus {
    background: var(--white);
    color: var(--record-color);
  }

  .settings-tab__back:hover .settings-tab__back-icon,
  .settings-tab__back:focus .settings-tab__back-icon {
    transform: translate(0, .175rem);
  }
</style>

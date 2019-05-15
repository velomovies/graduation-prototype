<template>
  <nuxt-link class="app-button" to="/record">
    <div class="app-button__button app-button__button--record">
      <p
        class="a11y-sr-only"
      >
        Opnemen
      </p>
    </div>
  </nuxt-link>
</template>

<style>
  .app-button {
    position: absolute;
    bottom: 10vh;
    left: 50%;
    transform: translateX(-50%);
  }

  .app-button__button {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }

  .app-button__button::after,
  .app-button__button::before {
    content: '';
    position: absolute;
    background: var(--theme-color);
    opacity: .6;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: 50%;
  }

  .app-button__button::before {
    height: 5rem;
    width: 5rem;
  }

  .app-button__button::after {
    height: 3.75rem;
    width: 3.75rem;
  }

  .app-button__button--record,
  .app-button__button--record::after,
  .app-button__button--record::before {
    background: var(--theme-color);
  }

</style>


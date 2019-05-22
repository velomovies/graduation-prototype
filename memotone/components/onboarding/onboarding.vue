<template>
  <section class="onboarding">
    <article class="onboarding__article">
      <p>Neem jouw muziek op</p>
      <p>[Plaatje]</p>
    </article>
    <article class="onboarding__article">
      <p>Bekijk en luister de muziek</p>
      <p>[Plaatje]</p>
    </article>
    <article class="onboarding__article">
      <p>Deel het met anderen</p>
      <p>[Plaatje]</p>
    </article>
  </section>
</template>

<style>
  .onboarding {
    display: flex;
    overflow-x: auto;
    width: 100%;
    padding: 0 1rem;
  }
  .onboarding__article {
    background: var(--white);
    height: 50vh;
    width: 100%;
    min-width: 16rem;
    margin-right: 1rem;
    padding: 1rem;
    text-align: center;
  }
</style>

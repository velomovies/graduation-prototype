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
    padding: 0 2rem;
  }

  .onboarding__article {
    background: var(--white);
    height: 15rem;
    width: 100%;
    border: .1rem solid var(--record-color-half);
    border-radius: 1rem;
    min-width: 18rem;
    margin-right: 1rem;
    padding: 1.5rem;
    text-align: center;
  }

  .onboarding__article p {
    margin-bottom: .5rem;
  }
</style>

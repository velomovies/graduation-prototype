<template>
  <ul class="track-list">
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/${$route.params.slug}/opname-1`">
        <div class="track-list__text">
          <h2
            class="track-list__text-h2"
          >
            Opname 1
          </h2>
          <p class="track-list__text-p meta small-text">
           <span>00:21</span>
           <span>Zang</span>
          </p>
        </div>
      </nuxt-link>
      <button class="track-list__link-options">
        <div class="track-list__link-options-dot"></div>
        <div class="track-list__link-options-dot"></div>
        <div class="track-list__link-options-dot"></div>
      </button>
    <li/>
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/${$route.params.slug}/opname-2`">
        <div class="track-list__text">
          <h2
            class="track-list__text-h2"
          >
            Opname 2
          </h2>
          <p class="track-list__text-p meta small-text">
           <span>00:43</span>
           <span>Zang</span>
          </p>
        </div>
      </nuxt-link>
      <button class="track-list__link-options">
        <div class="track-list__link-options-dot"></div>
        <div class="track-list__link-options-dot"></div>
        <div class="track-list__link-options-dot"></div>
      </button>
    <li/>
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/${$route.params.slug}/opname-3`">
        <div class="track-list__text">
          <h2
            class="track-list__text-h2"
          >
            Opname 3
          </h2>
          <p class="track-list__text-p meta small-text">
           <span>00:58</span>
           <span>Instrument in Bes</span>
          </p>
        </div>
      </nuxt-link>
      <button class="track-list__link-options">
        <div class="track-list__link-options-dot"></div>
        <div class="track-list__link-options-dot"></div>
        <div class="track-list__link-options-dot"></div>
      </button>
    <li/>
  </ul>
</template>

<style>
  .track-list {
    margin: 0 2rem;
  }

  .track-list__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .track-list__link-options {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 1.625rem;
    width: 2rem;
  }

  .track-list__link-options-dot {
    width: .25rem;
    height: .25rem;
    background: var(--black);
    border-radius: 50%;
  }

  .track-list__link-options:hover .track-list__link-options-dot,
  .track-list__link-options:focus .track-list__link-options-dot {
    background: var(--record-color);
  }

  .track-list__link {
    margin-bottom: 1.5rem;
    border-left: .05rem solid var(--black);
    padding-left: .5rem;
  }

  .track-list__link-item {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .track-list__text-p span {
    margin-right: .5rem;
  }
</style>


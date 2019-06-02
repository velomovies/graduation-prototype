<template>
  <ul class="track-list">
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/opname-1`">
        <div class="track-list__text">
          <div>
            <h2
              class="track-list__text-h2"
            >
              Op het strand
            </h2>
            <span class="meta">00:21</span>
          </div>
          <p class="track-list__text-p meta">
           <span>Instrument in C</span>
          </p>
        </div>
      </nuxt-link>
    <li/>
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/opname-1`">
        <div class="track-list__text">
          <h2
            class="track-list__text-h2"
          >
            Refrein: Op het strand
           <span class="meta">00:14</span>
          </h2>
          <p class="track-list__text-p meta">
           <span>Zang</span>
          </p>
        </div>
      </nuxt-link>
    <li/>
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/opname-1`">
        <div class="track-list__text">
          <h2
            class="track-list__text-h2"
          >
            Backingtrack
           <span class="meta">00:32</span>
          </h2>
          <p class="track-list__text-p meta">
           <span>Instrument in Bes</span>
          </p>
        </div>
      </nuxt-link>
    <li/>
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/opname-1`">
        <div class="track-list__text">
          <h2
            class="track-list__text-h2"
          >
            Experimenteel
           <span class="meta">00:58</span>
          </h2>
          <p class="track-list__text-p meta">
           <span>Zang</span>
          </p>
        </div>
      </nuxt-link>
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
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: .5rem;
    background: var(--white);
  }

  .track-list__link-item {
    width: 100%;
    display: flex;
    align-items: center;
  }
</style>


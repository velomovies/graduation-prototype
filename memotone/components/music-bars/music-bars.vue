<template>
  <div id="music-bars" class="music-bars">
    <music-bars-svg class="music-bars__svg" />
  </div>
</template>

<script>
import musicBarsSvg from '../../static/images/music-bars.svg'

export default {
 components: {
   musicBarsSvg,
 },
}
</script>

<style>
  .music-bars {
    padding: 0 1rem;
  }

  .music-bars__svg {
    width: 100%;
    height: 100%;
  }
</style>


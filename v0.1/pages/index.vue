<template>
  <main>Prototype</main>
</template>

<script>
export default {
  data() {
    return {
      ctx: new AudioContext()
    }
  },
  methods: {
    getAudio() {
      console.log(this.ctx)
    }
  }
}
</script>

<style>
</style>

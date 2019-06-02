<template>
  <div>
    <label
      class="a11y-sr-only"
      for="tempoRange"
    >
      Select the tempo
    </label>
    <input
      id="tempoRange"
      type="range"
      min="30"
      max="160"
      step="1"
      :value="value"
      @change="updateTempo"
    >

    <label
      class="a11y-sr-only"
      for="tempoNumber"
    >
      Select the tempo
    </label>
    <input
      id="tempoNumber"
      type="number"
      min="30"
      max="160"
      step="1"
      :value="value"
      @change="updateTempo"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      Type: Number,
      default: 60,
    },
  },
  methods: {
    updateTempo (event) {
      this.$store.commit('setBpm', Number(event.target.value))
    },
  },
}
</script>

<style>
input[type=range] {
  -webkit-appearance: none;
  background: transparent;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #999;
  height: 1.5rem;
  width: 1.5rem;
  margin-top: -.6rem;
  border-radius: 50%;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: .3rem;
  background: #ddd;
}
</style>

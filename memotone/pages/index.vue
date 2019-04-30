<template>
  <main>
    <h1>Prototype V1</h1>

    <label>Title: <input type="text"></label>

    <nuxt-link to="/record">Opnemen</nuxt-link>

    <metronome />

    <tempo-select />

    <nuxt-link to="/music">Overview</nuxt-link>
  </main>
</template>

<script>
import metronome from '../components/metronome'
import tempoSelect from '../components/tempo-select'

export default {
  components: {
    metronome,
    tempoSelect,
  },
}
</script>

<style>
button {
  font-size: 1rem;
  border: .1rem solid #000;
  padding: .75rem;
  cursor: pointer;
  transition: all .3s;
}

button:hover {
  background: #ededed;
}
</style>

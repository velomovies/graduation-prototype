<template>
  <div class="music">
    <app-header
      isBack
    />
    <main class="music__main">
    </main>
    <app-navigation />
  </div>
</template>

<script>
import appHeader from '../../components/app-header'
import appNavigation from '../../components/app-navigation'

export default {
  components: {
    appHeader,
    appNavigation,
  },
  mounted() {
    console.log(JSON.parse(localStorage['icon']))
  },
}
</script>

<style>
</style>

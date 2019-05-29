<template>
  <div class="music">
    <app-header
      isBack
    />
    <main class="music__main">
      <page-title uppercase>Mijn muziek</page-title>
    </main>
    <app-navigation />
  </div>
</template>

<script>
import appHeader from '../../components/app-header'
import appNavigation from '../../components/app-navigation'
import pageTitle from '../../components/page-title'

export default {
  components: {
    appHeader,
    appNavigation,
    pageTitle,
  },
  mounted() {
    console.log(JSON.parse(localStorage['icon']))
  },
}
</script>

<style>
</style>

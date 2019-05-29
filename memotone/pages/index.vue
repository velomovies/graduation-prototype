<template>
<div class="index">
  <app-header />
  <main>
    <page-title
      uppercase
    >
      Welkom bij memotone
    </page-title>
    <onboarding />
  </main>
  <app-navigation />
</div>
</template>

<script>
import appHeader from '../components/app-header'
import appNavigation from '../components/app-navigation'
import onboarding from '../components/onboarding'
import pageTitle from '../components/page-title'

export default {
  components: {
    appHeader,
    appNavigation,
    onboarding,
    pageTitle,
  },
}
</script>

<style>

</style>

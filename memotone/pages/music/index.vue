<template>
  <div class="music">
    <app-header
      isBack
    />
    <main class="music__main">
      <page-title uppercase>Mijn muziek</page-title>
      <project-list />
    </main>
    <app-navigation />
  </div>
</template>

<script>
import appHeader from '../../components/app-header'
import appNavigation from '../../components/app-navigation'
import pageTitle from '../../components/page-title'
import projectList from '../../components/project-list'

export default {
  components: {
    appHeader,
    appNavigation,
    pageTitle,
    projectList,
  },
  mounted() {
    console.log(JSON.parse(localStorage['icon']))
  },
}
</script>

<style>
</style>

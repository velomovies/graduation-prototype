<template>
  <div class="detail">
  <header>
    <app-logo
      isBack
      :page="'/music'"
    />
  </header>
  <main>
    <p>Detail page</p>
  </main>
  </div>
</template>

<script>
import appLogo from '../../components/app-logo'

export default {
  components: {
    appLogo,
  },
  mounted() {
    console.log(JSON.parse(localStorage['icon']))
  },
}
</script>

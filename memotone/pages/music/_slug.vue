<template>
  <div class="detail">
  <header class="header--small">
    <app-logo
      isBack
      :page="'/music'"
    />
  </header>
  <main>
    <p>Detail pagina</p>
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

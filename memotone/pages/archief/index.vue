<template>
  <div class="archief">
  <header class="header--small">
    <app-logo
      isBack
    />
  </header>
  <main class="archief__container">
<svg class="archief__svg" id="Group_4" data-name="Group 4" xmlns="http://www.w3.org/2000/svg" width="320" height="568" viewBox="0 0 320 568">
  <rect id="Rectangle_93" data-name="Rectangle 93" width="320" height="568" fill="#fff"/>
  <nuxt-link to="/archief/opgenomen">
    <rect id="Rectangle_95" data-name="Rectangle 95" width="295" height="62" transform="translate(12 90)" fill="#fff"/>
  </nuxt-link>
  <nuxt-link to="/archief/eigen-map">
    <rect id="Rectangle_96" data-name="Rectangle 96" width="295" height="59" transform="translate(13 152)" fill="#fff"/>
  </nuxt-link>
  <nuxt-link to="/record">
    <circle id="Ellipse_10" data-name="Ellipse 10" cx="26.65" cy="26.65" r="26.65" transform="translate(133.62 479.46)" fill="rgba(158,37,0,0.6)"/>
    <circle id="Ellipse_11" data-name="Ellipse 11" cx="17.524" cy="17.524" r="17.524" transform="translate(142.746 488.587)" fill="#9e2500"/>
    <circle id="Ellipse_12" data-name="Ellipse 12" cx="20.131" cy="20.131" r="20.131" transform="translate(140.139 485.979)" fill="rgba(158,37,0,0.6)"/>
  </nuxt-link>
  <path id="Path_21" data-name="Path 21" d="M-396,378.22l7.379,10.513L-396,399.607" transform="translate(665.621 -268.325)" fill="none" stroke="#333" stroke-width="1"/>
  <path id="Path_23" data-name="Path 23" d="M-396,378.22l7.379,10.513L-396,399.607" transform="translate(665.621 -209.325)" fill="none" stroke="#333" stroke-width="1"/>
  <text id="Opgenomen" transform="translate(42 125)" fill="#333" font-size="16" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Opgenomen</tspan></text>
  <text id="Gedeeld" transform="translate(42 188)" fill="#333" font-size="16" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Eigen map</tspan></text>
  <path id="Path_22" data-name="Path 22" d="M-354,158.521H-59" transform="translate(366 -7)" fill="none" stroke="#707070" stroke-width="1"/>
  <path id="Path_24" data-name="Path 24" d="M-354,158.99H-59" transform="translate(366 52)" fill="none" stroke="#707070" stroke-width="1"/>
  <path id="Path_25" data-name="Path 25" d="M-354,158.333H-59" transform="translate(366 -68.379)" fill="none" stroke="#707070" stroke-width="1"/>
  <text id="Archief" transform="translate(111 40)" fill="#333" font-size="20" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Archief</tspan></text>
</svg>

  </main>
  </div>
</template>

<script>
import appLogo from '../../components/app-logo'

export default {
  components: {
    appLogo,
  },
}
</script>

<style>
.archief__container {
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>

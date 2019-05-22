<template>
  <div class="archiefMap">
  <header class="header--small">
    <app-logo
      @clicked="() => this.sharingButton = false"
      class="archiefMap__logo"
      isBack
      :page="previousPage"
    />
  </header>
  <main class="archiefMap__container">
<svg class="archiefMap__svg" id="Group_5" data-name="Group 5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="320" height="568" viewBox="0 0 320 568">
  <defs>
    <filter id="Rectangle_71" x="198" y="262" width="115" height="86" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <path id="Path_33" data-name="Path 33" d="M0,0H320V568H0Z" fill="#fff"/>
  <nuxt-link to="/archief/opgenomen/opname-1">
    <rect id="Rectangle_97" data-name="Rectangle 97" width="243" height="59" transform="translate(13 92)" fill="#fff"/>
  </nuxt-link>
  <nuxt-link to="/archief/opgenomen/opname-2">
    <rect id="Rectangle_96" data-name="Rectangle 96" width="243" height="59" transform="translate(13 152)" fill="#fff"/>
    </nuxt-link>
  <nuxt-link to="/archief/opgenomen/opname-2">
    <rect id="Rectangle_98" data-name="Rectangle 98" width="254" height="59" transform="translate(13 214)" fill="#fff"/>
    </nuxt-link>
  <nuxt-link to="/record">
    <circle id="Ellipse_10" data-name="Ellipse 10" cx="26.65" cy="26.65" r="26.65" transform="translate(133.62 479.46)" fill="rgba(158,37,0,0.6)"/>
    <circle id="Ellipse_11" data-name="Ellipse 11" cx="17.524" cy="17.524" r="17.524" transform="translate(142.746 488.587)" fill="#9e2500"/>
    <circle id="Ellipse_12" data-name="Ellipse 12" cx="20.131" cy="20.131" r="20.131" transform="translate(140.139 485.979)" fill="rgba(158,37,0,0.6)"/>
  </nuxt-link>
  <text id="Opname_1" data-name="Opname 1" transform="translate(43 125)" fill="#333" font-size="16" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Opname 1</tspan></text>
  <text id="Opname_2" data-name="Opname 2" transform="translate(42 188)" fill="#333" font-size="16" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Opname 2</tspan></text>
  <text id="Opname_3" data-name="Opname 3" transform="translate(43 247)" fill="#333" font-size="16" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Opname 3</tspan></text>
  <path id="Path_22" data-name="Path 22" d="M-354,158.521H-59" transform="translate(366 -7)" fill="none" stroke="#707070" stroke-width="1"/>
  <path id="Path_24" data-name="Path 24" d="M-354,158.99H-59" transform="translate(366 52)" fill="none" stroke="#707070" stroke-width="1"/>
  <path id="Path_29" data-name="Path 29" d="M-354,158.99H-59" transform="translate(367 111)" fill="none" stroke="#707070" stroke-width="1"/>
  <path id="Path_25" data-name="Path 25" d="M-354,158.333H-59" transform="translate(366 -68.379)" fill="none" stroke="#707070" stroke-width="1"/>
  <g @click="() => { this.showDropdown = !this.showDropdown }">
    <circle id="Ellipse_13" data-name="Ellipse 13" cx="2.5" cy="2.5" r="2.5" transform="translate(282 108)" fill="#333"/>
    <circle id="Ellipse_14" data-name="Ellipse 14" cx="2.5" cy="2.5" r="2.5" transform="translate(282 119)" fill="#333"/>
    <circle id="Ellipse_15" data-name="Ellipse 15" cx="2.5" cy="2.5" r="2.5" transform="translate(282 130)" fill="#333"/>
  </g>
  <g @click="() => { this.showDropdown = !this.showDropdown }">
    <circle id="Ellipse_16" data-name="Ellipse 16" cx="2.5" cy="2.5" r="2.5" transform="translate(282 170)" fill="#333"/>
    <circle id="Ellipse_17" data-name="Ellipse 17" cx="2.5" cy="2.5" r="2.5" transform="translate(282 181)" fill="#333"/>
    <circle id="Ellipse_18" data-name="Ellipse 18" cx="2.5" cy="2.5" r="2.5" transform="translate(282 192)" fill="#333"/>
  </g>
  <g @click="() => { this.showDropdown = !this.showDropdown }">
    <circle id="Ellipse_19" data-name="Ellipse 19" cx="2.5" cy="2.5" r="2.5" transform="translate(283 229)" fill="#333"/>
    <circle id="Ellipse_20" data-name="Ellipse 20" cx="2.5" cy="2.5" r="2.5" transform="translate(283 240)" fill="#333"/>
    <circle id="Ellipse_21" data-name="Ellipse 21" cx="2.5" cy="2.5" r="2.5" transform="translate(283 251)" fill="#333"/>
  </g>
  <g v-if="showDropdown" id="Group_3" data-name="Group 3">
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_71)">
      <rect id="Rectangle_71-2" data-name="Rectangle 71" width="97" height="68" transform="translate(207 268)" fill="#f5f5f5"/>
    </g>
    <path id="Path_30" data-name="Path 30" d="M509.5,364.66l8.8-13.192,8.2,13.192" transform="translate(-233 -91.468)" fill="#f5f5f5"/>
    <text id="Verwijderen" transform="translate(221 291)" fill="#333" font-size="12" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Verwijderen</tspan></text>
    <text @click="() => this.sharingButton = !this.sharingButton" id="Delen" transform="translate(221 317)" fill="#333" font-size="12" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Delen</tspan></text>
  </g>
  <text id="Opgenomen" transform="translate(105 40)" fill="#333" font-size="20" font-family="Nunito-Regular, Nunito"><tspan x="0" y="0">Opgenomen</tspan></text>
</svg>


  <app-share @clicked="() => this.sharingButton = false" v-if="sharingButton"/>
  </main>
  </div>
</template>

<script>
import appLogo from '../../../components/app-logo'
import appShare from '../../../components/app-share'

export default {
  components: {
    appLogo,
    appShare,
  },
  data() {
    return {
      showDropdown: false,
      sharingButton: false,
    }
  },
  computed: {
    previousPage: function (){
      if (this.sharingButton) {
        return ''
      } else {
        return '/archief'
      }
    },
  },
}
</script>

<style>
.archiefMap__container {
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>

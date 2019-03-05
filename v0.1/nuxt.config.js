module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Prototype v0.1',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'First prototype of my graduation project',
      },
      {
        'http-equiv': 'Accept-CH',
        content: 'DPR, Width, Viewport-Width, Save-Data',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ src: '~/plugins/polyfills', ssr: false }],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
        config.module.rules.forEach(rule => {
          if (rule.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/') {
            rule.test = /\.(png|jpe?g|gif|webp)$/
          }
        })

        config.module.rules.push({
          test: /\.svg$/,
          loader: 'vue-svg-loader',
        })
      }
    },
  },
}

module.exports = {
    mode: 'universal',

    /**
     * Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /**
     * Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /**
     * Global CSS
     */
    css: [
        '@/assets/styles/main.scss'
    ],

    /**
     * Plugins to load before mounting the App
     */
    plugins: [],

    /**
     * Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxt/typescript-build',
        // Doc: https://github.com/nuxt-community/stylelint-module
        '@nuxtjs/stylelint-module'
    ],

    /**
     * Nuxt.js modules
     */
    modules: [
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources'
    ],

    styleResources: {
        scss: [
            '~/assets/styles/_variables.scss',
            '~/assets/styles/_mixins.scss'
        ]
    },

    /**
     * Build configuration
     */
    build: {

        /**
         * You can extend webpack config here
         */
        extend(config, ctx) {}
    },

    /**
     * Environment Variabls
     **/
    env: {
        API_URL: 'https://localhost:3001'
    },
}

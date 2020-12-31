require('dotenv').config();

const path = require('path');
const { version } = require('./package.json');
const pathPrefix = '/blocklet/';

module.exports = {
  pathPrefix,
  plugins: [
    {
      resolve: require.resolve('@arcblock/www'),
    },
    {
      resolve: require.resolve('@arcblock/gatsby-theme-docs'),
      options: {
        version: `v${version}`,
        official: true,
        disableI18n: false,
        sourceDirs: [path.resolve(__dirname, 'src')],
        siteMetadata: {
          title: 'Development Guide',
          description: 'Blocklet Development Guide',
          logoUrl: '/',
          sidebarWidth: 360,
        },
        algoliaSearch: {
          enabled: false,
          appId: process.env.GATSBY_ALGOLIA_APP_ID,
          adminKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
          searchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
          indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        },
        navItems: [],
        extraPlugins: [],
      },
    },
    {
      resolve: require.resolve('@arcblock/gatsby-i18n-redirect'),
      options: {
        languages: ['en', 'zh'],
        cookieName: 'nf_lang',
        pathPrefix,
        pathSuffix: '/',
      },
    },
    // Speed up netlify build
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        cachePublic: true,
      },
    },
  ],
};

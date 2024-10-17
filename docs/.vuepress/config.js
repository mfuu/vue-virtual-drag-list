module.exports = {
  base: '/vue-virtual-drag-list/',
  lang: 'en-US',
  title: 'vue-virtual-drag-list',
  description: 'A virtual scrolling list component that can be sorted by dragging',

  themeConfig: {
    repo: 'mfuu/vue-virtual-drag-list',

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2019-${new Date().getFullYear()} mfuu`,
    },

    nav: [
      {
        text: 'Guide',
        link: '/guide/install',
        activeMatch: '/guide/',
      },
      {
        text: 'Demo',
        link: '/demo/basic',
        activeMatch: '/demo/',
      },
    ],

    sidebar: {
      '/guide/': ['install', 'emits', 'props', 'methods'],
      '/demo/': ['basic', 'group', 'infinity', 'horizontal', 'scrollto', 'table', 'scroller'],
    },
  },
};

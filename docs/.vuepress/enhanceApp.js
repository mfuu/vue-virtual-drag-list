export default ({ Vue, options, router, siteData }) => {
  Vue.mixin({
    mounted() {
      import('../../dist/virtual-list').then(function (m) {
        Vue.component(m.default);
      });
    },
  });
};

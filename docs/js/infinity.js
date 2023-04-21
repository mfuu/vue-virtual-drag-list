export const InfinityList = Vue.component('infinity-list', {
  props: {
    getPageData: {},
  },
  data() {
    return {
      dataSource: [],
      toploading: false
    }
  },
  created() {
    this.dataSource = getPageData(30, 0)
  },
  methods: {
    handleTop() {
      this.toploading = true
      setTimeout(() => {
        this.dataSource = [...getPageData(30, 0), ...this.dataSource]
        this.toploading = false
      }, 500)
    },
    handleBottom() {
      setTimeout(() => {
        this.dataSource = [...this.dataSource, ...getPageData(30, 0)]
      }, 500)
    },
    ondragend(arr, _old, _new, chnaged) {
      console.log(arr, _old, _new, chnaged, 'new states after drag end')
    },
    handleClick() {
      console.log('click')
    }
  },
  render(h) {
    return h('div', {
      attrs: {
        class: 'infinity-list',
      }
    }, 
    [
      h(VirtualDragList, {
        ref: 'list',
        props: {
          dataSource: this.dataSource,
          dataKey: 'id',
          keeps: 20,
          size: 99,
          itemClass: 'infinity-item',
          disabled: this.disabled,
          draggable: '.infinity-item',
          handle: '.drag',
          keepOffset: true
        },
        on: {
          top: this.handleTop,
          bottom: this.handleBottom,
          ondragend: this.ondragend
        },
        style: { height: '100%' },
        scopedSlots: {
          item: props => {
            return h('div', {}, 
            [
              this.disabled ? null : h('span', {
                class: 'drag',
                attrs: {
                  title: 'drag to reorder'
                },
                on: {
                  click: this.handleClick
                }
              }),
              h('div', {
                class: 'index'
              }, props.dataKey),
              h('p', {
                attrs: {
                  title: props.record.desc
                }
              }, props.record.desc)
            ])
          }
        }
      },[
        this.toploading && h('div', { slot: 'header', class: 'spinner' }, [
          h('div', { class: 'rect1' }),
          h('div', { class: 'rect2' }),
          h('div', { class: 'rect3' }),
          h('div', { class: 'rect4' }),
          h('div', { class: 'rect5' }),
        ]),
        h('div', { slot: 'footer', class: 'spinner' }, [
          h('div', { class: 'rect1' }),
          h('div', { class: 'rect2' }),
          h('div', { class: 'rect3' }),
          h('div', { class: 'rect4' }),
          h('div', { class: 'rect5' }),
        ])
      ])
    ])
  }
});

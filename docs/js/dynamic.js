export const DynamicList = Vue.component('dynamic-list', {
  props: {
    disabled: {},
    dataSource: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    handleTop() {
      console.log('is to top')
    },
    handleBottom() {
      console.log('is to bottom')
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
        class: 'dynamic-list',
      }
    }, 
    [
      h(VirtualDragList, {
        ref: 'list',
        props: {
          dataSource: this.dataSource,
          dataKey: 'index',
          keeps: 20,
          size: 90,
          itemClass: 'dynamic-item',
          disabled: this.disabled,
          draggable: '.dynamic-item',
          handle: '.drag',
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
                }
              }),
              h('div', {
                class: 'index',
                on: {
                  click: this.handleClick
                }
              }, props.dataKey),
              h('p', {}, props.record.desc)
            ])
          }
        }
      },[
        h('div', { slot: 'header', class: 'loading' }, 'header'),
        h('div', { slot: 'footer', class: 'loading' }, 'footer')
      ])
    ])
  }
});
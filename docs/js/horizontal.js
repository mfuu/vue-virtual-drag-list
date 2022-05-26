export const HorizontalList = Vue.component('horizontal-list', {
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
        class: 'horizontal-list',
      }
    }, 
    [
      h(VirtualDragList, {
        ref: 'list',
        props: {
          dataSource: this.dataSource,
          dataKey: 'id',
          keeps: 20,
          size: 110,
          disabled: this.disabled,
          draggable: '.drag',
          direction: 'horizontal',
          wrapStyle: { display: 'flex' }
        },
        on: {
          top: this.handleTop,
          bottom: this.handleBottom,
          ondragend: this.ondragend
        },
        style: { height: '100%', display: 'flex' },
        scopedSlots: {
          item: props => {
            return h('div', {
              class: 'horizontal-item',
            }, 
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
              }, props.record.index),
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
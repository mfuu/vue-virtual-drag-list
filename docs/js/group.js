export const GroupList = Vue.component('group-list', {
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
        class: 'group-list',
      }
    }, 
    [
      h(VirtualDragList, {
        ref: 'list',
        props: {
          dataSource: this.dataSource,
          dataKey: 'index',
          keeps: 20,
          size: 99,
          group: 'g',
          itemClass: 'group-item',
          disabled: this.disabled,
          draggable: '.group-item',
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
              h('p', {
                attrs: {
                  title: props.record.desc
                }
              }, props.record.desc)
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
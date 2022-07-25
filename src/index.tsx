import { defineComponent, computed, watch, ref, provide, reactive, nextTick } from 'vue';
import { Range, DragState } from './types';
import { debounce, getDataKey, throttle } from './utils';
import { VirtualProps } from './props';
import Sortable from './sortable';
import Virtual from './virtual';


const VirtualDragList = defineComponent({
  props: VirtualProps,
  setup(props, { emit, slots }) {

    provide('virtualList', reactive({
      onItemResized,
      onHeaderResized,
      onFooterResized
    }))

    let range: Range = new Range;
    let dragState: DragState = new DragState;

    let sortable: Sortable;
    let virtual: Virtual;

    const viewlist = ref<any[]>([]);
    const uniqueKeys = ref<string[] | number[]>([]);

    let lastItem: any;

    // --------------------------- computed values ------------------------------
    const isHorizontal = computed(() => props.direction !== 'vertical')
    const scrollSizeKey = computed(() => isHorizontal ? 'scrollWidth' : 'scrollHeight')
    const scrollDirectionKey = computed(() => isHorizontal ? 'scrollLeft' : 'scrollTop')
    const offsetSizeKey = computed(() => isHorizontal ? 'offsetLeft' : 'offsetTop')
    const clientSizeKey = computed(() => isHorizontal ? 'clientWidth' : 'clientHeight')

    // --------------------------- emits ------------------------------
    /**
     * reset component
     */
    function reset() {
      scrollToTop()
      init(props.dataSource)
    }
    /**
     * git item size by data-key
     */
    function getSize(key: string | number) {
      return virtual.sizes.get(key)
    }
    /**
     * Get the current scroll height
     */
    function getOffset() {
      const { root } = $refs
      return root ? Math.ceil(root[scrollDirectionKey]) : 0
    }
    /**
     * Scroll to top of list
     */
    function scrollToTop() {
      const { root } = $refs
      root[scrollDirectionKey] = 0
    }
    /**
     * Scroll to bottom of list
     */
    function scrollToBottom() {
      const { bottomItem, root } = $refs
      if (bottomItem) {
        const bottom = bottomItem[offsetSizeKey]
        scrollToOffset(bottom)

        // The first scroll height may change, if the bottom is not reached, execute the scroll method again
        setTimeout(() => {
          const offset = getOffset()
          const clientSize = Math.ceil(root[clientSizeKey])
          const scrollSize = Math.ceil(root[scrollSizeKey])
          if (offset + clientSize < scrollSize) scrollToBottom()
        }, 5)
      }
    }
    /**
     * Scroll to the specified index position
     */
    function scrollToIndex(index: number) {
      if (index >= viewlist.value.length - 1) {
        scrollToBottom()
      } else {
        const indexOffset = virtual.getOffsetByIndex(index)
        scrollToOffset(indexOffset)

        setTimeout(() => {
          const offset = getOffset()
          const indexOffset = virtual.getOffsetByIndex(index)
          if (offset !== indexOffset) scrollToIndex(index)
        }, 5)
      }
    }
    /**
     * Scroll to the specified offset
     */
    function scrollToOffset(offset: number) {
      const { root } = $refs
      root[scrollDirectionKey] = offset
    }
    /**
     * callback function after drop
     */
    function handleDragEnd(list, _old, _new, changed) {
      emit('ondragend', list, _old, _new, changed)
    }

    // --------------------------- private mehtods ------------------------------

    watch(() => props.dataSource, (newVal: any[]) => {
      init(newVal)
    }, {
      deep: true,
      immediate: true
    })

    watch(() => props.disabled, (newVal: boolean) => {
      if (sortable) sortable.set('disabled', newVal)
    }, {
      immediate: true
    })

    const init = (list: any[]) => {
      viewlist.value = list
      updateUniqueKeys()

      if (virtual) {
        virtual.updateUniqueKeys(uniqueKeys)
        virtual.updateSizes(uniqueKeys)
        virtual.updateRange()
      } else {
        initVirtual()
      }

      if (sortable) sortable.set('list', [...list])
      else nextTick(() => initSortable())

      // if auto scroll to the last offset
      if (lastItem && props.keepOffset) {
        const index = getItemIndex(lastItem)
        scroll
      }
    }

    const updateUniqueKeys = () => {
      uniqueKeys.value = viewlist.value.map(item => getDataKey(item, props.dataKey))
    }

    // --------------------------- virtual ------------------------------
    const initVirtual = () => {
      virtual = new Virtual(
        {
          size: props.size,
          keeps: props.keeps,
          uniqueKeys: uniqueKeys,
          isHorizontal: isHorizontal
        },
        (newRange: Range) => {
          if (dragState.to.key === undefined) range = newRange
          const { start, end } = range
          const { index } = dragState.from
          if (index > -1 && !(index >= start && index <= end)) {
            if (sortable) sortable.rangeIsChanged = true
          }
        }
      )

      virtual.updateSizes(uniqueKeys)
      virtual.updateRange()
    }

    // --------------------------- sortable ------------------------------
    const initSortable = () => {
      sortable = new Sortable(
        {
          scrollEl: null,
          getKey: getDataKey,
          dataSource: viewlist,

          animation: props.animation,
          autoScroll: props.autoScroll,
          scrollStep: props.scrollStep,
          scrollThreshold: props.scrollThreshold,

          disabled: props.disabled,
          draggable: props.draggable,
          ghostClass: props.ghostClass,
          ghostStyle: props.ghostStyle,
          chosenClass: props.chosenClass,
        },
        (from: DragState['from'], to: DragState['to']) => {
          // on drag
          dragState.from = from
        },
        (list: any[], from: DragState['from'], to: DragState['to'], changed: boolean) => {
          // on drop
          dragState.to = to
          handleDragEnd(list, from, to, changed)
          if (changed) {
            if (sortable.rangeIsChanged && virtual.direction && range.start > 0) {
              const index = list.indexOf(viewlist.value[range.start])
              if (index > -1) {
                range.start = index
                range.end = index + props.keeps - 1
              }
            }
            // list change
            viewlist.value = [...list]
            updateUniqueKeys()
            virtual.updateUniqueKeys(uniqueKeys)
          }
          clearDragState()
        }
      )
    }

    const destroySortable = () => {
      sortable && sortable.destroy()
      sortable = null
    }

    const clearDragState = throttle(() => {
      dragState = new DragState
    }, props.delay + 17)

    // --------------------------- handle scroll ------------------------------
    const handleScroll = debounce(() => {
      // The scroll event is triggered when the mouseup event occurs, which is handled here to prevent the page from scrolling due to range changes.
      if (dragState.to.key !== undefined) {
        clearDragState()
        return
      }

      const { root } = $refs
      const offset = getOffset()
      const clientSize = Math.ceil(root[clientSizeKey])
      const scrollSize = Math.ceil(root[scrollSizeKey])

      if (!scrollSize || offset < 0 || (offset + clientSize > scrollSize + 1)) return

      virtual.handleScroll(offset)

      if (virtual.isFront()) {
        if (!!viewlist.value.length && offset <= 0) handleToTop(this)
      } else if (virtual.isBehind()) {
        if (clientSize + offset >= scrollSize) handleToBottom(this)
      }
    }, props.delay)

    const handleToTop = debounce(() => {
      emit('top')
      lastItem = viewlist.value[0]
    })

    const handleToBottom = debounce(() => {
      emit('bottom')
    })

    // --------------------------- handle size change ------------------------------
    const onItemResized = (id: any, size: number) => {
      virtual.handleItemSizeChange(id, size)
    }
    const onHeaderResized = (id: any, size: number) => {
      virtual.handleHeaderSizeChange(size)
    }
    const onFooterResized = (id: any, size: number) => {
      virtual.handleFooterSizeChange(size)
    }

    // --------------------------- methods ------------------------------
    const getItemIndex = (item: any) => {
      return viewlist.value.findIndex(el => {
        return getDataKey(item, props.dataKey) == getDataKey(el, props.dataKey)
      })
    }

    const getItemStyle = (dataKey: any) => {
      const { key } = dragState.from
      if (sortable && sortable.rangeIsChanged && dataKey == key)
        return { display: 'none' }
      return {}
    }
  }
})
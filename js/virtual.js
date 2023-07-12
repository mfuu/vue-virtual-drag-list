const VirtualLoading = Vue.component("virtual-loading", {
  render(h) {
    return h("div", { class: "spinner" }, [
      h("div", { class: "rect1" }),
      h("div", { class: "rect2" }),
      h("div", { class: "rect3" }),
      h("div", { class: "rect4" }),
      h("div", { class: "rect5" }),
    ]);
  },
});

export const VirtualList = Vue.component("virtual-list", {
  props: {
    topLoad: {
      type: Boolean,
      default: false,
    },
    bottomLoad: {
      type: Boolean,
      default: false,
    },
    group: {},
    direction: {},
    wrapStyle: {},
    virtualStyle: {},
    pageMode: {}
  },
  data() {
    return {
      loading: false,
      disabled: false,
      dataSource: [],
      index: 20,
      offset: 500,
    };
  },
  created() {
    this.dataSource = getPageData(100, 0);
  },
  methods: {
    handleTop() {
      if (!this.topLoad) return;
      this.loading = true;
      setTimeout(() => {
        this.dataSource = [...getPageData(20, 0), ...this.dataSource];
        this.loading = false;
      }, 500);
    },
    handleBottom() {
      if (!this.bottomLoad) return;
      setTimeout(() => {
        this.dataSource = [...this.dataSource, ...getPageData(20, 0)];
      }, 500);
    },
    onDrag(params) {
      console.log(params, "drag");
    },
    onDrop(params) {
      console.log(params, "drop");
    },
    onAdd(params) {
      console.log(params, "add");
    },
    onRemove(params) {
      console.log(params, "remove");
    },
    disabledChange() {
      this.disabled = !this.disabled;
    },
    scrollToTop() {
      this.$refs.list.scrollToTop();
    },
    scrollToBottom() {
      this.$refs.list.scrollToBottom();
    },
    scrollToIndex() {
      this.$refs.list.scrollToIndex(this.index);
    },
    scrollToOffset() {
      this.$refs.list.scrollToOffset(this.offset);
    },
  },
  render(h) {
    return h(
      "div",
      {
        attrs: {
          class: "flex justify-content-center",
        },
      },
      [
        h(
          "div",
          {
            class: "oprate",
          },
          [
            h(
              "button",
              { on: { click: this.disabledChange } },
              "allow drag: " + !this.disabled
            ),
            h("button", { on: { click: this.scrollToTop } }, "to top"),
            h("button", { on: { click: this.scrollToBottom } }, "to bottom"),
            h("button", { on: { click: this.scrollToIndex } }, [
              "to index: ",
              h("input", {
                attrs: {
                  value: this.index,
                  type: "number",
                },
                on: {
                  click: (e) => e.stopPropagation(),
                  change: (e) => (this.index = e.target.value),
                },
              }),
            ]),
            h("button", { on: { click: this.scrollToOffset } }, [
              "to offset: ",
              h("input", {
                attrs: {
                  value: this.offset,
                  type: "number",
                },
                on: {
                  click: (e) => e.stopPropagation(),
                  change: (e) => (this.offset = e.target.value),
                },
              }),
            ]),
          ]
        ),
        h(
          VirtualDragList,
          {
            ref: "list",
            props: {
              dataSource: this.dataSource,
              dataKey: "id",
              itemClass: "list-item",
              chosenClass: "chosen",
              disabled: this.disabled,
              handle: ".handle",
              keepOffset: true,
              group: this.group,
              direction: this.direction,
              wrapStyle: this.wrapStyle,
              pageMode: this.pageMode
            },
            on: {
              top: this.handleTop,
              bottom: this.handleBottom,
              drop: this.onDrop,
              drag: this.onDrag,
              add: this.onAdd,
              remove: this.onRemove,
            },
            class: "virtual-list",
            style: this.virtualStyle,
            scopedSlots: {
              item: ({ record }) => {
                return h("div", { class: "pd16" }, [
                  h("div", { class: "text-right" }, [
                    h(
                      "span",
                      {
                        class: "handle",
                        attrs: {
                          title: "drag to reorder",
                        },
                      },
                      "☰"
                    ),
                  ]),
                  h("p", {}, record.desc),
                ]);
              },
            },
          },
          [
            this.loading &&
              this.topLoad &&
              h("div", { slot: "header" }, [h(VirtualLoading)]),
            this.bottomLoad &&
              h("div", { slot: "footer" }, [h(VirtualLoading)]),
          ]
        ),
      ]
    );
  },
});

export interface VirtualOptions {
  size: number;
  keeps: number;
  uniqueKeys: any[];
  isHorizontal: boolean;
}

export interface SortableOptions {
  getKey: Function;
  scrollEl: HTMLElement;
  dataSource: any[];
  disabled: boolean;
  draggable: string | Function;
  ghostStyle: object;
  ghostClass: string;
  chosenClass: string;
  animation: number;
  autoScroll: boolean;
  scrollStep: number;
  scrollThreshold: number;
}

interface DragStateType {
  key: any;
  index: number;
  item: any;
}

// drag state
export class DragState {
  from: DragStateType;
  to: DragStateType;
  constructor() {
    this.from = { key: undefined, item: undefined, index: -1 }
    this.to = { key: undefined, item: undefined, index: -1 }
  }
}

// scroll range
export class Range {
  start: number;
  end: number;
  front: number;
  behind: number;
  constructor() {
    this.start = 0
    this.end = 0
    this.front = 0
    this.behind = 0
  } 
}

// virtual state
export class CalcSize {
  average: number;
  total: number;
  fixed: number;
  header: number;
  footer: number;
  constructor() {
    this.average = 0 // 计算首次加载每一项的评价高度
    this.total = 0 // 首次加载的总高度
    this.fixed = 0 // 记录固定高度值
    this.header = 0 // 顶部插槽高度
    this.footer = 0 // 底部插槽高度
  }
}
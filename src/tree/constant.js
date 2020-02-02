const CSS_PREFIX = 'hz';

const STATICS = {
  // 单行高
  ROW_HEIGHT: 32.5,
  // 搜索框设置
  SEARCHER_HEIGHT: {
    'small': 24,
    'default': 32,
    'large': 40,
  },
  // 树形可视区域
  VIEW_HEIGHT: 325,
  // rowkey变treeKey的分割符
  TREE_KEY_SPLIT: '^',
  // Tree虚拟根节点key值
  TREE_VIRTUAL_ROOT: 'WYP',
  // 搜索字符限制
  SEARCH_CHAR_LIMIT: 2,
};

const DEFAULT_PROPS = {
  dataSetting: {
    dataKey: 'id',
    viewKey: 'name',
    childArrayKey: 'children',
  },
  data: [],
  autoExpandParent: false,
  searchSetting: {
    placeholder: '搜索设备',
    size: 'default',
    disabled: false,
  },
}

export { STATICS, CSS_PREFIX, DEFAULT_PROPS };
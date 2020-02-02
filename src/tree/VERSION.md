### 2019-12-23

※名称 VirtualizedTree 变更为 Tree

fix:组件高度计算修复：parentNode.clientHeight 变更为 parentNode.clientHeight - (parentNode.style.paddingTop + parentNode.style.paddingBottom)

### 2019-12-25

feat:组件添加 getTreeDataByDataKey(key: string)函数供外部 ref 调用

### 2019-12-30

fix: scrollbars 添加 universal 属性

feat: 新增index.mdx

### 2020-01-09

refactor: utils修改、目录结构修改

feat: API getTreeData 变更为 getListData

      API 新增 getTree(keys) => [] 获取树形结构数据

feat: Props 新增 expandedKeys 参数、checkStrictly 参数

fix: Props onCheck(checkedObj) => onCheck(checkedObj, currentNode)

### 2020-01-10

feat: API getTreeDataByDataKey 变更为 getDataByDataKey

fix: 修复树数据变化checkedKeys、halfCheckedKeys不同步更新的bug

feat: 修改readme

fix: 修复组件数值型字符串导致排序异常的问题

### 2020-01-14

fix: 修复getTree函数单一节点无法展示的bug

feat: getTree(dataKeys) => getTree(dataKeys, needParent = false)

### 2020-01-15

feat: 新增API isInSubTree(key1, key2) => 判断以key2为主键的节点是否在key1为主键的节点的子树中

fix: disabled去除对onExpand的限制，即展开不再受限

fix: 修复Searcher搜索内容不清空的bug

### 2020-01-20

fix: 搜索框使用hz图标

fix: 移除package.json

### 2020-01-21

fix: 修改treeKey分割符 -  =>  ^
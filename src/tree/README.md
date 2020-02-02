### React 可视区域树组件

```js
import { Tree } from '@hz-components/react-base';
```

#### Tree

可视区域资源树;
前端搜索，搜索框已封装在组件内，请设置组件外层的 dom 元素高度;

注意：

树节点单行高：32.5px;
请保证 construtor 内可读取到dataSetting;

```jsx
treeDataSetting = {
  dataKey: 'id',
  dataViewKey: 'resource_name',
  childArrayKey: 'child',
  needLoadData: (node) => {
    if (node.id === 23) {
      return true;
    }
    return false;
  },
  loadData: () => new Promise((resolve) => {
    setTimeout(() => {

      const arr = [];

      for (let i = 25000; i < 30000; i ++) {
        arr.push({ id: i, resource_name: `异步测试${i}`, child: [{ id: i + 100000, resource_name: `异步测试${i + 100000}` }] });
      }

      resolve({ isSuccess: false, data: arr});
    }, 1000);
  })
}
...

{treeData && (
  <div style={{ height: '100%' }}>
    <Tree
      data={treeData[0].child}
      dataSetting={this.treeDataSetting}
      checkedKeys={checkedKeys}
      onCheck={this.onCheck}
      checkable
      hasSearch
    />
  </div>
)}
```

| 参数                 | 说明                                                                                                  | 类型                                                                                                                                                                                                                                  | 默认值                     | 版本 |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---- |
| data                 | 树型数据主节点                                                                                        | {[key: string]: string }}                                                                                                                                                                                                             | 无                         |      |
| dataSetting          | 数据设置                                                                                              | {dataKey: string, dataViewKey: string, hasChild?: (treeNode: TreeNode) => boolean, childArrayKey: string, loadData?: (data: TreeNode) => Promise<{isSuccess: boolean, data: array}>, needLoadData?: (treeNode: TreeNode) => boolean } | 无                         |      |
| checkable?           | 节点前添加 Checkbox 复选框                                                                            | boolean                                                                                                                                                                                                                               | false                      |      |
| checkable?           | 节点前添加 Checkbox 复选框                                                                            | boolean                                                                                                                                                                                                                               | false                      |      |
| checkStrictly?           | 严格勾选，父子不联动                                                                          | boolean                                                                                                                                                                                                                               | false                      |      |
| defaultCheckedKeys?  | 默认勾选的树节点                                                                                      | number[] or string[]                                                                                                                                                                                                                  | []                         |      |
| defaultExpandedKeys? | 默认展开的树节点                                                                                      | number[] or string[]                                                                                                                                                                                                                  | []                         |      |
| checkedKeys?         | （受控）设置选中的树节点 数据请与 dataKey 保持一致                                                    | number[] or string[]                                                                                                                                                                                                                  | []                         |      |
| expandedKeys?         | （受控）已展开树节点 数据请与 dataKey 保持一致                                                    | number[] or string[]                                                                                                                                                                                                                  | []                         |      |
| selectedKey?         | （受控）已点击树节点 数据请与 dataKey 保持一致                                                    | string                                                                                                                                                                                                                  | ''                         |      |
| onCheck?             | (受控)点击复选框触发                                                                                  | (data: { checkedKeys, halfCheckedKeys, checkedRows: TreeNode[], halfCheckedRows: TreeNode[]}, currentNode) => any;                                                                                                                                 | 无                         |      |
| hasSearch?           | 是否添加搜索框【前端搜索】                                                                            | boolean                                                                                                                                                                                                                               | false                      |      |
| onSearch?            | 搜索完成的回调                                                                                        | (searchStr: string) => any;                                                                                                                                                                                                           | 无                         |      |
| treeNodeRender?      | 节点自定义渲染                                                                                        | (nodeData: TreeNode,searchText, isChecked, isExpanded, isSelected) => { disableCheckbox?: boolean, disabled?: boolean, content?: ReactNode                                                                                            | string, icon?: ReactNode } | 无   |  |
| onLoadData?          | 加载数据回调,仅提示何数据已加载                                                                       | (dataKey: string) => any;                                                                                                                                                                                                             | 无                         |      |
| loadedKeys?          | （受控）已加载的节点，需配合 dataSetting.loadData 使用,可以此控制节点多次加载子节点（子节点内容累加） | []                                                                                                                                                                                                                                    | 无                         |      |
| onSelect?            | 内容区域点击回调函数                                                                                  | (nodeData: TreeNode) => any;                                                                                                                                                                                                          | 无                         |      |

##### dataSetting 参数说明

```code
{
  // 数据主键 eg: {id: '1'}, {id: '2'}, 则 dataKey: 'id'
  dataKey: string;
  // 数据展示文本键值 eg: { id: '1', name: 'www' }, 则 dataKey: 'name'
  dataViewKey: string;
  // 数据是否存在子节点, 该规则使用方可自己定义， 否则默认使用 nodeData[childArrayKey], 做判断
  hasChild?: (treeNode: TreeNode) => boolean,
  // 子节点键值 eg: { id: '1', child: [{id: '2'}]}, 则 childArrayKey: 'child'
  childArrayKey: string;
  // 异步加载数据函数，当且仅当为异步函数时图标才会有 loading 效果, isSuccess: 数据加载是否成功, data: Array 数据
  loadData?: (data: TreeNode) => Promise<{isSuccess: boolean, data: array}>;
  // 是否异步加载子节点, 该规则使用方可自己定义， 否则默认 false
  needLoadData?: (treeNode: TreeNode) => boolean;
}
```

##### Props 说明

**onCheck(data: { checkedKeys: number[] | string[], halfCheckedKeys: number[] | string[], checkedRows: TreeNode[], halfCheckedRows: TreeNode[]}, currentNode: {})**

(受控)点击复选框触发

@param data 返回 {已选中 keys,半选中 keys,已选中 rows,半选中 rows}, 点击节点

**onSearch(searchStr: string)**

搜索完成的回调

@param searchStr 搜索的字符串

**onLoadData(dataKey: string)**

加载数据回调,仅提示何数据已加载

@param dataKey 该 key 值数据已异步加载数据

**onSelect(nodeData)**

内容区域点击回调函数

@param nodeData 该树节点数据

**treeNodeRender(nodeData, searchText, isChecked, isExpanded, isSelected)**

节点自定义渲染

@param nodeData 该树节点数据

@param searchText 当前搜索的内容

@param isChecked 是否勾选了该行数据

@paarm isExpanded 是否展开了该行数据

@param isSelected 是否选中了该行数据

@return {

// 禁用复选框
disableCheckbox?: boolean;

// 禁用响应
disabled?: boolean;

// 展示内容
content?: ReactNode | string;

// 展示图标
icon?: ReactNode;

}

##### API

**getListData()**

获取列表型数据，获取树型数据总数

@return { listData: array, num: number }

**getDataByDataKey(key)**

根据 dataKey 获取单条数据以及列表型树枝数据

eg: def 数据层级为 root->abc->def，传入 def,返回{ node:{def}, layerNode: [{root}, {abc}, {def}]}

@param key 数据 key

@return { node: {}, layerNode: [] }

**getTree(keys, needParent = false)**

根据传入keys获取树形结构数据

@param keys 用于生成树的dataKeys

@param needParent 是否需要未勾选的父节点

@return [{},...]

**isInSubTree(upperDataKey, lowerDataKey)**

判断以lowerDataKey为主键的节点是否在upperDataKey为主键的节点的子树中

@param {any} upperDataKey 父级dataKey

@param {any} lowerDataKey 子级dataKey

import React, { PureComponent } from 'react';
import { Icon } from 'antd';

import Tree from './tree/';

export default class TreePage extends PureComponent {

  state = { checkedKeys: [] };

  tree = null;

  treeDataSetting = {
    dataKey: 'id',
    dataViewKey: 'resource_name',
    childArrayKey: 'child',
    needLoadData: (node) => {
      if (node.id === 45) {
        return true;
      }
      return true;
    },
    loadData: () => new Promise((resolve) => {
      setTimeout(() => {

        const arr = [];

        const gaps = 120000;
        for (let i = gaps; i < gaps+ 3000; i ++) {
          arr.push({ id: i, resource_name: `异步测试${i}`, child: [{ id: i + 100000, resource_name: `异步测试${i + 100000}` }] });
        }

        resolve({ isSuccess: true, data: arr});
      }, 1000);
    })
  }

  mockData = (() => {
    const arr = [];

    const baseGap = 10000;
    for (let i = 1; i < baseGap; i ++) {
      arr.push({ 
        id: i, resource_name: `异步测试${i}`, child: [
          { id: i + baseGap, resource_name: `异步测试${i + baseGap}` },
          { id: i + baseGap*2, resource_name: `异步测试${i + baseGap*2}`, }
        ]
      });
    }

    return [{ id: 'you', resource_name: '根', child: arr }];
  })();

  componentWillUnmount() {
    this.setState = () => {};
  }

  onCheck = ({ checkedKeys }) => {
    console.log( this.tree.getDataByDataKey(1) );
    this.setState(() => {
      return {
        checkedKeys,
      };
    });
  }

  render() {
    const { checkedKeys } = this.state;
    return (
      <React.Fragment>
        <div style={{ height: 500 }}>
          <Tree
            data={this.mockData}
            dataSetting={this.treeDataSetting}
            checkedKeys={checkedKeys}
            onCheck={this.onCheck}
            onSelect={this.onSelect}
            checkable
            hasSearch
            ref={refs => { this.tree = refs }}
            treeNodeRender={() => {
              return {
                icon: <Icon type="edit" />
              }
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}
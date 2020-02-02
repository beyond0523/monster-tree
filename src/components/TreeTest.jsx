import React from 'React';

// import { Tree } from '@hz-components/react-base';

import { Player } from "hz-components-tqt"

const { ReactVideoJS, LivePlayer, VideoPlayer } = Player

import { mockData } from './mockData';

const getTotalNumberOfElements = (nodes, counter = 0) => {
  return (
    counter +
    nodes.length +
    nodes.reduce((acc, n) => getTotalNumberOfElements(n.children, acc), 0)
  );
};

const dataSetting = {
  dataKey: 'id',
  dataViewKey: 'name',
  childArrayKey: 'children',
}
const data = mockData(2, 100000, 1);
console.log(data, 'd')

const num = getTotalNumberOfElements(data);

console.log(Player)

export default class TreeTest extends React.PureComponent {
  render() {
    return (
      <div style={{ height: '300px' }}>
      <p>当前渲染节点：{num}</p>
      {/* <Tree
        dataSetting={dataSetting}
        data={data}
        checkable
      /> */}
    </div>
    )
  }
}


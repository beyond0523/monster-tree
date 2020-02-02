import React from 'react';

import { Table, Divider, Tag } from 'untd';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a onClick={() => alert(11)}>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标记',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '动作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

export default class TableTest extends React.Component {
  state = {
    data: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ]
  }

  componentDidMount() {
    window.addEventListener('storage', this.refreshData)
    window.addEventListener('ALARMINFO', this.refreshData)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.refreshData)
  }

  refreshData = e => {
    console.log(e.newValue)
    // if (e.key === 'ALARMINFO') {
    //   const data = JSON.parse(sessionStorage.getItem('ALARMINFO'))

    //   this.setState({
    //     data,
    //   })
    // }

    if (e.key === 'ALARMINFO') {
      const data = e.newValue

      this.setState({
        data,
      })
    }
  }

  render() {
    const { data } = this.state;

    return <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  }
}

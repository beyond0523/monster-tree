import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './Treepage';

// setInterval(() => {
//   const data = [];

//   for (let i = 0; i < 30; i++) {
//     const key = Math.random(1) * 100000000000000000 + +new Date();
//     data.push({
//       key,
//       name: `测试${key}`,
//       age: 32,
//       address: `测试${key}`,
//       tags: ['nice', 'developer']
//     });
//   }

//   // 方式一
//   // sessionStorage.setItem('ALARMINFO', JSON.stringify(data))

//   const eA = new Event('ALARMINFO');
//   eA.key = 'ALARMINFO';
//   eA.newValue = JSON.stringify(data);
//   window.dispatchEvent(eA);
// }, 1000);

ReactDOM.render(<App name="hcw" age={30} />, document.getElementById('J-app'));

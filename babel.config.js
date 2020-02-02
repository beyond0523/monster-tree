module.exports = function(api) {
  api.cache(true);

  const presets = [
    // 包含所有安全属性和方法
    '@babel/preset-env',
    // 编译react
    '@babel/preset-react',
    // 编译ts
    '@babel/preset-typescript'
  ];
  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // [
    //   'import',
    //   {
    //     libraryName: '@hz-components/react-base',
    //     libraryDirectory: 'lib',
    //     style: true
    //   }
    // ],
    // [
    //   'import',
    //   {
    //     libraryName: 'hz-components-tqt',
    //     libraryDirectory: 'es',
    //     style: true
    //   }
    // ]
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};

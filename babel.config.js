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
  const plugins = [["@babel/plugin-proposal-class-properties", { "loose": true }]];

  return {
    presets,
    plugins
  };
};

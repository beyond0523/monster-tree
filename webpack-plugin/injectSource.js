/**
 * 资源插入插件
 * @param {*} options
 */
class InjectSourcePlugin {
  constructor(options) {
    this.options = options;

    // 插件名称
    this.PluginName = 'InjectSourcePlugin';
  }

  apply(compiler) {
    // v4
    if ('hooks' in compiler) {
      const compile = this.compilationCallback.bind(this);

      compiler.hooks.compilation.tap(this.PluginName, compile);
    } else {
      compiler.plugin('compilation', compile);
    }
  }

  compilationCallback(compilation) {
    const paths = this.options.paths;

    const registerCb = (htmlPluginData, callback) => {
      for (let i = paths.length - 1; i >= 0; i--) {
        // 处理css文件
        if (/(\.css)/.test(paths[i])) {
          htmlPluginData.assets.css.unshift(paths[i]);
        }
        // 处理js文件
        if (/(\.js)/.test(paths[i])) {
          htmlPluginData.assets.js.unshift(paths[i]);
        }
      }

      if (callback) {
        return callback(null, htmlPluginData);
      } else {
        return Promise.resolve(htmlPluginData);
      }
    };

    // v4
    if ('hooks' in compilation) {
      // If our target hook is not present, throw a descriptive error
      if (!compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing) {
        throw new Error(
          'The expected HtmlWebpackPlugin hook was not found! Ensure HtmlWebpackPlugin is installed and' +
            ' was initialized before this plugin.'
        );
      }
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        this.PluginName,
        registerCb
      );
    } else {
      compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        registerCb
      );
    }
  }
}

module.exports = InjectSourcePlugin;

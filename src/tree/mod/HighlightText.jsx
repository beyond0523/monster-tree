import React, { PureComponent } from 'react';
import PropsType from 'prop-types';
import { CSS_PREFIX } from '../constant.js';

/**
 * 文字高亮
 * @param text 文本
 * @param mark 高亮文字
 */
class HightlightText extends PureComponent {
  static propTypes = {
    text: PropsType.string.isRequired,
    mark: PropsType.string.isRequired,
  };

  renderText = () => {
    const { text, mark } = this.props;
    const splitRaw = text.split(mark);
    const splitLen = splitRaw.length;

    return splitRaw.map((partStr, index) => (
      <React.Fragment key={`text-${text}-${mark}-${index}`}>
        {partStr}
        {index < splitLen - 1 ? <span className={`${CSS_PREFIX}-tree-node-highlight`}>{mark}</span> : ''}
      </React.Fragment>
    ));
  };

  render() {
    return <span>{this.renderText()}</span>;
  }
}

export default HightlightText;

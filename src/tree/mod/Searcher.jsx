import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, message, Icon } from 'antd';
import { STATICS } from '../constant';

/**
 * 搜索框
 * @param onSearch 确认搜索
 * @param inputSetting Input.Search其余设置
 * @param disabled 禁用
 * @param text 外部text， 不一致时清空
 */
class Searcher extends PureComponent {

  static propTypes = {
    onSearch: PropTypes.func,
    inputSetting: PropTypes.object,
    disabled: PropTypes.bool,
    text: PropTypes.string,
  };

  static defaultProps = {
    inputSetting: {
      size: 'default',
    }
  }
  
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.text !== state.outerText) {
      return {
        value: nextProps.text,
        outerText: nextProps.text,
      }
    }
    return null;
  }

  state = {
    value: '',
    outerText: '',
  };

  componentWillUnmount() {
    this.setState = () => {};
  }

  onHandleClear = e => {
    this.setState({
      value: e.target.value,
    });

    if (!e.target.value) {
      const { onSearch } = this.props;
      if (onSearch) {
        onSearch('');
      }
    }
  };

  onHandleSearch = () => {
    const { value } = this.state;
    const { onSearch } = this.props;

    if (!value) {
      message.warning('搜索内容不能为空!');
      return;
    }

    if (value.length < STATICS.SEARCH_CHAR_LIMIT) {
      message.warning(`请输入至少${STATICS.SEARCH_CHAR_LIMIT}个字符!`);
      return;
    }

    if (onSearch) {
      onSearch(value);
    }
  };

  render() {  
    const { inputSetting, disabled } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <Input
          placeholder="搜索区域"
          allowClear
          disabled={disabled}
          {...inputSetting}
          value={value}
          onPressEnter={this.onHandleSearch}
          onChange={this.onHandleClear}
          suffix={
            <Icon type="hz-search" theme="outlined" onClick={this.onHandleSearch} />
          }
        />
      </React.Fragment>
    );
  }
}

export default Searcher;

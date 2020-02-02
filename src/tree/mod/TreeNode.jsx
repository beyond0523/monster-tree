import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Checkbox } from 'antd';
import { CSS_PREFIX, STATICS } from '../constant.js';

/**
 * @param vTreeNode 经处理的树数据
 * @param isChild 是否存在下级
 * @param isExpanded 是否展开
 * @param isChecked 是否选中
 * @param isHalfChecked 是否为半选复选框
 * @param isLoading （异步树据）是否加载中
 * @param isSelected 是否选择
 * @param checkable 是否存在复选框
 * @param switcherIcon 展开标志
 * @param onExpand 点击展开按钮
 * @param onCheck 点击勾选框
 * @param onSelect 点击内容区
 * @param disableCheckbox 是否禁用复选框
 * @param disabled 是否禁用
 */
class TreeNode extends PureComponent {
  static propTypes = {
    vTreeNode: PropTypes.object,
    isChild: PropTypes.bool,
    isExpanded: PropTypes.bool,
    isChecked: PropTypes.bool,
    isHalfChecked: PropTypes.bool,
    isLoading: PropTypes.bool,
    isSelected: PropTypes.bool,
    checkable: PropTypes.bool,
    switcherIcon: PropTypes.element,
    onExpand: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    onCheck: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    onSelect: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    disableCheckbox: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.element,
  };

  onExpand = () => {
    const { vTreeNode, onExpand } = this.props;

    if (onExpand) {
      onExpand(vTreeNode);
    }
  };

  onCheck = () => {
    const { vTreeNode, onCheck } = this.props;

    if (onCheck) {
      onCheck(vTreeNode);
    }
  };

  onSelect = () => {
    const { vTreeNode, onSelect } = this.props;

    if (onSelect) {
      onSelect(vTreeNode);
    }
  };

  renderSwitchIcon = () => {
    const { switcherIcon, isLoading, isExpanded, isChild, disabled } = this.props;
    if (isChild && switcherIcon) {
      return <div className={`${CSS_PREFIX}-tree-icon`} style={{ display: 'inline-block' }} onClick={this.onExpand}>{switcherIcon}</div>;
    }

    if (!isLoading && isChild) {
      return (
        <Icon
          // style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          className={`${CSS_PREFIX}-tree-icon ${isExpanded ? `${CSS_PREFIX}-tree-icon-down` : ''}`}
          onClick={this.onExpand}
          type="caret-right"
        />
      );
    }

    if (isLoading && isChild) {
      return (
        <Icon
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          className={`${CSS_PREFIX}-tree-icon`}
          type="loading"
        />
      );
    }

    return null;
  }

  renderCheckbox = () => {
    const { checkable, disableCheckbox, isChecked, isHalfChecked } = this.props;
    if (!checkable) {
      return null;
    }

    return (
      <Checkbox
        style={{ margin: '0 4px 0 2px' }}
        checked={isChecked}
        indeterminate={isHalfChecked}
        onClick={this.onCheck}
        disabled={disableCheckbox}
      />
    );
  }

  render() {
    const {
      vTreeNode,
      isChild,
      isSelected,
      disabled,
      children,
    } = this.props;

    return (
      <div
        key={vTreeNode.treeKey}
        className={`${CSS_PREFIX}-tree-node`}
        style={{
          marginLeft: (vTreeNode.layer - 1) * 18,
          height: STATICS.ROW_HEIGHT,
        }}
      > 
        {this.renderSwitchIcon()}
        {!isChild && <div style={{ width: '24px', height: 'auto', display: 'inline-block' }} />}
        {this.renderCheckbox()}
        <div
          className={`${CSS_PREFIX}-tree-content ${isSelected ? `${CSS_PREFIX}-tree-content-selected` : ''}`}
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            color: disabled ? '#ccc' : '',
          }}
          onClick={this.onSelect}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default TreeNode;

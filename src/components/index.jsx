import React from "react";

import UnstableFastTree from "../UnstableFastTree";
import Renderers from "../renderers";
import { constructTree } from "../toolbelt";
import TreeState from "../state/TreeState";

import "react-virtualized/styles.css";

const MIN_NUMBER_OF_PARENTS = 1;
const MAX_NUMBER_OF_CHILDREN = 300;
const MAX_DEEPNESS = 4;

const { Deletable, Expandable, Favorite } = Renderers;

const Nodes = constructTree(
  MAX_DEEPNESS,
  MAX_NUMBER_OF_CHILDREN,
  MIN_NUMBER_OF_PARENTS
);

const getTotalNumberOfElements = (nodes, counter = 0) => {
  return (
    counter +
    nodes.length +
    nodes.reduce((acc, n) => getTotalNumberOfElements(n.children, acc), 0)
  );
};

const totalNumberOfNodes = getTotalNumberOfElements(Nodes);

export default class Main extends React.PureComponent {
  state = {
    nodes: TreeState.createFromTree(Nodes)
  };

  handleChange = nodes => {
    this.setState({ nodes });
  };

  handleClick = node => {
    if (node.children.length === 0) {
      this.setState({
        bRefresh: false
      });
    }
  };

  render() {
    return (
      <>
        <p>当前累计渲染节点：{totalNumberOfNodes}</p>
        <div style={{ position: "relative", height: 800 }}>
          <UnstableFastTree
            nodes={this.state.nodes}
            onChange={this.handleChange}
          >
            {({ style, node, ...rest }) => (
              <div style={style} onClick={this.clickTest}>
                <Expandable node={node} {...rest}>
                  {node.children.length ? (
                    <React.Fragment>
                      {node.name}
                      <Deletable node={node} {...rest}>
                        <Favorite node={node} {...rest} />
                      </Deletable>
                    </React.Fragment>
                  ) : (
                    <span
                      id={node.id}
                      className="draggable"
                      draggable="true"
                      onClick={() => this.handleClick(node)}
                      onDragStart={() => console.log("drag")}
                    >
                      {node.name}
                      <Deletable node={node} {...rest}>
                        <Favorite node={node} {...rest} />
                      </Deletable>
                    </span>
                  )}
                </Expandable>
              </div>
            )}
          </UnstableFastTree>
        </div>
      </>
    );
  }
}

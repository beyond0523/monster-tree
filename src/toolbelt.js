let ids = {};

const getUniqueId = () => {
  const candidateId = Math.round(Math.random() * 1000000000);

  if (ids[candidateId]) {
    return getUniqueId();
  }

  ids[candidateId] = true;

  return candidateId;
};

export const constructTree = (maxDeepness, maxNumberOfChildren, minNumOfNodes, deepness = 1) => {
  return new Array(minNumOfNodes).fill(deepness).map((si, i) => {
    const id = getUniqueId();
    const numberOfChildren = deepness === maxDeepness ? 0 : Math.round(Math.random() * maxNumberOfChildren);

    return {
      id,
      name: `节点 ${id}`,
      children: numberOfChildren ? constructTree(maxDeepness, maxNumberOfChildren, numberOfChildren, deepness + 1) : [],
      state: {
        expanded: false,
        favorite: Boolean(Math.round(Math.random())),
        deletable: Boolean(Math.round(Math.random())),
      },
    };
  });
};

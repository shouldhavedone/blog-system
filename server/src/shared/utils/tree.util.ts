export const buildTree = (data) => {
  const map = {};
  const result = [];
  data.forEach(item => {
    item.children = [];
    map[item.id] = item;
    const parentId = item.treePath?.split(',').pop();
    if (parentId !== '0') {
      const parent = map[parentId];
      if(parent) {
        parent.children.push(item);
      } else {
        result.push(item);
      }
    } else {
      result.push(item);
    }
  });
  return result;
}


export const filterToOption = (data: any) => {
  if (!data || data.length === 0) {
    return [];
  }
  return data.map((node) => {
    const newNode = {
      label: node.name,
      value: node.id,
      children: node?.children,
    };
    if (node.children && node.children.length > 0) {
      newNode.children = filterToOption(node.children);
    }
    return newNode;
  });
}
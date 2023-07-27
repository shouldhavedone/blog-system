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

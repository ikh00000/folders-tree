import { TreeNodeType } from '../components/TreeNode/types';

export const buildTree = (paths: string[]): TreeNodeType => {
  const tree: TreeNodeType = {};

  paths.forEach((path) => {
    const normalizedPath = path.replace(/^\/|\/$/g, '');
    const parts = normalizedPath.split('/').filter(Boolean);

    addToTree(tree, parts, path);
  });

  cleanTree(tree);

  return tree;
};

const addToTree = (
  node: TreeNodeType,
  parts: string[],
  fullPath: string
): void => {
  if (parts.length === 0) {
    return;
  }

  const part = parts.shift();
  if (!part) {
    return;
  }

  if (!node[part]) {
    node[part] = {};
  }

  const currentNode = node[part];

  if (typeof currentNode !== 'object') {
    return;
  }

  if (fullPath.endsWith('/')) {
    currentNode.__isEmptyFolder = true;
  } else {
    currentNode.__isFile = true;
  }

  addToTree(currentNode, parts, fullPath);
};

const cleanTree = (node: TreeNodeType): void => {
  Object.keys(node).forEach((key) => {
    const child = node[key];
    if (typeof child === 'object' && child !== null) {
      cleanTree(child);

      const wasFileBeforeEmptyFolder = child.__isFile && child.__isEmptyFolder;
      if (wasFileBeforeEmptyFolder) {
        delete child.__isFile;
      }

      const isFileHasChild = child.__isFile && Object.keys(child).length > 1;
      if (isFileHasChild) {
        delete child.__isFile;
      }

      const isEmptyHasChild =
        child.__isEmptyFolder && Object.keys(child).length > 1;
      if (isEmptyHasChild) {
        delete child.__isEmptyFolder;
      }
    }
  });
};

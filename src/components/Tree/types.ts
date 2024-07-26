import { TreeNodeType } from '../TreeNode/types';

export const resultExceptions = {
  EMPTY_TREE: 'EMPTY_TREE' as const,
  EMPTY_TREE_AND_TEXTAREA: 'EMPTY_TREE_AND_TEXTAREA' as const,
  ERROR: 'ERROR' as const,
};

export type TreeResult =
  | TreeNodeType
  | (typeof resultExceptions)[keyof typeof resultExceptions];

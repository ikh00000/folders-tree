export interface TreeNodeType {
  [key: string]: TreeNodeType | true | undefined;
  __isEmptyFolder?: true;
  __isFile?: true;
}

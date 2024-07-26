import { buildTree } from './buildTree';
import { TreeNodeType } from '../components/TreeNode/types';

type Paths = string[];

describe('buildTree', () => {
  test('handles empty paths array as empty object', () => {
    const paths: Paths = [];
    const expectedTree: TreeNodeType = {};

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('handles path "" as empty object', () => {
    const paths: Paths = [''];
    const expectedTree: TreeNodeType = {};

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('handles path "/" as empty object', () => {
    const paths: Paths = ['/'];
    const expectedTree: TreeNodeType = {};

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('handles path "root" as file', () => {
    const paths: Paths = ['root'];
    const expectedTree: TreeNodeType = {
      root: {
        __isFile: true,
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('handles path "/root" as file', () => {
    const paths: Paths = ['/root'];
    const expectedTree: TreeNodeType = {
      root: {
        __isFile: true,
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('handles path "root/" as empty folder', () => {
    const paths: Paths = ['root/'];
    const expectedTree: TreeNodeType = {
      root: {
        __isEmptyFolder: true,
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('handles path "/root/" as empty folder', () => {
    const paths: Paths = ['/root/'];
    const expectedTree: TreeNodeType = {
      root: {
        __isEmptyFolder: true,
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('handles the same name for root and folder', () => {
    const paths: Paths = ['root', 'root/some'];
    const expectedTree: TreeNodeType = {
      root: {
        some: {
          __isFile: true,
        },
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('does not change root from file to folder', () => {
    const paths: Paths = ['root/some', 'root'];
    const expectedTree: TreeNodeType = {
      root: {
        some: {
          __isFile: true,
        },
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('creates deep folders structure', () => {
    const paths: Paths = [
      'root/smth/',
      'root/smth/file',
      'root/smth/folder',
      'root/smth/folder/',
      'root/smth/folder2/folder3/folder4/folder5/',
    ];
    const expectedTree: TreeNodeType = {
      root: {
        smth: {
          file: {
            __isFile: true,
          },
          folder: {
            __isEmptyFolder: true,
          },
          folder2: {
            folder3: {
              folder4: {
                folder5: {
                  __isEmptyFolder: true,
                },
              },
            },
          },
        },
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('removes __isEmptyFolder parameter from root', () => {
    const paths: Paths = ['root/', 'root/file'];
    const expectedTree: TreeNodeType = {
      root: {
        file: {
          __isFile: true,
        },
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('normalizes paths with multiple slashes', () => {
    const paths: Paths = ['/root//file', '///root/other/'];
    const expectedTree: TreeNodeType = {
      root: {
        file: {
          __isFile: true,
        },
        other: {
          __isEmptyFolder: true,
        },
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });

  test('handles file and folder with the same name', () => {
    const paths: Paths = ['root/file', 'root/file/child'];
    const expectedTree: TreeNodeType = {
      root: {
        file: {
          child: {
            __isFile: true,
          },
        },
      },
    };

    expect(buildTree(paths)).toStrictEqual(expectedTree);
  });
});

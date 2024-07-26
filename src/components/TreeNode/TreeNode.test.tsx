import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TreeNode from './TreeNode';
import { TreeNodeType } from './types';

const mockNode: TreeNodeType = {
  'child-folder': {
    children: {
      'child-file.txt': {
        __isFile: true,
      },
    },
  },
};

const mockFileNode: TreeNodeType = {
  __isFile: true,
};

describe('TreeNode Component', () => {
  it('renders folder node correctly', () => {
    render(<TreeNode name="root-folder" node={mockNode} />);

    expect(screen.getByText('root-folder')).toBeInTheDocument();
  });

  it('renders file node correctly', () => {
    render(<TreeNode name="file.txt" node={mockFileNode} />);

    expect(screen.getByText('file.txt')).toBeInTheDocument();
  });

  it('toggles open state for folders', () => {
    render(<TreeNode name="root-folder" node={mockNode} />);
    const folder = screen.getByText('root-folder');

    // Initially open, so child folder should be visible
    expect(screen.getByText('child-folder')).toBeInTheDocument();

    fireEvent.click(folder);
    expect(screen.queryByText('child-folder')).not.toBeInTheDocument();

    fireEvent.click(folder);
    expect(screen.getByText('child-folder')).toBeInTheDocument();
  });

  it('renders the correct icon for closed folders', () => {
    render(<TreeNode name="root-folder" node={mockNode} />);
    const folder = screen.getByText('root-folder');

    fireEvent.click(folder);
    const closedFolderIcon = screen.getByRole('img', { name: 'right-arrow' });

    expect(closedFolderIcon).toBeInTheDocument();
  });

  it('renders the correct icon for files', () => {
    render(<TreeNode name="file.txt" node={mockFileNode} />);
    const fileIconElement = screen.getByRole('img', { name: 'file-icon' });

    expect(fileIconElement).toBeInTheDocument();
  });
});

import React from 'react';
import '@testing-library/jest-dom';
import Tree from './Tree';
import { resultExceptions } from './types';
import { text } from '../../helpers';
import { render, screen } from '../../utils/test-util';
import { useResultContext } from '../../contexts/ResultContext';

jest.mock('../../contexts/ResultContext', () => ({
  useResultContext: jest.fn(),
}));

describe('Tree Component', () => {
  beforeEach(() => {
    (useResultContext as jest.Mock).mockClear();
  });

  test('renders the "empty_tree" state correctly', () => {
    (useResultContext as jest.Mock).mockReturnValue({
      result: resultExceptions.EMPTY_TREE,
    });

    render(<Tree />);

    expect(screen.getByText(text.nothingToRender)).toBeInTheDocument();
  });

  test('renders the "EMPTY_TREE_AND_TEXTAREA" state correctly', () => {
    (useResultContext as jest.Mock).mockReturnValue({
      result: resultExceptions.EMPTY_TREE_AND_TEXTAREA,
    });

    render(<Tree />);

    expect(screen.getByText(text.emptyResult)).toBeInTheDocument();
  });

  test('renders the "error" state correctly', () => {
    (useResultContext as jest.Mock).mockReturnValue({
      result: resultExceptions.ERROR,
    });

    render(<Tree />);

    expect(screen.getByText(text.invalidFormat)).toBeInTheDocument();
  });

  test('renders TreeNode components correctly when result is a valid tree', () => {
    const mockTree = {
      root: {
        child1: {
          grandchild1: {},
        },
        child2: {},
      },
    };

    (useResultContext as jest.Mock).mockReturnValue({ result: mockTree });

    render(<Tree />);

    expect(screen.getByText('root')).toBeInTheDocument();
    expect(screen.getByText('child1')).toBeInTheDocument();
    expect(screen.getByText('child2')).toBeInTheDocument();
    expect(screen.getByText('grandchild1')).toBeInTheDocument();
  });
});

import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateButton from './CreateButton';
import { resultExceptions } from '../Tree/types';
import { text } from '../../helpers';
import { render } from '../../utils/test-util';
import { buildTree } from '../../utils/buildTree';
import { useResultContext } from '../../contexts/ResultContext';
import { useTextareaContext } from '../../contexts/TextareaContext';

jest.mock('../../contexts/ResultContext');
jest.mock('../../contexts/TextareaContext');
jest.mock('../../utils/buildTree');

const mockSetResult = jest.fn();
const mockTextareaValue = '';

(useResultContext as jest.Mock).mockReturnValue({ setResult: mockSetResult });
(useTextareaContext as jest.Mock).mockReturnValue({
  textareaValue: mockTextareaValue,
});

describe('CreateButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with correct text', () => {
    const { getByText } = render(<CreateButton />);
    expect(getByText(text.createBtn)).toBeInTheDocument();
  });

  it('handles create with empty textarea and example paths', () => {
    (useTextareaContext as jest.Mock).mockReturnValueOnce({
      textareaValue: '',
    });
    (buildTree as jest.Mock).mockReturnValueOnce({});

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(
      resultExceptions.EMPTY_TREE_AND_TEXTAREA
    );
  });

  it('handles create with empty textarea and non-empty tree', () => {
    const mockTree = { root: {} };
    (useTextareaContext as jest.Mock).mockReturnValueOnce({
      textareaValue: '',
    });
    (buildTree as jest.Mock).mockReturnValueOnce(mockTree);

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(mockTree);
  });

  it('handles create with invalid JSON in textarea', () => {
    (useTextareaContext as jest.Mock).mockReturnValueOnce({
      textareaValue: 'invalid JSON',
    });

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(resultExceptions.ERROR);
  });

  it('handles create with valid JSON in textarea resulting in empty tree', () => {
    (useTextareaContext as jest.Mock).mockReturnValueOnce({
      textareaValue: '[]',
    });
    (buildTree as jest.Mock).mockReturnValueOnce({});

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(resultExceptions.EMPTY_TREE);
  });

  it('handles create with valid JSON in textarea resulting in non-empty tree', () => {
    const mockTree = { root: {} };
    (useTextareaContext as jest.Mock).mockReturnValueOnce({
      textareaValue: '["path"]',
    });
    (buildTree as jest.Mock).mockReturnValueOnce(mockTree);

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(mockTree);
  });
});

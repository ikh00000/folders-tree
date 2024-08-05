import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateButton from './CreateButton';
import { resultExceptions } from '../Tree/types';
import { text } from '../../helpers';
import { render } from '../../utils/test-util';
import { buildTree } from '../../utils/buildTree';
import { useResultContext } from '../../contexts/ResultContext';
import { useTextareaRefContext } from '../../contexts/TextareaRefContext';
jest.mock('../../contexts/ResultContext');
jest.mock('../../contexts/TextareaRefContext');
jest.mock('../../utils/buildTree');

const mockSetResult = jest.fn();
const mockTextareaRef = { current: { value: '' } };
const mockSetTextareaValue = jest.fn();

(useResultContext as jest.Mock).mockReturnValue({ setResult: mockSetResult });
(useTextareaRefContext as jest.Mock).mockReturnValue({
  textareaRef: mockTextareaRef,
  setTextareaValue: mockSetTextareaValue,
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
    (useTextareaRefContext as jest.Mock).mockReturnValueOnce({
      textareaRef: { current: { value: '' } },
      setTextareaValue: mockSetTextareaValue,
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
    (useTextareaRefContext as jest.Mock).mockReturnValueOnce({
      textareaRef: { current: { value: '' } },
      setTextareaValue: mockSetTextareaValue,
    });
    (buildTree as jest.Mock).mockReturnValueOnce(mockTree);

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(mockTree);
  });

  it('handles create with invalid JSON in textarea', () => {
    (useTextareaRefContext as jest.Mock).mockReturnValueOnce({
      textareaRef: { current: { value: 'invalid JSON' } },
      setTextareaValue: mockSetTextareaValue,
    });

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(resultExceptions.ERROR);
  });

  it('handles create with valid JSON in textarea resulting in empty tree', () => {
    (useTextareaRefContext as jest.Mock).mockReturnValueOnce({
      textareaRef: { current: { value: '[]' } },
      setTextareaValue: mockSetTextareaValue,
    });
    (buildTree as jest.Mock).mockReturnValueOnce({});

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(resultExceptions.EMPTY_TREE);
  });

  it('handles create with valid JSON in textarea resulting in non-empty tree', () => {
    const mockTree = { root: {} };
    (useTextareaRefContext as jest.Mock).mockReturnValueOnce({
      textareaRef: { current: { value: '["path"]' } },
      setTextareaValue: mockSetTextareaValue,
    });
    (buildTree as jest.Mock).mockReturnValueOnce(mockTree);

    const { getByText } = render(<CreateButton />);
    fireEvent.click(getByText(text.createBtn));

    expect(mockSetResult).toHaveBeenCalledWith(mockTree);
  });
});

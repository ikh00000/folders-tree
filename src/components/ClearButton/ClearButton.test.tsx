import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClearButton from './ClearButton';
import { resultExceptions } from '../Tree/types';
import { text } from '../../helpers';
import { render } from '../../utils/test-util';
import { useResultContext } from '../../contexts/ResultContext';
import { useTextareaContext } from '../../contexts/TextareaContext';

jest.mock('../../contexts/ResultContext');
jest.mock('../../contexts/TextareaContext');

const mockSetResult = jest.fn();
const mockSetTextareaValue = jest.fn();

(useResultContext as jest.Mock).mockReturnValue({ setResult: mockSetResult });
(useTextareaContext as jest.Mock).mockReturnValue({
  setTextareaValue: mockSetTextareaValue,
});

describe('ClearButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with correct text', () => {
    const { getByText } = render(<ClearButton />);
    expect(getByText(text.clearBtn)).toBeInTheDocument();
  });

  it('handles clear action correctly', () => {
    const { getByText } = render(<ClearButton />);
    fireEvent.click(getByText(text.clearBtn));

    expect(mockSetTextareaValue).toHaveBeenCalledWith('');
    expect(mockSetResult).toHaveBeenCalledWith(
      resultExceptions.EMPTY_TREE_AND_TEXTAREA
    );
  });
});

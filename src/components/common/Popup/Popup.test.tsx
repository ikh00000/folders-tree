import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import Popup from './Popup';
import Text from '../Text';
import { render, screen } from '../../../utils/test-util';

describe('Popup Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the popup with title and text', () => {
    render(
      <Popup title="Test Title" text="This is a test" onClose={mockOnClose} />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(
      <Popup title="Test Title" text="This is a test" onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking outside the popup', () => {
    render(
      <Popup title="Test Title" text="This is a test" onClose={mockOnClose} />
    );

    fireEvent.mouseDown(document);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the popup', () => {
    render(
      <Popup title="Test Title" text="This is a test" onClose={mockOnClose} />
    );

    fireEvent.mouseDown(screen.getByText('Test Title'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('renders the children instead of text if children are provided', () => {
    render(
      <Popup title="Test Title" onClose={mockOnClose}>
        <Text>Child Content</Text>
      </Popup>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});

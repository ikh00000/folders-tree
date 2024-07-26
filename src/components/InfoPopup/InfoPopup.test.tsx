import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoPopup from './InfoPopup';
import { text } from '../../helpers';

interface PopupProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

jest.mock('../common/Popup', () => {
  return ({ title, onClose, children }: PopupProps) => (
    <div>
      <h1>{title}</h1>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
});

jest.mock('./content', () => () => <div>Some Info Content</div>);

describe('InfoPopup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render the popup when isOpen is false', () => {
    const { queryByText } = render(
      <InfoPopup isOpen={false} onClose={jest.fn()} />
    );
    expect(queryByText(text.howItWorks)).not.toBeInTheDocument();
  });

  it('renders the popup when isOpen is true', () => {
    const { getByText } = render(
      <InfoPopup isOpen={true} onClose={jest.fn()} />
    );
    expect(getByText(text.howItWorks)).toBeInTheDocument();
    expect(getByText('Some Info Content')).toBeInTheDocument();
  });

  it('calls the onClose callback when close action is triggered', () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(
      <InfoPopup isOpen={true} onClose={mockOnClose} />
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});

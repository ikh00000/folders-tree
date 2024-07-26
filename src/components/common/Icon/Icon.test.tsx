import React from 'react';
import '@testing-library/jest-dom';
import Icon from './Icon';
import { render, screen } from '../../../utils/test-util';

describe('Icon Component', () => {
  test('renders an image with correct src attribute', () => {
    const src = 'some/path/to/file';
    render(<Icon src={src} alt="test-icon" />);
    const icon = screen.getByRole('img');

    expect(icon).toHaveAttribute('src', src);
  });

  test('renders an image with correct alt text', () => {
    const altText = 'test-icon';
    render(<Icon src="some/path/to/file" alt={altText} />);
    const icon = screen.getByRole('img');

    expect(icon).toHaveAttribute('alt', altText);
  });

  test('applies correct default style', () => {
    const { container } = render(
      <Icon src="some/path/to/file" alt="test-icon" />
    );
    const icon = container.querySelector('img');

    expect(icon).toHaveStyle('width: 15px');
  });

  test('renders image with additional props', () => {
    render(
      <Icon
        src="some/path/to/file"
        alt="test-icon"
        style={{ height: '30px', width: '30px' }}
        title="Icon Title"
      />
    );
    const icon = screen.getByRole('img');

    expect(icon).toHaveAttribute('src', 'some/path/to/file');
    expect(icon).toHaveAttribute('alt', 'test-icon');
    expect(icon).toHaveAttribute('title', 'Icon Title');
    expect(icon).toHaveStyle('height: 30px');
    expect(icon).toHaveStyle('width: 30px');
  });
});

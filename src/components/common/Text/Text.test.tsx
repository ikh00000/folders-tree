import React from 'react';
import '@testing-library/jest-dom';
import Text from './Text';
import theme from '../../../styles/styles-theme';

import { render, screen } from '../../../utils/test-util';

describe('Text Component', () => {
  test('renders with default props', () => {
    render(<Text>Default Text</Text>);
    const textElement = screen.getByText('Default Text');

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle(`font-size: ${theme.fontSize.medium}`);
    expect(textElement).toHaveStyle(`text-align: left`);
  });

  test('renders with small variant', () => {
    render(<Text variant="small">Small Text</Text>);
    const textElement = screen.getByText('Small Text');

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle(`font-size: ${theme.fontSize.small}`);
  });

  test('renders with large variant', () => {
    render(<Text variant="large">Large Text</Text>);
    const textElement = screen.getByText('Large Text');

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle(`font-size: ${theme.fontSize.large}`);
  });

  test('renders with textAlign center', () => {
    render(<Text textAlign="center">Centered Text</Text>);
    const textElement = screen.getByText('Centered Text');

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle(`text-align: center`);
  });

  test('renders with textAlign right', () => {
    render(<Text textAlign="right">Right Aligned Text</Text>);
    const textElement = screen.getByText('Right Aligned Text');

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle(`text-align: right`);
  });
});

import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import Button from './Button';
import { render, screen } from '../../../utils/test-util';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Text</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Text');
  });

  test('button click triggers event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Text</Button>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('button receives custom props', () => {
    render(<Button disabled>Text</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
});

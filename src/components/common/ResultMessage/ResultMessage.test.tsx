import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ResultMessage from './ResultMessage';

const theme = {
  colors: {
    placeholder: '#999999',
  },
};

describe('ResultMessage Component', () => {
  it('renders the correct text', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResultMessage text="Test Message" />
      </ThemeProvider>
    );

    expect(getByText('Test Message')).toBeInTheDocument();
  });

  it('uses the color prop when provided', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResultMessage text="Test Message" color="#ff0000" />
      </ThemeProvider>
    );

    expect(getByText('Test Message')).toHaveStyle('color: #ff0000');
  });

  it('uses the default color from the theme when no color prop is provided', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResultMessage text="Test Message" />
      </ThemeProvider>
    );

    expect(getByText('Test Message')).toHaveStyle(
      `color: ${theme.colors.placeholder}`
    );
  });
});

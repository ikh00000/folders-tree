import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { render, RenderOptions } from '@testing-library/react';
import theme from '../styles/styles-theme';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/styles-theme';
import { ResultProvider } from '../../contexts/ResultContext';
import { TextareaRefProvider } from '../../contexts/TextareaRefContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextareaRefProvider>
        <ResultProvider>{children}</ResultProvider>
      </TextareaRefProvider>
    </ThemeProvider>
  );
};

export default Providers;

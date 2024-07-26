import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/styles-theme';
import { ResultProvider } from '../../contexts/ResultContext';
import { TextareaProvider } from '../../contexts/TextareaContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextareaProvider>
        <ResultProvider>{children}</ResultProvider>
      </TextareaProvider>
    </ThemeProvider>
  );
};

export default Providers;

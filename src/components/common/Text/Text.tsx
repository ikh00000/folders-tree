import React from 'react';
import styled, { css } from 'styled-components';

interface StyledTextProps {
  variant: 'small' | 'medium' | 'large' | 'xlarge';
  $textAlign?: 'left' | 'center' | 'right';
  $color?: string;
}

const StyledText = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !['variant', '$textAlign', '$color'].includes(prop),
})<StyledTextProps>`
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme, $color }) => $color || theme.colors.primaryText};
  ${({ variant, $textAlign, theme }) => css`
    font-size: ${theme.fontSize[variant]};
    text-align: ${$textAlign};
  `}
`;

interface TextProps {
  children: React.ReactNode;
  variant?: 'small' | 'medium' | 'large' | 'xlarge';
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'medium',
  textAlign = 'left',
  color,
}) => {
  return (
    <StyledText variant={variant} $textAlign={textAlign} $color={color}>
      {children}
    </StyledText>
  );
};

export default Text;

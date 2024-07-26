import React from 'react';
import styled from 'styled-components';

interface StyledResultMessageProps {
  color?: string;
}

interface ResultMessageProps {
  text: string;
  color?: string;
}

const StyledResultMessage = styled.p<StyledResultMessageProps>`
  color: ${({ color, theme }) => color || theme.colors.placeholder};
`;

const ResultMessage: React.FC<ResultMessageProps> = ({ text, color }) => {
  return <StyledResultMessage color={color}>{text}</StyledResultMessage>;
};

export default ResultMessage;

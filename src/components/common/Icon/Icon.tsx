import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.img`
  width: ${({ theme }) => theme.iconWidth};
`;

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Icon: React.FC<ImgProps> = (props) => {
  return <StyledIcon {...props} />;
};

export default Icon;

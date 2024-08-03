import React, { useState } from 'react';
import { useTextareaRefContext } from '../../contexts/TextareaRefContext';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  width: 100%;
  max-width: 50rem;
  min-width: 20rem;
  min-height: 20rem;
  padding: 0.5rem;
  margin: 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.medium};
  background: ${({ theme }) => theme.colors.grayBackground};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = (props) => {
  const [state, setState] = useState('');
  const { textareaRef } = useTextareaRefContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(e.target.value);
  };

  return (
    <StyledTextarea
      ref={textareaRef}
      id="textarea"
      value={state}
      onChange={handleChange}
      {...props}
    />
  );
};

export default Textarea;

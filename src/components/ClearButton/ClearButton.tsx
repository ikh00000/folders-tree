import React from 'react';
import Button from '../common/Button';
import { text } from '../../helpers/index';
import { useResultContext } from '../../contexts/ResultContext';
import { useTextareaContext } from '../../contexts/TextareaContext';
import { resultExceptions } from '../Tree/types';

const ClearButton: React.FC = () => {
  const { setResult } = useResultContext();
  const { setTextareaValue } = useTextareaContext();

  const handleClear = () => {
    setTextareaValue('');
    setResult(resultExceptions.EMPTY_TREE_AND_TEXTAREA);
  };

  return <Button onClick={handleClear}>{text.clearBtn}</Button>;
};

export default React.memo(ClearButton);

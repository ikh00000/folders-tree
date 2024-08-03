import React from 'react';
import Button from '../common/Button/Button';
import { resultExceptions } from '../Tree/types';
import { text } from '../../helpers/index';
import { pathsExample } from '../../helpers/index';
import { buildTree } from '../../utils/buildTree';
import { useResultContext } from '../../contexts/ResultContext';
import { useTextareaRefContext } from '../../contexts/TextareaRefContext';

const CreateButton: React.FC = () => {
  const { setResult } = useResultContext();
  const { textareaRef, setTextareaValue } = useTextareaRefContext();

  const handleCreate = () => {
    const textareaValue = textareaRef.current?.value;

    try {
      let paths;

      if (textareaValue) {
        setTextareaValue(textareaValue);
        paths = JSON.parse(textareaValue);
      } else {
        paths = pathsExample;
      }

      const tree = buildTree(paths);

      const treeIsNotEmpty = Boolean(Object.keys(tree).length);

      if (!treeIsNotEmpty && !textareaValue) {
        setResult(resultExceptions.EMPTY_TREE_AND_TEXTAREA);
      } else if (!treeIsNotEmpty && textareaValue) {
        setResult(resultExceptions.EMPTY_TREE);
      } else if (treeIsNotEmpty) {
        setResult(tree);
      }
    } catch (e) {
      setResult(resultExceptions.ERROR);
    }
  };

  return <Button onClick={handleCreate}>{text.createBtn}</Button>;
};

export default CreateButton;

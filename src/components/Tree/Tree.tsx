import React from 'react';
import styled from 'styled-components';
import { resultExceptions } from './types';
import { TreeNodeType } from '../TreeNode/types';
import TreeNode from '../TreeNode/TreeNode';
import ResultMessage from '../common/ResultMessage/ResultMessage';
import { text } from '../../helpers';
import theme from '../../styles/styles-theme';
import { useResultContext } from '../../contexts/ResultContext';

const TreeContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  min-width: 20rem;
  min-height: 20rem;
  padding: 0.5rem;
  margin: 1rem 0;
  overflow-x: scroll;
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.grayBackground};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Tree: React.FC = () => {
  const { result } = useResultContext();

  if (result === resultExceptions.EMPTY_TREE) {
    return (
      <TreeContainer>
        <ResultMessage
          color={theme.colors.primary}
          text={text.nothingToRender}
        />
      </TreeContainer>
    );
  }

  if (result === resultExceptions.EMPTY_TREE_AND_TEXTAREA) {
    return (
      <TreeContainer>
        <ResultMessage text={text.emptyResult} />
      </TreeContainer>
    );
  }

  if (result === resultExceptions.ERROR) {
    return (
      <TreeContainer>
        <ResultMessage color={theme.colors.primary} text={text.invalidFormat} />
      </TreeContainer>
    );
  }

  if (typeof result === 'object' && result !== null) {
    const nodesToRender = Object.keys(result as TreeNodeType);

    return (
      <TreeContainer>
        {nodesToRender.map((nodeName) => {
          const childNode = (result as TreeNodeType)[nodeName];
          if (typeof childNode === 'object' && childNode !== null) {
            return <TreeNode key={nodeName} name={nodeName} node={childNode} />;
          }
          return null;
        })}
      </TreeContainer>
    );
  }

  return null;
};

export default Tree;

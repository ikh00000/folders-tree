import React, { useState } from 'react';
import styled from 'styled-components';
import { TreeNodeType } from './types';
import Icon from '../common/Icon';
import fileIcon from '../../assets/icons/fileIcon.svg';
import arrowIcon from '../../assets/icons/arrowIcon.svg';

export const TreeNodeContainer = styled.div`
  padding-left: 20px;
`;

export const TreeNodeHeader = styled.div<{ $isFile: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.$isFile ? 'default' : 'pointer')};
`;

export const TreeNodeContent = styled.div`
  margin-top: 0.5rem;
`;

export interface TreeNodeProps {
  name: string;
  node: TreeNodeType;
}

const TreeNode: React.FC<TreeNodeProps> = ({ name, node }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFile = !!node.__isFile;
  const isEmptyFolder = !!node.__isEmptyFolder;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <TreeNodeContainer>
      <TreeNodeHeader $isFile={isFile} onClick={toggleOpen}>
        {!isFile &&
          (isOpen ? (
            <Icon
              src={arrowIcon}
              style={{ transform: 'rotate(90deg)' }}
              alt="bottom-arrow"
            />
          ) : (
            <Icon src={arrowIcon} alt="right-arrow" />
          ))}
        {isFile && <Icon src={fileIcon} alt="file-icon" />}
        {name}
      </TreeNodeHeader>
      {isOpen && !isFile && !isEmptyFolder && (
        <TreeNodeContent>
          {Object.keys(node).map((childName, index) => (
            <TreeNode
              key={index}
              name={childName}
              node={node[childName] as TreeNodeType}
            />
          ))}
        </TreeNodeContent>
      )}
    </TreeNodeContainer>
  );
};

export default TreeNode;

import React from 'react';
import styled from 'styled-components';
import Text from '../common/Text';

const LI = styled.li`
  font-family: ${({ theme }) => theme.fonts.main};
`;

const StyledCode = styled.code`
  color: ${({ theme }) => theme.colors.primary};
`;

const RulesContent: React.FC = () => (
  <div>
    <Text variant="large">Rule 1: Empty Values</Text>
    <br></br>
    <Text>
      An empty array, an array with an empty string, or an array with only a
      forward slash will return nothing.
    </Text>
    <ul>
      <LI>
        <StyledCode>[]</StyledCode> - Nothing to show.
      </LI>
      <LI>
        <StyledCode>[&quot;&quot;]</StyledCode> - Nothing to show.
      </LI>
      <LI>
        <StyledCode>[&quot;/&quot;]</StyledCode> - Nothing to show.
      </LI>
    </ul>

    <Text variant="large">Rule 2: File vs. Folder</Text>
    <br></br>
    <Text>
      If a path ends with a forward slash, it is considered a folder (whether it
      has content or is empty). If it does not end with a forward slash, it is
      considered a file.
    </Text>
    <ul>
      <LI>
        <StyledCode>[&quot;/path&quot;]</StyledCode> - File.
      </LI>
      <LI>
        <StyledCode>[&quot;path&quot;]</StyledCode> - File.
      </LI>
      <LI>
        <StyledCode>[&quot;/path/&quot;]</StyledCode> - Folder (empty).
      </LI>
      <LI>
        <StyledCode>[&quot;path/&quot;]</StyledCode> - Folder (empty).
      </LI>
    </ul>

    <Text variant="large">Rule 3: Modifying Paths</Text>
    <br></br>
    <Text>Paths can be modified, but there are some rules to follow:</Text>
    <ul>
      <LI>
        <StyledCode>
          [&quot;/folder/&quot;, &quot;/folder/file&quot;]
        </StyledCode>{' '}
        - Files and folders can be added to a folder.
      </LI>
      <LI>
        <StyledCode>
          [&quot;/folder/file&quot;, &quot;/folder/&quot;]
        </StyledCode>{' '}
        - Files and folders cannot be removed from a folder in this manner
        (i.e., a file can become a folder, but a folder cannot become a file).
      </LI>
      <LI>
        <StyledCode>[&quot;/path&quot;, &quot;/path/&quot;]</StyledCode> - If{' '}
        <StyledCode>&quot;path&quot;</StyledCode> was previously a file, it can
        now be a folder.
      </LI>
      <LI>
        <StyledCode>[&quot;/path/abc&quot;, &quot;/path&quot;]</StyledCode> - If{' '}
        <StyledCode>&quot;path&quot;</StyledCode> was previously a folder, it
        cannot be a file. In this case,{' '}
        <StyledCode>&quot;/path&quot;</StyledCode> will be ignored.
      </LI>
      <LI>
        <StyledCode>
          [&quot;/path/file&quot;, &quot;/paths/file&quot;]
        </StyledCode>{' '}
        - Duplicates are allowed but will be ignored.
      </LI>
    </ul>

    <Text variant="small">
      <strong>Note:</strong> We do not validate for duplicate file or folder
      names. While validation might seem useful, it could introduce
      complications (for example, how to show the user the correct location of
      the duplicate, what to do with other paths at this time, etc.). This would
      be a great feature if we were adding one path at a time, rather than an
      array of paths at once. Please refer to the rules above to understand how
      modifications work.
    </Text>
  </div>
);

export default RulesContent;

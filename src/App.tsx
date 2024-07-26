import { useState } from 'react';
import styled from 'styled-components';
import Tree from './components/Tree/Tree';
import InfoPopup from './components/InfoPopup';
import Button from './components/common/Button';
import Text from './components/common/Text/Text';
import Textarea from './components/Textarea/Textarea';
import ClearButton from './components/ClearButton';
import CreateButton from './components/CreateButton';
import ButtonsWrapper from './components/common/ButtonsWrapper/ButtonsWrapper';
import { pathExamplePlaceholder, text } from './helpers/index';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
`;

function App() {
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);

  return (
    <AppContainer>
      <Text textAlign="center" variant="xlarge">
        {text.hello}
      </Text>
      <Text textAlign="center" variant="large">
        {text.help}
      </Text>
      <Button onClick={() => setInfoPopupOpen(true)}>{text.howItWorks}</Button>
      <Textarea placeholder={pathExamplePlaceholder}></Textarea>
      <ButtonsWrapper>
        <CreateButton />
        <ClearButton />
      </ButtonsWrapper>
      <Text variant="large">{text.result}</Text>
      <Tree />

      <InfoPopup
        isOpen={isInfoPopupOpen}
        onClose={() => setInfoPopupOpen(false)}
      />
    </AppContainer>
  );
}

export default App;

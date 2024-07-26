import React from 'react';
import Popup from '../common/Popup';
import { text } from '../../helpers';
import RulesContent from './content';

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Popup title={text.howItWorks} onClose={onClose}>
      <RulesContent />
    </Popup>
  );
};

export default InfoPopup;

import styled from 'styled-components';
import ModalTitle from './ModalTitle';
import { CLOSE_BUTTON } from '../../assets/images/index';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
`;

const CloseIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

interface ModalHeaderType {
  title: string;
  closeOption: 'icon' | 'button';
  handleCloseButton: () => void;
}

function ModalHeader({
  title,
  closeOption,
  handleCloseButton,
}: ModalHeaderType) {
  return (
    <Header>
      <ModalTitle title={title} />
      {closeOption === 'icon' && (
        <CloseIcon onClick={handleCloseButton} src={CLOSE_BUTTON} />
      )}
    </Header>
  );
}

export default ModalHeader;

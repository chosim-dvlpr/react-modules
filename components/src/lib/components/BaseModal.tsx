import styled, { css } from 'styled-components';
import '../style.css';
import { MouseEvent } from 'react';

interface ContainerProps {
  $position: 'center' | 'bottom';
  $size: 'small' | 'medium' | 'large';
}

interface BackDropProps {
  $display: string;
}

const BackDrop = styled.div<BackDropProps>`
  ${(props) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.35);
    display: ${props.$display};
  `}
`;

const calculateModalPosition = (position = 'center') => {
  switch (position) {
    case 'center':
      return css({
        top: '50%',
        transform: 'translate(-50%, -50%)',
      });

    case 'bottom':
      return css({
        top: 'auto',
        bottom: 0,
        transform: 'translate(-50%, 0)',
      });
  }
};

const calculateModalSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return css({
        width: '32rem',
      });

    case 'medium':
      return css({
        width: '48rem',
      });

    case 'large':
      return css({
        width: '60rem',
      });
  }
};

const Container = styled.div<ContainerProps>`
  ${(props) => css`
    position: fixed;
    left: 50%;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: 2.4rem 3.2rem;
    box-sizing: border-box;
    border-radius: 0.8rem;
    background-color: #ffffff;
    ${calculateModalSize(props.$size)}
    ${calculateModalPosition(props.$position)}
  `}
`;

interface ModalProps {
  toggleModal: () => void;
  isOpen: boolean;
  position?: 'center' | 'bottom';
  size?: 'small' | 'medium' | 'large';
}

function BaseModal({
  toggleModal,
  isOpen,
  position = 'center',
  size = 'medium',
  children,
}: React.PropsWithChildren<ModalProps>) {
  const handleCloseButton = () => {
    toggleModal();
  };

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      handleCloseButton();
    }
  };

  return (
    <BackDrop
      onClick={(e) => handleBackdropClick(e)}
      $display={isOpen ? 'block' : 'none'}
    >
      <Container $position={position} $size={size}>
        {children}
      </Container>
    </BackDrop>
  );
}

export default BaseModal;

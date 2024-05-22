import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ModalInputStyle = styled.input`
  width: 100%;
  box-sizing: border-box;

  gap: 0.8rem;
  padding: 0.8rem;
  border-radius: 0.4rem;
  border: 0.1rem solid #000000;

  font-size: 11px;
  font-weight: 400;
  line-height: 14.88px;
  text-align: left;

  color: #000000;
`;

interface ModalInputType {
  value: string;
  isOpen: boolean;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModalInput({ value, isOpen, onChangeInput }: ModalInputType) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <ModalInputStyle value={value} onChange={onChangeInput} ref={inputRef} />
  );
}

export default ModalInput;

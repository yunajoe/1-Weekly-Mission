import { SetStateAction } from "react";
import styled from "styled-components";

const CancelButton = styled.button`
  position: absolute;
  border-radius: 9999px;
  top: 15px;
  right: 20px;
  border: 1px solid white;
  cursor: pointer;
  background: transparent;
  color: white;
  background-color: black;
`;

type ModalCancelButtonProps = {
  setTabName: React.Dispatch<SetStateAction<string>>;
};

function ModalCancelButton({ setTabName }: ModalCancelButtonProps) {
  const handleCloseModal = () => {
    setTabName("");
  };
  return <CancelButton onClick={handleCloseModal}>X</CancelButton>;
}

export default ModalCancelButton;

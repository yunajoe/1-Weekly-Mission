import ModalButton from "@/components/button/ModalButton";
import ModalCancelButton from "@/components/button/ModalCancelButton";
import ModalInput from "@/components/input/ModalInput";
import { modalObj } from "@/consts/modal";
import ModalLayout from "@/layout/ModalLayout";
import { SetStateAction } from "react";
import styled from "styled-components";

type ChangeModalProps = {
  tabName: string;
  setTabName: React.Dispatch<SetStateAction<string>>;
  onClick: (folderId: number) => void;

  changeFolderName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Title = styled.p`
  font-size: 1.8rem;
  margin-top: 10px;
  margin-bottom: 10px;
`;

function ChangeModal({
  tabName,
  setTabName,
  onClick,

  changeFolderName,
  handleChange,
}: ChangeModalProps) {
  const [title, buttonName, buttonColor] = modalObj[tabName];

  return (
    <ModalLayout>
      <ModalCancelButton setTabName={setTabName} />
      <Title>{title}</Title>
      <ModalInput value={changeFolderName} onChange={handleChange} />
      <ModalButton
        buttonName={buttonName}
        buttonColor={buttonColor}
        onClick={onClick}
      />
    </ModalLayout>
  );
}

export default ChangeModal;

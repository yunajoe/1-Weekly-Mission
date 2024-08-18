import ModalButton from "@/components/button/ModalButton";
import ModalCancelButton from "@/components/button/ModalCancelButton";
import ModalInput from "@/components/input/ModalInput";
import { modalObj } from "@/consts/modal";
import ModalLayout from "@/layout/ModalLayout";
import { SetStateAction } from "react";
import styled from "styled-components";

type CreateModalProps = {
  tabName: string;
  setTabName: React.Dispatch<SetStateAction<string>>;
  createFolderName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (folderId: number) => void;
};

const Title = styled.p`
  font-size: 1.8rem;
  margin-top: 10px;
  margin-bottom: 10px;
`;
function CreateModal({
  tabName,
  setTabName,
  createFolderName,
  handleChange,
  onClick,
}: CreateModalProps) {
  const [title, buttonName, buttonColor] = modalObj[tabName];

  return (
    <ModalLayout>
      <ModalCancelButton setTabName={setTabName} />
      <Title>{title}</Title>

      <ModalInput value={createFolderName} onChange={handleChange} />

      <ModalButton
        buttonName={buttonName}
        buttonColor={buttonColor}
        onClick={onClick}
      />
    </ModalLayout>
  );
}

export default CreateModal;

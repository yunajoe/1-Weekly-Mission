import ModalButton from "@/components/button/ModalButton";
import ModalCancelButton from "@/components/button/ModalCancelButton";
import { modalObj } from "@/consts/modal";
import ModalLayout from "@/layout/ModalLayout";
import { SetStateAction } from "react";
import styled from "styled-components";

type DeleteModalProps = {
  folderName: string;
  tabName: string;
  setTabName: React.Dispatch<SetStateAction<string>>;
  onClick: (folderId: number) => void;
};
const Title = styled.p`
  font-size: 1.8rem;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Folder = styled.p`
  margin-bottom: 30px;
`;

function DeleteModal({
  folderName,
  tabName,
  setTabName,
  onClick,
}: DeleteModalProps) {
  const [title, buttonName, buttonColor] = modalObj[tabName];
  return (
    <ModalLayout>
      <ModalCancelButton setTabName={setTabName} />
      <Title>{title}</Title>
      <Folder>{folderName}</Folder>
      <ModalButton
        buttonName={buttonName}
        buttonColor={buttonColor}
        onClick={onClick}
      />
    </ModalLayout>
  );
}

export default DeleteModal;

import useModalMutation from "@/hooks/useModalMutation";
import ModalLayout from "@/layout/ModalLayout";
import Check from "@/public/images/check.svg";
import { FolderMenu } from "@/types/headerModalTypes";
import { SetStateAction, useState } from "react";
import styled from "styled-components";

type LinkModalProps = {
  data: FolderMenu[] | undefined;
  inputLink: string;
  setLinkOpenModal: React.Dispatch<SetStateAction<boolean>>;
};

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
const Title = styled.p`
  font-size: 1rem;
`;

const Link = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  justify-content: space-between;
  &:hover {
    background-color: var(--background);
  }
`;

const LinkInnerContainer = styled.div`
  display: flex;
  column-gap: 0.7rem;
`;

const LinkCount = styled.span``;

const FolderLinkName = styled.span<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? "var(--Linkbrary-primary-color, #6d6afe)" : "inherit"};
`;

function LinkModal({ data, inputLink, setLinkOpenModal }: LinkModalProps) {
  const [clickedFolderName, setClickedFolderName] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  const { createLinkMutation } = useModalMutation();
  const handleCloseModal = () => {
    setLinkOpenModal(false);
  };
  const selectedItem = data?.find(
    (ele: FolderMenu) => ele.name === clickedFolderName
  );

  console.log("selectedItem", selectedItem);
  //   const handleCreateLink = () => {
  //     {
  //       createLinkMutation.mutate(
  //         {
  //           data: {
  //             url: inputLink,
  //             folderId: selectedItem.id,
  //           },
  //         },
  //         {
  //           onSuccess: () => {
  //             setLinkOpenModal(false);
  //           },
  //         }
  //       );
  //     }
  //   };
  const handleCheck = (name: string) => {
    setClickedFolderName(name);
  };

  return (
    <ModalLayout>
      <CancelButton onClick={handleCloseModal}>X</CancelButton>
      <Title>폴더에추가</Title>
      <p>{inputLink}</p>
      {data?.map((item: FolderMenu) => {
        const { id, name, link_count } = item;
        return (
          <Link key={id} role="button" onClick={() => handleCheck(name)}>
            <LinkInnerContainer>
              <FolderLinkName isActive={isAdd && name === clickedFolderName}>
                {name}
              </FolderLinkName>
              <LinkCount>{link_count}개링크</LinkCount>
            </LinkInnerContainer>
            {isAdd && name === clickedFolderName && <Check />}
            {/* <button>추가하기</button> */}
          </Link>
        );
      })}
    </ModalLayout>
  );
}

export default LinkModal;

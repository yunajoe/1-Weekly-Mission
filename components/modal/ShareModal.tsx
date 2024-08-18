import ModalCancelButton from "@/components/button/ModalCancelButton";
import { modalObj } from "@/consts/modal";
import useCopyClipBoard from "@/hooks/useCopyClipBoard";
import useKaKao from "@/hooks/useKaKao";
import ModalLayout from "@/layout/ModalLayout";
import { KAKAO_SHARE_DATA } from "@/utils/constant";
import Image from "next/image";
import { SetStateAction, useCallback } from "react";
import styled from "styled-components";

type ShareModalProps = {
  folderId: string;
  folderName: string;
  tabName: string;
  setTabName: React.Dispatch<SetStateAction<string>>;
};
const Title = styled.p`
  font-size: 1.8rem;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Folder = styled.p`
  margin-bottom: 30px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 30px;
  background-color: white;
  width: 80%;
`;

const Button = styled.div`
  cursor: pointer;
`;

function ShareModal({
  folderId,
  folderName,
  tabName,
  setTabName,
}: ShareModalProps) {
  const [title] = modalObj[tabName];
  const shareLink = `${window.location.origin}/folder/${folderId}`;
  const [copyToClipboard, setCopyToClipboard] = useCopyClipBoard();
  const shareKaKao = useKaKao();
  const onClickKaKao = () => {
    shareKaKao!({ url: shareLink, ...KAKAO_SHARE_DATA });
  };
  const onClickFaceBook = () =>
    window.open(`http://www.facebook.com/sharer.php?u=${shareLink}`);

  const onClickLinkCopy = useCallback(() => {
    copyToClipboard(shareLink);
  }, [shareLink, copyToClipboard]);

  return (
    <ModalLayout>
      <ModalCancelButton setTabName={setTabName} />
      <Title>{title}</Title>
      <Folder>{folderName}</Folder>
      <ImageContainer>
        <Button role="button" onClick={onClickKaKao}>
          <Image
            src="/images/kakao-oauth.png"
            alt="kakao"
            width={40}
            height={40}
          />
        </Button>
        <Button role="button" onClick={onClickFaceBook}>
          <Image src="/images/face.png" alt="facebook" width={40} height={40} />
        </Button>
        <Button role="button" onClick={onClickLinkCopy}>
          <Image src="/images/share.png" alt="share" width={40} height={40} />
        </Button>
      </ImageContainer>
    </ModalLayout>
  );
}

export default ShareModal;

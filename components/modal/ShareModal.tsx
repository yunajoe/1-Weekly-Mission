import useKaKao from "@/hooks/useKaKao";

function ShareModal() {
  const { id } = router.query;
  const shareLink = `${window.location.origin}/folder/${id}`;
  const [copyToClipboard, copyResult] = useCopyClipBoard();
  const shareKaKao = useKaKao();
  const onClickKaKao = () => {
    shareKaKao!({ url: shareLink, ...KAKAO_SHARE_DATA });
  };
  const onClickFaceBook = () =>
    window.open(`http://www.facebook.com/sharer.php?u=${shareLink}`);

  const onClickLinkCopy = useCallback(() => {
    copyToClipboard(shareLink);
  }, [shareLink, copyToClipboard]);

  return <div></div>;
}

export default ShareModal;

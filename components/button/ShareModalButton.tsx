function ShareModalButton() {
  return (
    <div className={styles.share__container}>
      <div onClick={onClickKaKao}>
        <Image src={kakaochat} alt="kakao" width={40} height={50} />
      </div>
      <div onClick={onClickFaceBook}>
        <Image src={facebook} alt="kakao" width={40} height={50} />
      </div>
      <div onClick={onClickLinkCopy}>
        <Image src={link} alt="kakao" width={40} height={50} />
      </div>
    </div>
  );
}

export default ShareModalButton;

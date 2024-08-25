import LinkModal from "@/components/modal/LinkModal";
import FooterContext from "@/contexts/FooterContext";
import HeaderContext from "@/contexts/HeaderContext";
import useCustomQuery from "@/hooks/useCustomQuery";
import useObserver from "@/hooks/useObserver";
import LinkImage from "@/public/images/link.svg";
import React, { useContext, useEffect, useState } from "react";
import styles from "./FolderPageHeader.module.css";

export interface folderMenuList {
  id: number;
  name: string;
  link_count: number;
  favorite: boolean;
  created_at?: string;
}

export default function FolderPageHeader() {
  const [linkOpenModal, setLinkOpenModal] = useState(false);
  const [inputLink, setInputLink] = useState("");

  const { AuthUserQuery, AuthGetLink, wholeLinkList, AuthFolderQuery } =
    useCustomQuery();

  console.log("ㅎㅎㅎㅎㅎ", AuthFolderQuery.data);
  const handleOpenModal = () => {
    setLinkOpenModal(true);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value);
  };
  const { ref, isVisible } = useObserver();
  const { isHeaderVisible, setIsHeaderVisible } = useContext(HeaderContext);
  const { isFooterVisible, setIsFooterVisible } = useContext(FooterContext);

  useEffect(() => {
    setIsHeaderVisible(isVisible);
  }, [isVisible, setIsHeaderVisible]);

  if (isFooterVisible) {
    return (
      <div ref={ref} className={`${styles.container}`}>
        <div className={styles.button__container}>
          <div className={styles.input__container}>
            <LinkImage />
            <input
              className={styles.input}
              placeholder="링크를 추가해보세요"
              onChange={handleInput}
            />
          </div>
          <button className={styles.add__button} onClick={handleOpenModal}>
            추가하기
          </button>
          {linkOpenModal && (
            <LinkModal
              data={AuthFolderQuery.data}
              inputLink={inputLink}
              setLinkOpenModal={setLinkOpenModal}
            />
          )}
        </div>
      </div>
    );
  }
  return (
    <div ref={ref}>
      <div
        className={`${styles.container} ${
          !isHeaderVisible ? styles.sticky : ""
        }`}
      >
        <div className={styles.button__container}>
          <div className={styles.input__container}>
            <LinkImage />
            <input
              className={styles.input}
              placeholder="링크를 추가해보세요"
              onChange={handleInput}
            />
          </div>
          <button className={styles.add__button} onClick={handleOpenModal}>
            추가하기
          </button>
          {linkOpenModal && (
            <LinkModal
              data={AuthFolderQuery.data}
              inputLink={inputLink}
              setLinkOpenModal={setLinkOpenModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState } from "react";
import styles from "./DropDown.module.css";
import HeaderModal from "../modal/HeaderModal";
import Modal from "../modal/Modal";
import useOutsideClick from "@/hooks/useOutsideClick";
import { getLinks } from "@/api/link/getLinks";

interface DropDownProps {
  linkList: getLinks[];
  linkUrl: string;
  closeFunc: () => void;
}

export default function DropDown({
  linkUrl,
  linkList,
  closeFunc,
}: DropDownProps) {
  const [openAddModal, setOpenModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);

  const ref = useRef(null);

  const handleModal = () => {
    setOpenModal(!openAddModal);
  };

  const handleDeleteModal = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setDeleteModal(true);
  };

  useOutsideClick({
    ref,
    callback: () => closeFunc(),
  });
  return (
    <div className={styles.container} ref={ref}>
      <ul className={styles.sub__container}>
        <li onClick={handleDeleteModal}>삭제하기</li>
        {openDeleteModal && (
          <Modal
            setterFunc={setDeleteModal}
            tabName="deleteLink"
            linkList={linkList}
            linkUrl={linkUrl}
          ></Modal>
        )}
        <li onClick={handleModal}>폴더에추가하기</li>
        {openAddModal && (
          <HeaderModal setOpenModal={handleModal} inputLink={linkUrl} />
        )}
      </ul>
    </div>
  );
}

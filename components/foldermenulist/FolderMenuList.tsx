import React, { useState } from "react";
import Button from "../button/Button";
import styles from "./FolderMenuList.module.css";
import Plus from "@/public/images/plus.svg";
import { useRouter } from "next/router";
import Modal from "../modal/Modal";
export interface FolderMenuListProps {
  folderMenuList: FolderMenuList[];
  folderId?: string;
}

export interface FolderMenuList {
  id: number;
  created_at: string;
  favorite: boolean;
  name: string;
  link_count: number;
}

export default function FolderMenuList({
  folderMenuList,
  folderId,
}: FolderMenuListProps) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.sub__container}>
        {folderMenuList?.map((item) => {
          const { id, name } = item;

          let isActive = false;
          if (id === Number(folderId)) {
            isActive = true;
          }
          return (
            <Button
              isActive={isActive}
              onClick={() => {
                if (id === 0) {
                  router.push("/folder");
                  return;
                }
                router.push(`/folder/${id}`);
              }}
              key={id}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <div className={styles.add__folder__button}>
        <Button onClick={() => handleModal()}>
          폴더추가
          <Plus />
        </Button>
      </div>
      {openModal && <Modal setterFunc={setOpenModal} tabName="add" />}
    </div>
  );
}

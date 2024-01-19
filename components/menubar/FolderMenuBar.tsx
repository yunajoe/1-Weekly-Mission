import React, { useState } from "react";
import styles from "./FolderMenu.module.css";
import Modal from "@/components/modal/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { FolderMenuBarData } from "@/types/folderMenuBarTypes";
import { FolderMenuList } from "../foldermenulist/FolderMenuList";
type TabName = "share" | "change" | "delete" | "deleteLink";

interface folderMenuBarProps {
  data?: FolderMenuList[];
}

export default function FolderMenuBar({ data }: folderMenuBarProps) {
  const [openModal, setOpenModal] = useState(false);
  const [tabName, setTabName] = useState<TabName>("share");

  const router = useRouter();
  const { id } = router.query;

  const folderName = !id
    ? "전체"
    : data?.filter((item) => item.id === Number(id))[0]?.name!;

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleTab = (e: React.MouseEvent<HTMLDivElement>) => {
    const altAttribute = (e.target as HTMLImageElement).alt as TabName;
    setTabName(altAttribute);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{folderName}</p>
      <div className={styles.images__container}>
        <div
          onClick={(e) => {
            handleTab(e);
            handleModal();
          }}
        >
          <Image src="/images/share.png" width={40} height={20} alt="share" />
        </div>
        <div
          onClick={(e) => {
            handleTab(e);
            handleModal();
          }}
        >
          <Image
            src="/images/namechange.png"
            width={60}
            height={20}
            alt="change"
          />
        </div>
        <div
          onClick={(e) => {
            handleTab(e);
            handleModal();
          }}
        >
          <Image src="/images/delete.png" width={40} height={20} alt="delete" />
        </div>
      </div>
      {openModal && (
        <Modal
          setterFunc={setOpenModal}
          tabName={tabName}
          folderName={folderName}
        />
      )}
    </div>
  );
}

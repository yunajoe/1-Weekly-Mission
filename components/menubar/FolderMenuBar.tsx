import { FolderMenuList } from "@/components/foldermenulist/FolderMenuList";
import ChangeModal from "@/components/modal/ChangeModal";
import DeleteModal from "@/components/modal/DeleteModal";
import ShareModal from "@/components/modal/ShareModal";
import useCustomQuery from "@/hooks/useCustomQuery";
import useModalMutation from "@/hooks/useModalMutation";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./FolderMenu.module.css";
type TabName = "change" | "delete" | "deleteLink";

interface folderMenuBarProps {
  data?: FolderMenuList[];
}

export default function FolderMenuBar({ data }: folderMenuBarProps) {
  const [tabName, setTabName] = useState("");
  const [changeFolderName, setChangeFolderName] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const folderId = id as string;
  const { AuthUserQuery, AuthGetLink, wholeLinkList, AuthFolderQuery } =
    useCustomQuery(folderId);
  const folderName = !id
    ? "전체"
    : data?.filter((item) => item.id === Number(id))[0]?.name!;
  const { editFolderMutation, deleteFolderMutation } = useModalMutation();

  const handleTab = (e: React.MouseEvent<HTMLDivElement>) => {
    const altAttribute = (e.target as HTMLImageElement).alt as TabName;
    setTabName(altAttribute);
  };

  // 삭제
  const handleDeleteFolder = (folderId: number) => {
    deleteFolderMutation.mutate(folderId, {
      onSuccess: () => {
        router.push("/folder");
      },
    });
  };

  // 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeFolderName(e.target.value);
  };
  const handleEditFolder = () => {
    editFolderMutation.mutate(
      {
        folderId: Number(id),
        data: {
          name: changeFolderName,
        },
      },
      {
        onSuccess: () => {
          setTabName("");
          setChangeFolderName("");
          router.push("/folder");            
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{folderName}</p>
      <div className={styles.images__container}>
        <div
          className={styles.tab_button}
          onClick={(e) => {
            handleTab(e);
          }}
        >
          <Image src="/images/share.png" width={40} height={20} alt="share" />
        </div>
        <div
          className={styles.tab_button}
          onClick={(e) => {
            handleTab(e);
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
          className={styles.tab_button}
          role="button"
          onClick={(e) => {
            handleTab(e);
          }}
        >
          <Image src="/images/delete.png" width={40} height={20} alt="delete" />
        </div>
      </div>
      {/* 모달 나오는곳 */}
      {tabName === "change" && (
        <ChangeModal
          tabName={tabName}
          setTabName={setTabName}
          changeFolderName={changeFolderName}
          handleChange={handleChange}
          onClick={handleEditFolder}
        />
      )}
      {tabName === "delete" && (
        <DeleteModal
          folderName={folderName}
          tabName={tabName}
          setTabName={setTabName}
          onClick={() => handleDeleteFolder(Number(id))}
        />
      )}
      {tabName === "share" && (
        <ShareModal
          folderId={folderId}
          folderName={folderName}
          tabName={tabName}
          setTabName={setTabName}
        />
      )}
    </div>
  );
}

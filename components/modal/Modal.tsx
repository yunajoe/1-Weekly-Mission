import React, { useCallback, useRef, useState } from "react";
import styles from "./Modal.module.css";
import kakaochat from "@/public/images/Chat.png";
import facebook from "@/public/images/Telegram.png";
import link from "@/public/images/More.png";
import Image from "next/image";
import useKakao from "@/hooks/useKaKao";
import { KAKAO_SHARE_DATA } from "@/utils/constant";
import { useRouter } from "next/router";
import useCopyClipBoard from "@/hooks/useCopyClipBoard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFolder } from "@/api/folder/putFolder";
import { postFolder } from "@/api/folder/postFolder";
import { deleteFolder } from "@/api/folder/deleteFolder";
import { getLinks } from "@/api/link/getLinks";
import { deleteLink } from "@/api/link/deleteLink";
type TabName = "add" | "share" | "change" | "delete" | "deleteLink";

type ModalProps = {
  setterFunc: (value: boolean) => void;
  tabName: TabName;
  folderName?: string;
  linkList: getLinks[];
  linkUrl?: string;
};

export default function Modal({
  setterFunc,
  tabName,
  folderName,
  linkList,
  linkUrl = "",
}: ModalProps) {
  const obj = {
    add: ["폴더추가", "추가하기", "blue"],
    share: ["폴더공유"],
    change: ["폴더이름변경", "변경하기", "blue"],
    delete: ["폴더삭제", "삭제하기", "red"],
    deleteLink: ["링크삭제", "삭제하기", "red"],
  };
  const [createFolderName, setCreateFolderName] = useState("");
  const [changeFolderName, setChangeFolderName] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const [title, buttonName, buttonColor] = obj[tabName];
  const { id } = router.query;
  const shareLink = `${window.location.origin}/folder/${id}`;

  const shareKaKao = useKakao();

  const onClickKaKao = () => {
    shareKaKao!({ url: shareLink, ...KAKAO_SHARE_DATA });
  };
  const onClickFaceBook = () =>
    window.open(`http://www.facebook.com/sharer.php?u=${shareLink}`);

  const [copyToClipboard, copyResult] = useCopyClipBoard();

  const onClickLinkCopy = useCallback(() => {
    copyToClipboard(shareLink);
  }, [shareLink, copyToClipboard]);

  // create
  const createFolderMutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: (data: postFolder) => postFolder(data),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["authFolderList"] });
      const prevFolderList = queryClient.getQueryData(["authFolderList"]);
      return prevFolderList;
    },
    // err는 err의 종류, data는 post한 데이터의 양식, context는 onMutate에서 return한값
    onError: (err, data, context) => {
      console.log("err다아앙아아", err, "data", data, "context", context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
  });
  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFolderName(e.target.value);
  };
  const handleCreateFolder = () => {
    createFolderMutation.mutate(
      {
        data: {
          name: createFolderName,
        },
      },
      {
        onSuccess: () => {
          setterFunc(false);
        },
      }
    );
  };
  // edit
  const editFolderMuation = useMutation({
    mutationKey: ["editFolder", changeFolderName],
    mutationFn: (data: putFolder) => putFolder(data),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["authFolderList"] });
      const prevFolderList = queryClient.getQueryData(["authFolderList"]);
      return prevFolderList;
    },
    onError: (err, data, context) => {
      console.log("err다아앙아아", err, "data", data, "context", context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeFolderName(e.target.value);
  };

  const handleEditFolder = () => {
    editFolderMuation.mutate(
      {
        folderId: Number(id),
        data: {
          name: changeFolderName,
        },
      },
      {
        onSuccess: () => {
          setterFunc(false);
        },
      }
    );
  };

  // delete

  const deleteFolderMutation = useMutation({
    mutationKey: ["deleteFolder"],
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
  });

  const handleDeleteFolder = (folderId: number) => {
    deleteFolderMutation.mutate(folderId, {
      onSuccess: () => {
        setterFunc(false);
        router.push("/folder");
      },
    });
  };

  const deleteLinkMutation = useMutation({
    mutationKey: ["deleteLink"],
    mutationFn: (linkId: number) => deleteLink(linkId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["FolderLink", Number(id)] });
    },
  });

  const handleDeleteLink = (linkId: number) => {
    deleteLinkMutation.mutate(linkId, {
      onSuccess: () => {
        setterFunc(false);
      },
    });
  };
  const callbackFunObj: Record<TabName, () => void> = {
    add: handleCreateFolder,
    share: () => console.log("ddd"),
    change: handleEditFolder,
    delete: () => handleDeleteFolder(Number(id)),
    deleteLink: () => {
      const targetLink = linkList.find((link) => link.url === linkUrl)!;
      handleDeleteLink(targetLink.id);
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal__container}>
        <button
          className={styles.cancel__button}
          onClick={() => {
            setterFunc(false);
          }}
        >
          X
        </button>
        <p className={styles.title}>{title}</p>
        {/* except for change button */}
        {tabName !== "change" && <p className={styles.folder}>{folderName}</p>}
        {tabName === "add" && (
          <input
            className={styles.input}
            placeholder="내용입력"
            value={createFolderName}
            onChange={handleAdd}
          />
        )}
        {/* only for change button */}
        {tabName === "change" && (
          <input
            className={styles.input}
            placeholder="내용입력"
            value={changeFolderName}
            onChange={handleChange}
          />
        )}
        {tabName === "deleteLink" && <p>{linkUrl}</p>}
        {buttonName ? (
          <button
            onClick={() => callbackFunObj[tabName]()}
            className={
              buttonColor === "blue" ? styles.button : styles.button__red
            }
          >
            {buttonName}
          </button>
        ) : (
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
            {/* {copyResult?.state && copyResult?.message}
            {!copyResult?.state && copyResult?.message} */}
          </div>
        )}
      </div>
    </div>
  );
}

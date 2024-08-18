import { postFolder } from "@/api/folder/postFolder";
import { deleteLink } from "@/api/link/deleteLink";
import { getLinks } from "@/api/link/getLinks";
import ModalInput from "@/components/input/ModalInput";
import { modalObj } from "@/consts/modal";
import useModalMutation from "@/hooks/useModalMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./Modal.module.css";
type TabName = "add" | "change" | "delete" | "deleteLink";

type ModalProps = {
  setterFunc: (value: boolean) => void;
  tabName: TabName;
  folderName?: string;
  linkList?: getLinks[];
  linkUrl?: string;
};

export default function Modal({
  setterFunc,
  tabName,
  folderName,
  linkList,
  linkUrl = "",
}: ModalProps) {
  const [createFolderName, setCreateFolderName] = useState("");
  const [changeFolderName, setChangeFolderName] = useState("");

  const queryClient = useQueryClient();
  const router = useRouter();
  const [title, buttonName, buttonColor] = modalObj[tabName];

  const { id } = router.query;

  const { deleteFolderMutation } = useModalMutation();

  // create
  const createFolderMutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: (data: postFolder) => postFolder(data),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["authFolderList"] });
      const prevFolderList = queryClient.getQueryData(["authFolderList"]);
      return prevFolderList;
    },
    onError: (err, data, context) => {
      console.log("err", err);
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
  // const editFolderMuation = useMutation({
  //   mutationKey: ["editFolder", changeFolderName],
  //   mutationFn: (data: putFolder) => putFolder(data),
  //   onMutate: () => {
  //     queryClient.cancelQueries({ queryKey: ["authFolderList"] });
  //     const prevFolderList = queryClient.getQueryData(["authFolderList"]);
  //     return prevFolderList;
  //   },
  //   onError: (err, data, context) => {
  //     console.log("err", err);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
  //   },
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setChangeFolderName(e.target.value);
  // };

  // const handleEditFolder = () => {
  //   editFolderMuation.mutate(
  //     {
  //       folderId: Number(id),
  //       data: {
  //         name: changeFolderName,
  //       },
  //     },
  //     {
  //       onSuccess: () => {
  //         setterFunc(false);
  //       },
  //     }
  //   );
  // };

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

  const callbackFunctionObj: Record<TabName, () => void> = {
    add: handleCreateFolder,
    // change: handleEditFolder,
    // delete: () => handleDeleteFolder(Number(id)),
    deleteLink: () => {
      const targetLink = linkList?.find((link) => link.url === linkUrl)!;
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
        {tabName !== "change" && <p className={styles.folder}>{folderName}</p>}
        {tabName === "add" && (
          <ModalInput value={createFolderName} onChange={handleAdd} />
        )}

        {/* {tabName === "change" && (
          <input
            className={styles.input}
            placeholder="내용입력"
            value={changeFolderName}
            onChange={handleChange}
          />
        )} */}
        {tabName === "deleteLink" && <p>{linkUrl}</p>}
        {/* <ModalButton
          buttonName={buttonName}
          buttonColor={buttonColor}
          callbackFunctionObj={callbackFunctionObj}
          tabName={tabName}
        /> */}
      </div>
    </div>
  );
}

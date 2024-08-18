import { getFolders } from "@/api/folder/getFolder";
import { postLink } from "@/api/link/postLinks";
import Check from "@/public/images/check.svg";
import { FolderMenu } from "@/types/headerModalTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { SetStateAction, useRef, useState } from "react";
import styles from "./HeaderModal.module.css";

type HeaderModalProps = {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  inputLink: string;
};

export default function HeaderModal({
  setOpenModal,
  inputLink,
}: HeaderModalProps) {
  const [clickedFolderName, setClickedFolderName] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: folderMenuList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authFolderList"],
    queryFn: () => getFolders(),
  });
  const handleClick = (folderName: string) => {
    setIsAdd(!isAdd);
    setClickedFolderName(folderName);
  };

  const modalRef = useRef(null);

  const createLinkMutation = useMutation({
    mutationKey: ["postLink"],
    mutationFn: (data: postLink) => postLink(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
  });

  if (isLoading) return <p className={styles.loading}>Loadig..</p>;

  if (isError) return <p>Error...</p>;

  const selectedItem = folderMenuList.find(
    (ele: FolderMenu) => ele.name === clickedFolderName
  );

  const handleCreateLink = () => {
    {
      createLinkMutation.mutate(
        {
          data: {
            url: inputLink,
            folderId: selectedItem.id,
          },
        },
        {
          onSuccess: () => {
            setOpenModal(false);
          },
        }
      );
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal__container} ref={modalRef}>
        <button
          className={styles.cancel__button}
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
        <p className={styles.title}>폴더에추가</p>
        <p>{inputLink}</p>
        {folderMenuList.map((item: FolderMenu) => {
          const { id, name, link_count } = item;
          return (
            <li
              key={id}
              className={styles.links}
              onClick={() => handleClick(name)}
            >
              <div className={styles.links__wrapper}>
                <span
                  className={
                    isAdd && name === clickedFolderName
                      ? styles.folder_link_name
                      : ""
                  }
                >
                  {name}
                </span>
                <span className={styles.link_count}>{link_count}개링크</span>
              </div>
              {isAdd && name === clickedFolderName && <Check />}
            </li>
          );
        })}
        <button className={styles.button} onClick={() => handleCreateLink()}>
          추가하기
        </button>
      </div>
    </div>
  );
}

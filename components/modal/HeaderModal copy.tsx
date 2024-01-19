import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderModal.module.css";
import LocaleContext from "../../contexts/LocaleContext";
import Check from "@/public/images/check.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFolders } from "@/api/folder/getFolder";
import { useMutation } from "@tanstack/react-query";
import { postLink } from "@/api/link/postLinks";
import { FolderMenu } from "@/types/headerModalTypes";
type HeaderModalProps = {
  setterFunc: (value: boolean) => void;
  inputLink: string;
};

export default function HeaderModal({
  setterFunc,
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

  const createLinkMutation = useMutation({
    mutationKey: ["postLink"],
    mutationFn: (data: postLink) => postLink(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
  });

  if (isLoading) return <p>Loadig..</p>;

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
            setterFunc(false);
          },
        }
      );
    }
    return (
      <div className={styles.container}>
        <div className={styles.modal__container}>
          <button
            className={styles.cancel__button}
            onClick={() => setterFunc(false)}
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
          {/* onClick={handleCreateLink */}
          {/* <button className={styles.button} onClick={() => handleCreateLink()}>
            추가하기
          </button> */}
          <button className={styles.button} onClick={() => handleCreateLink()}>
            추가하기
          </button>
        </div>
      </div>
    );
  };
}

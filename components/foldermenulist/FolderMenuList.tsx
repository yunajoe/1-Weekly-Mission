import CreateModal from "@/components/modal/CreateModal";
import useModalMutation from "@/hooks/useModalMutation";
import Plus from "@/public/images/plus.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../button/Button";
import styles from "./FolderMenuList.module.css";
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

  const [createFolderName, setCreateFolderName] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState("");
  const { createFolderMutation } = useModalMutation();
  const queryClient = useQueryClient();

  const handleModal = () => {
    setOpenCreateModal("add");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setOpenCreateModal("");
          setCreateFolderName("");
          queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
        },
      }
    );
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
        <Button onClick={handleModal}>폴더추가</Button>
        <div className={styles.plus_icon}>
          <Plus />
        </div>
      </div>
      {openCreateModal && (
        <CreateModal
          tabName="add"
          setTabName={setOpenCreateModal}
          createFolderName={createFolderName}
          handleChange={handleChange}
          onClick={handleCreateFolder}
        />
      )}
    </div>
  );
}

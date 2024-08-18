import { deleteFolder } from "@/api/folder/deleteFolder";
import { putFolder } from "@/api/folder/putFolder";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useModalMutation() {
  const queryClient = useQueryClient();
  const deleteFolderMutation = useMutation({
    mutationKey: ["deleteFolder"],
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
  });

  const editFolderMutation = useMutation({
    mutationKey: ["editFolder"],
    mutationFn: (data: putFolder) => putFolder(data),
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

  return {
    editFolderMutation,
    deleteFolderMutation,
  };
}

export default useModalMutation;

import { getFolders } from "@/api/folder/getFolder";
import { getFolderLinks } from "@/api/link/getFolderLinks";
import { getUser } from "@/api/user/getUser";
import { useQuery } from "@tanstack/react-query";

function useCustomQuery(folderId?: string) {
  const AuthUserQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: () => getUser(),
  });
  const AuthGetLink = useQuery({
    queryKey: ["FolderLink", folderId],
    queryFn: () => getFolderLinks(folderId as string),
    enabled: !!AuthUserQuery,
  });

  const wholeLinkList = AuthGetLink.data || [];

  const AuthFolderQuery = useQuery({
    queryKey: ["authFolderList", folderId],
    queryFn: () => getFolders(),
    enabled: !!AuthUserQuery && !!wholeLinkList,
    select: (data) => {
      return [
        {
          id: 0,
          name: "전체",
          link_count: wholeLinkList.length,
          favorite: false,
        },
        ...data,
      ];
    },
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });

  return {
    AuthUserQuery,
    AuthGetLink,
    wholeLinkList,
    AuthFolderQuery,
  };
}

export default useCustomQuery;

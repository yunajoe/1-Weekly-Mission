import { useRouter } from "next/router";
import React from "react";
import DataList from "@/components/datalist/DataList";
import SearchBar from "@/components/searchbar/SearchBar";
import FolderNav from "@/components/nav/FolderNav";
import Header from "@/components/header/Header";
import FolderMenuList from "@/components/foldermenulist/FolderMenuList";
import Footer from "@/components/footer/Footer";
import FolderPageLayout from "@/layout/FolderPageLayout";

import FolderMenuBar from "@/components/menubar/FolderMenuBar";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user/getUser";
import { getFolders } from "@/api/folder/getFolder";
import { getFolderLinks } from "@/api/link/getFolderLinks";

export default function FolderItem() {
  const router = useRouter();
  const { id } = router.query;
  const folderId = id as string;

  const AuthUserQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: () => getUser(),
  });
  const AuthGetLink = useQuery({
    queryKey: ["FolderLink", folderId],
    queryFn: () => getFolderLinks(folderId),
    enabled: !!AuthUserQuery,
  });
  const wholeLinkList = AuthGetLink.data || [];
  const AuthFolderQuery = useQuery({
    queryKey: ["authFolderList"],
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
  });

  if (AuthUserQuery.isLoading) return <p> Loading....</p>;

  if (AuthUserQuery.isError) return <p> Error...</p>;

  const user = AuthUserQuery.data || [];
  const folderMenuList = AuthFolderQuery.data || [];
  const folderLinkList = AuthGetLink.data || [];

  return (
    <>
      <FolderPageLayout>
        <FolderNav userProfile={user} />
        <Header />
        <SearchBar />
        <FolderMenuList folderMenuList={folderMenuList} folderId={folderId} />
        <FolderMenuBar data={folderMenuList} />
        <DataList linkList={folderLinkList} />
        <Footer />
      </FolderPageLayout>
    </>
  );
}

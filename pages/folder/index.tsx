"use client";

import DataList from "@/components/datalist/DataList";
import FolderMenuList from "@/components/foldermenulist/FolderMenuList";
import Footer from "@/components/footer/Footer";
import FolderMenuBar from "@/components/menubar/FolderMenuBar";
import FolderNav from "@/components/nav/FolderNav";
import SearchBar from "@/components/searchbar/SearchBar";

import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import FolderPageLayout from "@/layout/FolderPageLayout";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/api/folder/getFolder";
import { getUser } from "@/api/user/getUser";
import { getLinks } from "@/api/link/getLinks";
import { getFolderLinks } from "@/api/link/getFolderLinks";
import FolderPageHeader from "@/components/header/FolderPageHeader";

export default function FolderPages() {
  const router = useRouter();
  const { id } = router.query;

  const AuthUserQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: () => getUser(),
  });

  const AuthGetLink = useQuery({
    queryKey: ["wholeLinks"],
    queryFn: () => getLinks(),
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

  const user = AuthUserQuery.data || [];
  const folderMenuList = AuthFolderQuery.data || [];

  // const folderIdList = folderMenuList
  //   .filter((item) => item.id !== 0)
  //   .map((item) => item.id);

  // const folderResult = useQueries(
  //   folderIdList.map((id) => ({
  //     queryKey: ["folderLink", id],
  //     queryFn: () => {
  //       return getFolderLinks(id);
  //     },
  //     select: (data) => ({
  //       [id]: {
  //         data,
  //       },
  //     }),
  //   }))

  const currentFolder = useMemo(() => {
    if (id) {
      return AuthFolderQuery?.data?.find((data) => data.id === id);
    } else {
      return AuthFolderQuery.data?.[0];
    }
  }, [folderMenuList]);

  if (AuthUserQuery.isLoading) return <p> Loading....</p>;
  if (AuthUserQuery.isError) return <p> Error...</p>;

  const res = folderMenuList.reduce((acc, item, idx) => {
    return {
      ...acc,
      [Number(item.id)]: {
        folderId: item.id,
        folderName: item.name,
        // links: idx === 0 ? wholeLinkList : folderResult.filter((folder) => {}),
      },
    };
  }, []);

  return (
    <>
      <FolderPageLayout>
        <FolderNav userProfile={user} />
        <FolderPageHeader />
        <SearchBar />
        <FolderMenuList folderMenuList={folderMenuList} folderId="0" />
        <FolderMenuBar data={folderMenuList}></FolderMenuBar>
        <DataList linkList={wholeLinkList} />
        <Footer />
      </FolderPageLayout>
    </>
  );
}

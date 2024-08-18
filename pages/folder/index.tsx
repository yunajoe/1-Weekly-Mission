"use client";

import DataList from "@/components/datalist/DataList";
import Footer from "@/components/footer/Footer";
import FolderPageHeader from "@/components/header/FolderPageHeader";
import FolderMenuBar from "@/components/menubar/FolderMenuBar";
import FolderNav from "@/components/nav/FolderNav";
import SearchBar from "@/components/searchbar/SearchBar";
import useCustomQuery from "@/hooks/useCustomQuery";
import FolderPageLayout from "@/layout/FolderPageLayout";
import FolderMenuList from "./../../components/foldermenulist/FolderMenuList";

export default function FolderPages() {
  const { AuthUserQuery, AuthGetLink, wholeLinkList, AuthFolderQuery } =
    useCustomQuery();

  const user = AuthUserQuery.data || [];
  const folderMenuList = AuthFolderQuery.data || [];

  if (AuthUserQuery.isError) return <p> Error...</p>;

  return (
    <FolderPageLayout isLoading={AuthUserQuery.isLoading}>
      <FolderNav userProfile={user} />
      <FolderPageHeader />
      <SearchBar />
      <FolderMenuList folderMenuList={folderMenuList} folderId="0" />
      <FolderMenuBar data={folderMenuList} />
      <DataList linkList={wholeLinkList} />
      <Footer />
    </FolderPageLayout>
  );
}

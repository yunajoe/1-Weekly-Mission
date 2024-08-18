import DataList from "@/components/datalist/DataList";
import FolderMenuList from "@/components/foldermenulist/FolderMenuList";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import FolderNav from "@/components/nav/FolderNav";
import SearchBar from "@/components/searchbar/SearchBar";
import FolderPageLayout from "@/layout/FolderPageLayout";
import { useRouter } from "next/router";

import FolderMenuBar from "@/components/menubar/FolderMenuBar";
import useCustomQuery from "@/hooks/useCustomQuery";

export default function FolderItem() {
  const router = useRouter();
  const { id } = router.query;
  const folderId = id as string;

  const { AuthUserQuery, AuthGetLink, wholeLinkList, AuthFolderQuery } =
    useCustomQuery(folderId);

  if (AuthUserQuery.isError) return <p> Error...</p>;

  const user = AuthUserQuery.data || [];
  const folderMenuList = AuthFolderQuery.data || [];
  const folderLinkList = AuthGetLink.data || [];

  return (
    <>
      <FolderPageLayout isLoading={AuthUserQuery.isLoading}>
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

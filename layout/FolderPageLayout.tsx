import FolderPageSkeleton from "@/components/skeleton/FolderPageSkeleton";
import FooterProvider from "@/contexts/provider/FooterProvider";
import HeaderProvider from "@/contexts/provider/HeaderProvider";
import SearchProvider from "@/contexts/provider/SearchProvider";
import LoadingLayout from "@/layout/LoadingLayout";
import React from "react";

export default function FolderPageLayout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <LoadingLayout isLoading={isLoading} skeleton={<FolderPageSkeleton />}>
      <HeaderProvider>
        <FooterProvider>
          <SearchProvider>{children}</SearchProvider>
        </FooterProvider>
      </HeaderProvider>
    </LoadingLayout>
  );
}

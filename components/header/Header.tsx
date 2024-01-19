import React from "react";
import HeaderButton from "../button/HeaderButton";
import { FolderContentsProps } from "@/api/share";
import Folder from "../folder/Folder";

interface HeaderProps {
  data?: FolderContentsProps;
}

export default function Header({ data }: HeaderProps) {
  if (data) {
    return <Folder data={data} />;
  }
  return <HeaderButton />;
}

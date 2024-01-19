import React, { useContext } from "react";
import DataListItem from "./DataListItem";
import styles from "./DataList.module.css";
import SearchContext from "../../contexts/SearchContext";
import { getLinks } from "@/api/link/getLinks";

type DataListProps = {
  folderIdKey?: string;
  linkList: getLinks[];
};

export default function DataList({ folderIdKey, linkList }: DataListProps) {
  const { inputValue, handleInputFunc } = useContext(SearchContext);

  if (!folderIdKey) {
    return (
      <div className={styles.container}>
        {linkList?.map((item) => {
          const { url, title, description } = item;
          if (
            url?.includes(inputValue) ||
            title?.includes(inputValue) ||
            description?.includes(inputValue)
          )
            return <DataListItem key={item.id} item={item} />;
        })}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {linkList?.map((item) => {
        const { url, title, description } = item;
        if (
          url?.includes(inputValue) ||
          title?.includes(inputValue) ||
          description?.includes(inputValue)
        )
          return <DataListItem key={item.id} item={item} />;
      })}
    </div>
  );
}

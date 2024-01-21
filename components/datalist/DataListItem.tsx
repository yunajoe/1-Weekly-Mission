import React, { useRef, useState } from "react";
import styles from "./DataListItem.module.css";
import Card from "@/components/card/Card";
import { getElapsedTime, parseDatestring } from "@/utils/caltime";
import Kebab from "@/public/images/kebab.png";
import DropDown from "../dropdown/DropDown";
import Image from "next/image";
import { getLinks } from "@/api/link/getLinks";

interface DataListItemProps {
  item: getLinks;
  linkList: getLinks[];
}

export default function DataListItem({ item, linkList }: DataListItemProps) {
  const [open, setOpen] = useState(false);
  const { id, url, title, image_source, description, created_at } = item;

  const targetData = parseDatestring(created_at);
  const { year, month, day } = targetData;
  const diffTime = getElapsedTime(created_at);
  const imageRef = useRef(null);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Card>
        <div className={styles.container}>
          <a href={url}>
            <div className={styles.card__image__container}>
              <img
                className={styles.card__image}
                src={image_source ?? "/images/card-default.png"}
                alt={title}
              />
            </div>
          </a>
          <div className={styles.item__contents__container}>
            <div>
              <div className={styles.sub__container}>
                <p>{diffTime}</p>
                <Image
                  ref={imageRef}
                  src={Kebab}
                  alt="kebab"
                  className={styles.kebab}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}
                />
                {open && (
                  <DropDown
                    linkList={linkList}
                    linkUrl={url}
                    closeFunc={handleClose}
                  />
                )}
              </div>
              <p>{description}</p>
            </div>
            <p>
              {year}. {month}. {day}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

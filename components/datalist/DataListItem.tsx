import React, { useEffect, useRef, useState } from "react";
import styles from "./DataListItem.module.css";
import Card from "@/components/card/Card";
import { getElapsedTime, parseDatestring } from "@/utils/caltime";
import Kebab from "@/public/images/kebab.png";
import DropDown from "../dropdown/DropDown";
import Image from "next/image";
import { getLinks } from "@/api/link/getLinks";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { putLink } from "@/api/link/putLinks";

interface DataListItemProps {
  item: getLinks;
  linkList: getLinks[];
}

export default function DataListItem({ item, linkList }: DataListItemProps) {
  const [open, setOpen] = useState(false);
  const [isStarClick, setIsStarClick] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const { id, url, title, image_source, description, created_at } = item;

  const targetData = parseDatestring(created_at);
  const { year, month, day } = targetData;
  const diffTime = getElapsedTime(created_at);
  const imageRef = useRef(null);

  const handleClose = () => {
    setOpen(!open);
  };

  const changeLinktoFavoriteMutation = useMutation({
    mutationKey: ["putLink"],
    mutationFn: (data: putLink) => putLink(data),
  });

  const handleStarClick = () => {
    setIsStarClick(!isStarClick);
  };

  const handleChangeLinktoFavorite = () => {
    console.log("clicked?", isStarClick, targetUrl);

    if (isStarClick && item.url === targetUrl) {
      const targetItem = linkList.find((item) => item.url === targetUrl)!;
      changeLinktoFavoriteMutation.mutate({
        linkId: targetItem.id,
        data: {
          favorite: true,
        },
      });
    } else if (!isStarClick && item.url === targetUrl) {
      const targetItem = linkList.find((item) => item.url === targetUrl)!;
      changeLinktoFavoriteMutation.mutate({
        linkId: targetItem.id,
        data: {
          favorite: false,
        },
      });
    }
  };

  useEffect(() => {
    handleChangeLinktoFavorite();
  }, [isStarClick]);

  // console.log("targetUrl", item, targetUrl);
  // const aa = linkList.find((item) => item.url === targetUrl);
  // console.log("aa", aa);
  return (
    <>
      <Card>
        <div className={styles.container}>
          <div className={styles.card__image__container}>
            <div
              className={styles.star}
              onClick={() => {
                setTargetUrl(url);
                setIsStarClick(!isStarClick);
              }}
            >
              <Image
                src={isStarClick ? "/images/blue-star.svg" : "/images/star.svg"}
                alt=""
                width={30}
                height={30}
              />
            </div>
            <Link href={url}>
              <img
                className={styles.card__image}
                src={image_source ?? "/images/card-default.png"}
                alt={title}
              />
            </Link>
          </div>
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

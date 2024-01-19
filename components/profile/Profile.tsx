import React from "react";
import styles from "./Profile.module.css";

import { userProfileProps } from "../nav/FolderNav";
export default function Profile({ userProfile }: userProfileProps) {
  return (
    <div className={styles.container}>
      {userProfile[userProfile.length - 1].email}
    </div>
  );
}

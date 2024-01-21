import React from "react";

import Logo from "@/public/images/logo.svg";
import Person from "@/public/images/person.svg";
import Login from "@/public/images/login.svg";
import styles from "./ShareNav.module.css";
import Profile from "@/components/profile/Profile";

export interface userProfileProps {
  userProfile: userProfile[];
}
export interface userProfile {
  id: number;
  name: string;
  image_source: string;
  email: string;
}

export default function FolderNav({ userProfile }: userProfileProps) {
  return (
    <div className={styles.container}>
      <Logo />

      <div className={styles.profile__container}>
        {userProfile?.length ? <Person /> : <Login />}
        {userProfile?.length && <Profile userProfile={userProfile} />}
      </div>
    </div>
  );
}

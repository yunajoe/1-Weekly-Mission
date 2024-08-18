import Image from "next/image";
import styles from "./TabButton.module.css";

type TabButtonProps = {
  tabName: string;
  handleModal: () => void;
  handleTab: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function TabButton({ tabName, handleModal, handleTab }: TabButtonProps) {
  return (
    <div
      className={styles.button}
      role="button"
      onClick={(e) => {
        handleModal();
        handleTab(e);
      }}
    >
      {tabName === "delete" ? (
        <Image src="/images/delete.png" width={40} height={20} alt="delete" />
      ) : tabName === "change" ? (
        <Image
          src="/images/namechange.png"
          width={60}
          height={20}
          alt="change"
        />
      ) : (
        <Image src="/images/share.png" width={40} height={20} alt="share" />
      )}
    </div>
  );
}

export default TabButton;

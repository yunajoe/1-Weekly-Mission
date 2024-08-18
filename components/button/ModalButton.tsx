import styles from "./ModalButton.module.css";

type ModalButtonProps = {
  buttonName: string;
  buttonColor: string;
  onClick: any;
};

function ModalButton({ buttonName, buttonColor, onClick }: ModalButtonProps) {
  return (
    <button
      onClick={onClick}
      className={buttonColor === "blue" ? styles.button : styles.button__red}
    >
      {buttonName}
    </button>
  );
}

export default ModalButton;

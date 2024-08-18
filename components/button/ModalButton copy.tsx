import styles from "./ModalButton.module.css";
type TabName = "add" | "change" | "delete" | "deleteLink"; // TabName의 가능한 값들

type CallbackFunctionObj = {
  [key: string]: () => void;
};

type ModalButtonProps = {
  buttonName: string;
  buttonColor: string;
  callbackFunctionObj: CallbackFunctionObj;
  tabName: string;
};

function ModalButton({
  buttonName,
  buttonColor,
  callbackFunctionObj,
  tabName,
}: ModalButtonProps) {
  const handleClick = callbackFunctionObj[tabName];
  return (
    <button
      onClick={() => handleClick()}
      className={buttonColor === "blue" ? styles.button : styles.button__red}
    >
      {buttonName}
    </button>
  );
}

export default ModalButton;

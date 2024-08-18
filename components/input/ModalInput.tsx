import styles from "./ModalInput.module.css";

type ModalInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ModalInput({ value, onChange }: ModalInputProps) {
  return (
    <input
      className={styles.input}
      placeholder="내용입력"
      value={value}
      onChange={onChange}
    />
  );
}

export default ModalInput;

import { InputProps } from "@/types/hookFormTypes";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import { clsx } from "clsx";
import styles from "./Input.module.css";

export default function Input({
  type,
  errors,
  label,
  name,
  register,
  placeholder,
  isEyeShow,
  isReEyeShow,
  onClick,
  ...props
}: InputProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={clsx({
          [styles.input]: true,
          [styles.error]: Object.keys(errors).includes(name),
        })}
        {...register(name, { ...props })}
      />
      <div className={styles.eyes} onClick={onClick}>
        {name === "password" && (
          <>
            {!isEyeShow ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
            )}
          </>
        )}
        {name === "repassword" && (
          <>
            {!isReEyeShow ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
            )}
          </>
        )}
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p className={styles.error_message} key={type}>
              {message}
            </p>
          ))
        }
      />
    </div>
  );
}

import React, { useCallback, useEffect } from "react";

interface useOutsideClickType {
  ref: any;
  callback: () => void;
}

export default function useOutsideClick({
  ref,
  callback,
}: useOutsideClickType) {
  const handleClick = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}

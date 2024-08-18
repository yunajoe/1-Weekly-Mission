import React from "react";
import styled from "styled-components";
const BaseButton = styled.button`
  background: #fff;
  cursor: pointer;
  border: none;
  border: 1px solid var(--primary);
  border-radius: 4px;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: black;
  font-weight: bold;
  width: 100%;

  &:hover {
    background-color: var(--primary);
    opacity: 0.7;
  }
  &.active {
    background-color: var(--primary);
  }
`;

type ButtonProps = {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: Function;
};
export default function Button({ children, isActive, onClick }: ButtonProps) {
  return (
    <BaseButton
      onClick={(e) => {
        onClick();
      }}
      className={isActive ? "active" : ""}
    >
      {children}
    </BaseButton>
  );
}

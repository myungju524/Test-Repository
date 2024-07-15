import React from "react";
import styled from "styled-components";

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 9999;
  bottom: 4%;
  right: 3%;

  background-color: ${({ theme }) => theme.bgColor};
  border: ${({ theme }) => theme.borderColor};
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: 0 5px 10px rgba(100, 100, 100, 0.15),
    0 2px 4px rgba(100, 100, 100, 0.15);

  cursor: pointer;
`;

function ThemeToggleButton({ mode, onClick }) {
  return (
    <ToggleWrapper onClick={onClick}>
      {mode === "light" ? "🌝" : "🌚"}
    </ToggleWrapper>
  );
}

export default ThemeToggleButton;

import { useCallback, useEffect, useState } from "react";
import PopupMenu from "../components/PopupMenu";
import styled from "styled-components";

const Button = styled.button`
  background-color: hsl(60deg 1.33% 14.71%);
  color: white;
  width: 44px;
  height: 44px;
  line-height: 16px;
  border: none;
  font-size: 16px;
  margin: 0 2px;
  cursor: pointer;
`;

const ColorPicker = styled.input`
  border: none;
  margin: 0 2px;
  width: 20px;
  height: 20px;
  appearance: none;
  vertical-align: middle;
  -webkit-appearance: none;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
  }
`;

export function useSelectionMenu() {
  const [popupState, setPopupState] = useState({
    left: 0,
    top: 0,
    visible: false,
  });
  const selectionHandler = useCallback(() => {
    const selection = document.getSelection();
    if (selection?.type === "Range") {
      console.log("🚀 ~ selectionHandler ~ selection:", selection.anchorNode?.parentNode)
      const text = selection.toString();
      const selectPosition = selection.getRangeAt(0).getBoundingClientRect();
      console.log("🚀 ~ selectionHandler ~ selectPosition:", selectPosition);
      setPopupState({
        left: selectPosition.left + selectPosition.width / 2,
        top: selectPosition.top,
        visible: true,
      });
    } else {
      setPopupState({
        left: 0,
        top: 0,
        visible: false,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", selectionHandler);

    return () => {
      document.removeEventListener("selectionchange", selectionHandler);
    };
  }, [selectionHandler]);

  return (
    <PopupMenu {...popupState}>
      <Button>B</Button>
      <Button>I</Button>
      <ColorPicker type="color" />
    </PopupMenu>
  );
}

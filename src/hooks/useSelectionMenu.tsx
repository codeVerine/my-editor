import { useCallback, useEffect, useState } from "react";
import PopupMenu from "../components/PopupMenu";

export function useSelectionMenu() {
    const [popupState, setPopupState] = useState({
        left: 0,
        top: 0,
        visible: false
    })
  const selectionHandler = useCallback(() => {
    const selection = document.getSelection();
    if(selection?.type === 'Range') {
        const text = selection.toString();
        const selectPosition =  selection.getRangeAt(0).getBoundingClientRect()
        console.log("🚀 ~ selectionHandler ~ selectPosition:", selectPosition)
        setPopupState({left: selectPosition.left + selectPosition.width/2, top: selectPosition.top, visible: true})
    } else {
        setPopupState({
            left: 0,
            top: 0,
            visible: false
        })
    }
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", selectionHandler);

    return () => {
      document.removeEventListener("selectionchange", selectionHandler);
    };
  }, [selectionHandler]);

  return <PopupMenu {...popupState}></PopupMenu>;
}

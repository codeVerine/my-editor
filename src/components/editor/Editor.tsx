import {
  DragEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { EditorContainer, Paragraph } from "./styles";
import { Article } from "../../types";

import { v4 as uuidv4 } from "uuid";
import { createParagraph, throttle, getEditedOrSelectedElements } from "../../utils";
import { useSelectionMenu } from "../../hooks/useSelectionMenu";
import { ARTICLE } from "../../mocks/paragraphs";


export const Nbsp =  () => '\u00A0';

function Editor() {
  const [article, setArticle] = useState<Article>(ARTICLE);
  const [caret, setCaret] = useState({
    position: 0,
    paragraphIndex: 0,
  });

  const editorRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {

  //   const config = { characterData: true, subtree: true };

  //   // Callback function to execute when mutations are observed
  //   const callback: MutationCallback = (mutationList, observer) => {

  //     for (const mutation of mutationList) {
  //       if (mutation.type === "characterData") {
  //         console.log(mutationList);
  //         console.log("Text");
  //       } else if (mutation.type === "childList") {
  //         console.log(`The ${mutation.addedNodes} noeds are added`);
  //       }
  //     }
  //   };

  //   let observer: MutationObserver;

  //   if (ref.current) {
  //     // Create an observer instance linked to the callback function
  //     observer = new MutationObserver(callback);

  //     // Start observing the target node for configured mutations
  //     observer.observe(ref.current, config);
  //   }

  //   return () => {
  //     if(observer) {
  //       observer.disconnect();
  //     }
  //   }

  // }, [ref])

  useLayoutEffect(() => {
    if(!editorRef.current)
      return;
  
    const range = document.createRange();
    const sel = window.getSelection()!;
    const {position, paragraphIndex} = caret;
    const currentParagraph = editorRef.current.childNodes[paragraphIndex];
    const nodeToSetCaret = currentParagraph.childNodes[0] || currentParagraph;
    console.log("🚀 ~ useLayoutEffect ~ position, paragraphIndex:", position, paragraphIndex, editorRef.current.childNodes)

    
      range.setStart(nodeToSetCaret, position);
      range.collapse(true);
  
      sel.removeAllRanges();
      sel.addRange(range);
      editorRef?.current?.focus();
    
  }, [caret])

  const insertAfter = (paragraphId: string, paragraphToBeInsertedId: string) => {
    const paragraphIndex = article.findIndex(
      (paragraph) => paragraph.id === paragraphId
    );
    let insertIndex = article.findIndex(
      (paragraph) => paragraph.id === paragraphToBeInsertedId
    );

    if (paragraphIndex === -1 || insertIndex === -1) {
      console.log('index out of bound')
      return 
    }

    setArticle((currentArticle) => {
      // Remove the element from its current position
      const [element] = currentArticle.splice(paragraphIndex, 1);

      // Adjust the toIndex if the element is moved from a lower index
      if (paragraphIndex < insertIndex) {
        insertIndex--;
      } 


      currentArticle.splice(insertIndex+ 1, 0, element);

      console.log("🚀 ~ setArticle ~ currentArticle:", currentArticle)
      return [...currentArticle];
    });
    
  }

  const dragHandler = useCallback<DragEventHandler>((event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.effectAllowed = "move";
    console.log("🚀 ~ dragHandler ~ draggedElement:", event, event.target.id)
    
  }, []);

  const dropHandler = useCallback<DragEventHandler>((event) => {
    console.log("🚀 ~ dropHandler ~ event:", [...article]);
    event.dataTransfer.dropEffect = "move";
    const hoveredOverElementId = event.target.id
    console.log("🚀 ~ dropHandler ~ hoveredOverElementId:", hoveredOverElementId)
    if(draggingElementId !==  hoveredOverElementId) {
      insertAfter(draggingElementId, hoveredOverElementId)
    }
  }, []);

  const dragOverHandler = 
  throttle(
      (event) => {
        const draggingElementId = event.dataTransfer.getData('text');
        console.log("🚀 ~ Editor ~ draggingElementId:", draggingElementId)
        console.log("🚀 ~ dragOverHandler ~ event:", event)
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      },
    49)

  const popupMenu = useSelectionMenu();
  

  const content = article.map((paragraph) => {
    return (
      <Paragraph key={paragraph.id} id={paragraph.id} draggable onDragStart={dragHandler}>
        {paragraph.text|| <Nbsp />}
      </Paragraph>
    );
  }); 

  const changeHandelr: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      const { selectedElements } = getEditedOrSelectedElements();
      const selectedElement = selectedElements[0];

      if (selectedElement) {
        const selection = window.getSelection()!;
        const range = selection.getRangeAt(0);
        const originalText = selectedElement.textContent || "";
        let firstParagraphText = originalText;
        let newParagraphText = "";

        // Check if the selection is within a text node
        if (range.startContainer.nodeType === Node.TEXT_NODE) {
          const textNode = range.startContainer;
          const offset = range.startOffset;

          if (offset < originalText.length) {
            firstParagraphText = originalText.substring(0, offset);
            newParagraphText = originalText.substring(offset);
          }
        }

        // Create the new paragraph with the remaining text
        const newParagraph = createParagraph(newParagraphText);

        // Update the existing paragraph object
        const originalParagraphId = selectedElement.id || uuidv4();
        const updatedParagraph = createParagraph(
          firstParagraphText,
          originalParagraphId
        );

        console.log("Updated Paragraph:", updatedParagraph);
        console.log("New Paragraph:", newParagraph);

        // Replace the original paragraph in the article array
        const paragraphIndex = article.findIndex(
          (paragraph) => paragraph.id === originalParagraphId
        );
        console.log("🚀 ~ Editor ~ paragraphIndex:", paragraphIndex)
        if (paragraphIndex !== -1) {
          article.splice(paragraphIndex, 1, updatedParagraph, newParagraph);
        }

        setArticle([...article]);
        setCaret({position: 0, paragraphIndex: paragraphIndex+1 });

        console.log("Updated Article:", article);
      }
    }
  };

  return (
    <EditorContainer
      contentEditable={true}
      ref={editorRef}
      onKeyDownCapture={changeHandelr}
      // onDrop={dropHandler}
      // onDragOver={dragOverHandler}
    >
      {content}
      {popupMenu}
    </EditorContainer>
  );
}

export default Editor;

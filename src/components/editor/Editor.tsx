import { KeyboardEventHandler, useEffect, useRef, useState } from "react"
import { EditorContainer } from "./styles"
import { Article } from "../../types"

import { v4 as uuidv4 } from 'uuid';
import { createParagraph, getEditedOrSelectedElements } from "../../utils";

const ARTICLE: Article = [
  createParagraph("Type here")
]

function Editor() {
  const [article, setArticle] = useState<Article>(ARTICLE)
  const [caret, setCaret] = useState({
    position: 0,
    elementId: ARTICLE[0].id
  })

  const ref = useRef(null);
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

  const content = article.map(paragraph => {
    return <p key={paragraph.id} id={paragraph.id}>{paragraph.text}</p>
  })

  const changeHandelr: KeyboardEventHandler = (e) => {

    if (e.key === 'Enter') {
      e.stopPropagation()
      e.preventDefault()
      const { selectedElements } = getEditedOrSelectedElements();
      const selectedElement = selectedElements[0];

      if (selectedElement) {
        const selection = window.getSelection()!;
        const range = selection.getRangeAt(0);
        let originalText = selectedElement.textContent || '';
        let firstParagraphText = originalText;
        let newParagraphText = '';

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
        const updatedParagraph = createParagraph(firstParagraphText, originalParagraphId) 

        console.log('Updated Paragraph:', updatedParagraph);
        console.log('New Paragraph:', newParagraph);

        // Replace the original paragraph in the article array
        const paragraphIndex = article.findIndex(paragraph => paragraph.id === originalParagraphId);
        if (paragraphIndex !== -1) {
          article.splice(paragraphIndex, 1, updatedParagraph, newParagraph);
        }

        setArticle([...article]);

        console.log('Updated Article:', article);
      }
    }
  }

  return (
    <EditorContainer contentEditable={true} ref={ref} onKeyDownCapture={changeHandelr}>
      {content}
    </EditorContainer>
  )
}

export default Editor
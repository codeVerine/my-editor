import { v4 as uuidv4 } from "uuid";
import { FORMATTING_TYPES, Meta, Paragraph } from "./types";

export function getEditedOrSelectedElements() {
  const currentSelection = window.getSelection();

  if (!currentSelection || currentSelection.rangeCount === 0) {
    return {
      selectedElements: [],
      selectedText: "",
    };
  }

  const range = currentSelection.getRangeAt(0);
  console.log("🚀 ~ getCurrentEditedElements ~ range:", range);

  const selectedText = currentSelection.toString();
  const selectedElements = [];

  const startNode =
    range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentNode
      : range.startContainer;
  const endNode =
    range.endContainer.nodeType === Node.TEXT_NODE
      ? range.endContainer.parentNode
      : range.endContainer;

  // Helper function to add node and its siblings until the end node is reached
  function addNodesUntil(node: Node | null, endNode: Node) {
    while (node) {
      selectedElements.push(node);
      if (node === endNode) {
        break;
      }
      node = node.nextSibling;
    }
  }

  // If the start and end nodes are the same, just add the start node
  if (startNode === endNode) {
    selectedElements.push(startNode);
  } else if (startNode && endNode) {
    // Collect elements from startNode to endNode
    addNodesUntil(startNode, endNode);
  }

  return {
    selectedElements,
    selectedText: selectedText,
  };
}

export function createParagraph(text: string, id?: string): Paragraph {
  return {
    id: id || uuidv4(),
    type: FORMATTING_TYPES.PARAGRAPH,
    text,
    formattings: [],
  };
}

export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  inputFunction: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: number | undefined;

  return (...args: Parameters<F>): void => {
    clearTimeout(timeout); 
    timeout = setTimeout(() => {
      return inputFunction(...args);
    }, waitFor);
  };
}

export function throttle<F extends (...args: Parameters<F>) => ReturnType<F>>(
  inputFunction: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: number | undefined;

  return (...args: Parameters<F>): void => {
    if(!timeout) {
      inputFunction(...args);
      timeout = setTimeout(() => {
        timeout = undefined;
      }, waitFor);
    }
  };
}

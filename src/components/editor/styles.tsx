import styled from 'styled-components';

export const EditorContainer = styled.div`
    width: 800px;
    height: 800px;
    border: 1px solid black;
    padding: 50px;
`

export const Paragraph = styled.p`
    position: relative;
    &:after {
        content: "";
        visibility: hidden;
        display: inline-block;
        width: 5px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: hsl(90deg 50% 50% / 50%);
        cursor: grab;
        border-radius: 2px;
    }
    &:hover::after {
        visibility: visible;
    }
`
import styled from "styled-components";

const Menu = styled.div`
  width: 150px;
  height: 50px;
  border: 1px solid black;
  border-radius: 4px;
  position: fixed;
  left: ${(props) => props.left - 75 || 0}px;
  top: ${(props) => props.top - 60 || 0}px;
  z-index: 2;
  background-color: hsl(60deg 1.33% 14.71%);
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const MenuHandle = styled.div`
  position: absolute;
  bottom: -5px;
  left: 50%;
  clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
  margin-left: -10px;
  background-color: hsl(60deg 1.33% 14.71%);
  transform: rotate(45deg);
  height: 10px;
  width: 10px;
`;

interface PopupMenuProps {
  left?: number;
  top?: number;
  visible: boolean;
}

export default function PopupMenu(props: PopupMenuProps) {
  const { left, top, visible, children } = props;
  const menu = (
    <Menu left={left} top={top} visible={visible}>
      {children}
      <MenuHandle></MenuHandle>
    </Menu>
  );

  return menu;
}

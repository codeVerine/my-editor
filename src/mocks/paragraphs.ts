import { Article } from "../types";
import { createParagraph } from "../utils";

const PARA1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum velit sapien. Fusce et enim efficitur, convallis ipsum nec, sollicitudin dui. Duis ac tempus felis, quis rutrum nulla. Proin a placerat diam, ut ultrices ante. Duis eget tellus orci. Integer et urna auctor, rutrum erat non, sollicitudin sapien. Maecenas gravida lacus sem, eu mattis velit tempor quis. Suspendisse bibendum consequat lectus, vitae placerat arcu cursus id.";
const PARA2 =
  "Aliquam lobortis urna in dictum mattis. Sed maximus ante sed purus aliquet blandit. Sed id libero rutrum, feugiat dui non, sollicitudin urna. Aliquam vel sapien elementum, fermentum quam eu, pellentesque nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus quis tristique ligula. Nulla facilisi. Praesent tellus nibh, sollicitudin in leo at, convallis volutpat magna.";
const PARA3 =
  "Mauris at neque elit. Donec aliquam nisi ante, id aliquet eros viverra id. Fusce pulvinar vitae nulla et malesuada. Praesent id blandit nibh. Suspendisse potenti. Integer a eleifend felis, a fermentum diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam non pulvinar nisi. Duis maximus feugiat condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis mattis, ligula eget pellentesque congue, velit augue suscipit turpis, ac blandit nisi felis eu tortor. Nulla laoreet efficitur risus.";
const PARA4 =
  "Vivamus massa turpis, congue in nibh eget, fringilla vestibulum tellus. Nam lorem augue, pellentesque id sollicitudin in, tincidunt vel tortor. In lectus leo, vehicula nec fermentum ut, accumsan quis diam. Nunc turpis massa, consequat non sem et, suscipit tincidunt leo. Praesent sit amet mi fringilla nunc sagittis volutpat eget sed ante. Ut at scelerisque magna, nec malesuada nisi. Etiam sit amet interdum velit. Vestibulum eleifend urna at quam venenatis aliquam.";
const PARA5 =
  "Donec eu feugiat magna. Phasellus pulvinar egestas facilisis. Phasellus bibendum, leo eu fringilla sollicitudin, ligula sem molestie augue, eget fringilla ipsum urna id erat. Aliquam tempor risus sit amet erat accumsan, nec iaculis ante vulputate. Nulla malesuada lectus vel augue volutpat, eget pretium lorem tincidunt. Cras id nisl maximus, laoreet neque eu, ultricies urna. Morbi pretium risus eu mi luctus, eu elementum eros eleifend. Proin viverra libero nec risus porta dictum. Maecenas convallis blandit velit, eget lobortis sem cursus eu. Aenean nibh justo, aliquam non luctus vel, rhoncus eget mi. Quisque metus arcu, dapibus id ante at, sagittis vehicula sapien. Morbi ultrices justo at nulla fermentum suscipit. Vivamus sed molestie sapien. In vitae cursus eros, sed efficitur dolor. Vivamus id mi sed nulla posuere elementum. Phasellus suscipit tempor eros, et sagittis felis pharetra tincidunt.";

export const ARTICLE: Article = [
  createParagraph(PARA1),
  createParagraph(PARA2),
  createParagraph(PARA3),
  createParagraph(PARA4),
  createParagraph(PARA5),
];

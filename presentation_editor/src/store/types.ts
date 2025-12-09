type Editor = {
  presentation: Presentation;
  selected: Selected;
};

type Presentation = {
  title: string;
  slides: SlideList;
};

type SlideList = Slide[];

type Slide = {
  id: string;
  slideObj: Array<SlideObj>;
  background: Background;
};

type SlideObj = TextObj | ImageObj;

type DefaultObj = {
  id: string;
  position: Position;
  size: Size;
};

type Position = {
  x: number;
  y: number;
};

type Size = {
  height: number;
  width: number;
};

type TextObj = DefaultObj & {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
};

type ImageObj = DefaultObj & {
  type: "image";
  src: string;
};

type Background = Color | Picture;

type Color = {
  type: "color";
  color: string;
};

type Picture = {
  type: "picture";
  src: string;
};

type Selected = {
  selectedSlidesIds: string[];
  selectedObjId: string | null;
};

export type {
  Editor,
  Presentation,
  Slide,
  SlideList,
  Selected,
  SlideObj,
  TextObj,
  ImageObj,
  Position,
  Size,
  Background,
};

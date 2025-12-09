import type {
  Editor,
  Presentation,
  Slide,
  Selected,
  TextObj,
  ImageObj,
} from "./types.ts";

const textObj1: TextObj = {
  id: "textObj1",
  position: {
    x: 350,
    y: 70,
  },
  size: {
    height: 100,
    width: 100,
  },
  type: "text",
  content: "Text",
  fontFamily: "Arial",
  fontSize: 40,
  fontColor: "#007000",
  bold: false,
  italic: false,
  underline: false,
};

const textObj2: TextObj = {
  id: "textObj2",
  position: {
    x: 10,
    y: 10,
  },
  size: {
    height: 50,
    width: 50,
  },
  type: "text",
  content: "Enter Your Text",
  fontFamily: "Arial",
  fontSize: 10,
  fontColor: "#000000",
  bold: false,
  italic: false,
  underline: false,
};

const textObj3: TextObj = {
  id: "textObj3",
  position: {
    x: 0,
    y: 0,
  },
  size: {
    height: 100,
    width: 100,
  },
  type: "text",
  content: "Enter Your Text",
  fontFamily: "Arial",
  fontSize: 20,
  fontColor: "#000000",
  bold: false,
  italic: false,
  underline: false,
};

const imageObj1: ImageObj = {
  id: "imageObj1",
  position: {
    x: 0,
    y: 0,
  },
  size: {
    height: 300,
    width: 300,
  },
  type: "image",
  src: "image1.jpg",
};

const imageObj2: ImageObj = {
  id: "imageObj2",
  position: {
    x: 50,
    y: 50,
  },
  size: {
    height: 200,
    width: 200,
  },
  type: "image",
  src: "image2.jpg",
};

const slide1: Slide = {
  id: "slide1",
  slideObj: [textObj1, imageObj1],
  background: {
    type: "color",
    color: "#ffffff",
  },
};

const slide2: Slide = {
  id: "slide2",
  slideObj: [textObj2, imageObj2],
  background: {
    type: "color",
    color: "#ffffff",
  },
};

const slide3: Slide = {
  id: "slide3",
  slideObj: [textObj3],
  background: {
    type: "color",
    color: "#ffffff",
  },
};

const presentation1: Presentation = {
  title: "New Presentation",
  slides: [slide1, slide2, slide3],
};

const selected1: Selected = {
  selectedSlidesIds: ["slide1", "slide2"],
  selectedObjId: "textObj1",
};

const editor: Editor = {
  presentation: presentation1,
  selected: selected1,
};

export { editor };

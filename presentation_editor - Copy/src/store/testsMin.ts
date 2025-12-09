import type { Editor, Presentation, Slide, Selected, TextObj } from "./types";
import {
  changePresentationTitle,
  addSlide,
  deleteSlides,
  moveSlide,
  addSlideObj,
  deleteSlideObj,
  moveSlideObj,
  changeSlideObjSize,
  changeTextContent,
  changeFontSize,
  changeFontFamily,
  changeBackground,
} from "./functions.ts";

const textObj1: TextObj = {
  id: "textObj1",
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

const slide1: Slide = {
  id: "slide1",
  slideObj: [],
  background: {
    type: "color",
    color: "#ffffff",
  },
};

const presentation1: Presentation = {
  title: "New Presentation",
  slides: [],
};

const selected1: Selected = {
  selectedSlidesIds: [],
  selectedObjId: null,
};

const editor: Editor = {
  presentation: presentation1,
  selected: selected1,
};

const newEditor1 = changePresentationTitle(editor, "Frontend");
console.log("Name change test:\n", newEditor1.presentation.title);

const newEditor2 = addSlide(editor, slide1);
console.log("Add slide test:\n", JSON.stringify(newEditor2, null, 2));

const newEditor3 = deleteSlides(editor);
console.log("Delete slide test:\n", newEditor3);

const newEditor4 = moveSlide(editor, 1);
console.log("Move slide test:\n", newEditor4);

const newEditor5 = addSlideObj(editor, textObj1);
console.log("Add slide object test:\n", newEditor5);

const newEditor6 = deleteSlideObj(editor);
console.log("Delete slide object test:\n", newEditor6);

const newEditor7 = moveSlideObj(editor, { x: 10, y: 20 });
console.log("Move slide object test:\n", newEditor7);

const newEditor8 = changeSlideObjSize(editor, { height: 100, width: 100 });
console.log("Change slide object size test:\n", newEditor8);

const newEditor9 = changeTextContent(editor, "new text content");
console.log("Change text content test:\n", newEditor9);

const newEditor10 = changeFontSize(editor, 30);
console.log("Change font size test:\n", newEditor10);

const newEditor11 = changeFontFamily(editor, "TimesNewRoman");
console.log("Change font family test:\n", newEditor11);

const newEditor12 = changeBackground(editor, {
  type: "color",
  color: "#000000",
});
console.log("Change background color test:\n", newEditor12);

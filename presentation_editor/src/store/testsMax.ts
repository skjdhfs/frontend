import type { Editor, Presentation, Slide, Selected, TextObj, ImageObj } from './types.ts';
import {
  changePresentationTitle,
  addSlide,
  deleteSlides,
  moveSlide,
  selectOneSlide,
  selectMultipleSlides,
  selectObject,
  addSlideObj,
  deleteSlideObj,
  moveSlideObj,
  changeSlideObjSize,
  changeTextContent,
  changeFontSize,
  changeFontFamily,
  changeBackground,
} from './functions';

const textObj1: TextObj = {
  id: 'textObj1',
  position: {
    x: 0,
    y: 0,
  },
  size: {
    height: 100,
    width: 100,
  },
  type: 'text',
  content: 'Enter Your Text',
  fontFamily: 'Arial',
  fontSize: 20,
  fontColor: '#000000',
  bold: false,
  italic: false,
  underline: false,
};

const textObj2: TextObj = {
  id: 'textObj2',
  position: {
    x: 10,
    y: 10,
  },
  size: {
    height: 50,
    width: 50,
  },
  type: 'text',
  content: 'Enter Your Text',
  fontFamily: 'Arial',
  fontSize: 10,
  fontColor: '#000000',
  bold: false,
  italic: false,
  underline: false,
};

const textObj3: TextObj = {
  id: 'textObj3',
  position: {
    x: 0,
    y: 0,
  },
  size: {
    height: 100,
    width: 100,
  },
  type: 'text',
  content: 'Enter Your Text',
  fontFamily: 'Arial',
  fontSize: 20,
  fontColor: '#000000',
  bold: false,
  italic: false,
  underline: false,
};

const imageObj1: ImageObj = {
  id: 'imageObj1',
  position: {
    x: 0,
    y: 0,
  },
  size: {
    height: 100,
    width: 100,
  },
  type: 'image',
  src: '#',
};

const imageObj2: ImageObj = {
  id: 'imageObj2',
  position: {
    x: 50,
    y: 50,
  },
  size: {
    height: 100,
    width: 100,
  },
  type: 'image',
  src: '#',
};

const slide1: Slide = {
  id: 'slide1',
  slideObj: [textObj1, imageObj1],
  background: {
    type: 'color',
    color: '#ffffff',
  },
};

const slide2: Slide = {
  id: 'slide2',
  slideObj: [textObj2, imageObj2],
  background: {
    type: 'color',
    color: '#ffffff',
  },
};

const slide3: Slide = {
  id: 'slide3',
  slideObj: [],
  background: {
    type: 'color',
    color: '#ffffff',
  },
};

const presentation1: Presentation = {
  title: 'New Presentation',
  slides: [slide1, slide2],
};

const selected1: Selected = {
  selectedSlidesIds: ['slide1', 'slide2'],
  selectedObjId: 'textObj1',
};

const editor: Editor = {
  presentation: presentation1,
  selected: selected1,
};

const newEditor1 = changePresentationTitle(editor, 'Frontend2');
console.log('Name change test:\n', newEditor1.presentation.title);

const newEditor2 = addSlide(editor, slide3);
console.log('Add slide test:\n', newEditor2.presentation.slides);

const newEditor3 = deleteSlides(editor);
console.log('Delete slide test:\n', newEditor3.presentation.slides);

const newEditor4 = moveSlide(newEditor2, 1);
console.log(
  'Move slide test:\n',
  newEditor4.presentation.slides[0].id,
  newEditor4.presentation.slides[1].id
);

const newEditor5 = selectOneSlide(newEditor2, 'slide3');
console.log('Select one slide test:\n', newEditor5.selected);

const newEditor6 = selectMultipleSlides(newEditor2, 'slide3');
console.log('Select multiple slides test:\n', newEditor6.selected);

const newEditor7 = selectObject(editor, 'textObj2');
console.log('Select object test:\n', newEditor7.selected);

const newEditor8 = addSlideObj(newEditor5, textObj3);
console.log(
  'Add slide object test:\n',
  newEditor8.presentation.slides[2],
  newEditor8.presentation.slides[2].slideObj[0]
);

const newEditor9 = deleteSlideObj(newEditor8);
console.log('Delete slide object test:\n', newEditor9.presentation.slides[2].slideObj);

const newEditor10 = moveSlideObj(newEditor8, { x: 50, y: 50 });
console.log('Move slide object test:\n', newEditor10.presentation.slides[2].slideObj[0].position);

const newEditor11 = changeSlideObjSize(newEditor8, { height: 50, width: 50 });
console.log('Change object size test:\n', newEditor11.presentation.slides[2].slideObj[0].size);

const newEditor12 = changeTextContent(newEditor8, 'new content');
console.log('Change text content test:\n', newEditor12.presentation.slides[2].slideObj[0]);

const newEditor13 = changeFontSize(newEditor8, 30);
console.log('Change font size test:\n', newEditor13.presentation.slides[2].slideObj[0].fontSize);

const newEditor14 = changeFontFamily(newEditor8, 'Times New Roman');
console.log(
  'Change font family test:\n',
  newEditor14.presentation.slides[2].slideObj[0].fontFamily
);

const newEditor15 = changeBackground(newEditor8, {
  type: 'color',
  color: '#000000',
});
console.log('Change background test:\n', newEditor15.presentation.slides[2].background);

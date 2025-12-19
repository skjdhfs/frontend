import type {
  Editor,
  Slide,
  Selected,
  SlideObj,
  Background,
  Position,
  Size,
  TextObj,
  ImageObj,
} from "./types.ts";

function createNewSlide(): Slide {
  const newId = `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  const defaultBackground: Background = {
    type: "color",
    color: "#ffffff",
  }

  const newSlide: Slide = {
    id: newId,
    slideObj: [],
    background: defaultBackground,
  }

  return newSlide
}

function createNewTextObject(): TextObj {
  const newId = `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  const defaultPosition: Position = {
    x: 0,
    y: 0
  }

  const defaultSize: Size = {
    height: 30,
    width: 110
  }

  const defaultContent: string = "Enter Your Text"

  const defaultFontFamily: string = "Arial"

  const defaultFontSize: number = 14

  const defaultFontColor: string = "#000"

  const newTextObj: TextObj = {
    type: "text",
    id: newId,
    position: defaultPosition,
    size: defaultSize,
    content: defaultContent,
    fontFamily: defaultFontFamily,
    fontSize: defaultFontSize,
    fontColor: defaultFontColor,
    bold: false,
    italic: false,
    underline: false
  }

  return newTextObj
}

function createNewImageObject(newSrc: string, newSize: Size): ImageObj {
  const newId = `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  const defaultPosition: Position = {
    x: 0,
    y: 0
  }

  const newImageObj: ImageObj = {
    type: "image",
    id: newId,
    position: defaultPosition,
    size: newSize,
    src: newSrc
  }

  return newImageObj
}

function createNewBackgroundPicture(newSrc: string): Background {
  const newBackground: Background = {
    type: "picture",
    src: newSrc
  }
  return newBackground
}

function createNewBackgroundColor(newColor: string): Background {
  const newBackground: Background = {
    type: "color", 
    color: newColor
  }
  return newBackground
}

function changePresentationTitle(editor: Editor, payload: {newTitle: string}): Editor {
  if (payload.newTitle.trim() === "") {
    return editor;
  }
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      title: payload.newTitle,
    },
  };
}

function addSlide(editor: Editor, payload: {newSlide: Slide}): Editor {
const newSlide = payload.newSlide;

  const selectedSlidesIds = editor.selected.selectedSlidesIds;
  const lastSelectedSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];

  const lastSelectedSlide = editor.presentation.slides.find(
    (slide) => slide.id == lastSelectedSlideId,
  )!;
  const targetSlideIndex =
    editor.presentation.slides.indexOf(lastSelectedSlide) + 1;

  const slides = editor.presentation.slides;
  const newSlides = [
    ...slides.slice(0, targetSlideIndex),
    newSlide,
    ...slides.slice(targetSlideIndex),
  ];

  const newSelectedSlidesIds = [newSlide.id];

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selected: {
      ...editor.selected,
      selectedSlidesIds: newSelectedSlidesIds,
      selectedObjId: null,
    },
  };
}

function deleteSlides(editor: Editor): Editor {
  const slides = editor.presentation.slides;
  const selectedSlidesIds = editor.selected.selectedSlidesIds;

  if (slides.length == 0 || selectedSlidesIds.length == 0) {
    return editor;
  };

  const newSlides = slides.filter(
    (slide) => !selectedSlidesIds.includes(slide.id),
  );

  let newSelectedSlidesIds: string[] = [];

  if (newSlides.length == 0)
  {
    newSelectedSlidesIds = []
  } else {
    const lastSelectedId = selectedSlidesIds[selectedSlidesIds.length - 1];
    console.log(lastSelectedId)

    const lastSelectedIndexInOriginal = slides.findIndex(s => s.id === lastSelectedId);
    console.log(lastSelectedIndexInOriginal)

    let targetIndex: number;

    if (lastSelectedIndexInOriginal >= selectedSlidesIds.length + 1) {
      targetIndex = lastSelectedIndexInOriginal - selectedSlidesIds.length + 1;
    } else {
      targetIndex = lastSelectedIndexInOriginal
    }
    console.log(targetIndex)

    if (targetIndex < newSlides.length) {
      newSelectedSlidesIds = [newSlides[targetIndex].id];
    } else {
      newSelectedSlidesIds = [newSlides[newSlides.length - 1].id];
    }
  }

  const newSelected: Selected = {
    selectedSlidesIds: newSelectedSlidesIds,
    selectedObjId: null,
  };
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selected: newSelected,
  };
}

function moveSlide(editor: Editor, targetSlideIndex: number): Editor {
  const slides = editor.presentation.slides;
  const selectedSlidesIds = editor.selected.selectedSlidesIds;

  if (selectedSlidesIds.length != 1) {
    return editor;
  }

  const movedSlide = slides.find((slide) => slide.id == selectedSlidesIds[0])!;

  const newSlides = [
    ...slides
      .slice(0, targetSlideIndex)
      .filter((slide) => slide.id != selectedSlidesIds[0]),
    movedSlide,
    ...slides
      .slice(targetSlideIndex + 1)
      .filter((slide) => slide.id != selectedSlidesIds[0]),
  ];

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
  };
}

function selectOneSlide(editor: Editor, payload: {selectedSlideId: string}): Editor {
  return {
    ...editor,
    selected: {
      ...editor.selected,
      selectedSlidesIds: [payload.selectedSlideId],
      selectedObjId: null,
    },
  };
}

function selectMultipleSlides(editor: Editor, payload: {selectedSlideId: string}): Editor {
  const currentSelectedIds = editor.selected.selectedSlidesIds;
  const slideIndex = currentSelectedIds.indexOf(payload.selectedSlideId);
  let newSelectedSlidesIds: string[];

  if (slideIndex === -1) {
    newSelectedSlidesIds = [...currentSelectedIds, payload.selectedSlideId]

  } else if (slideIndex > -1 && currentSelectedIds.length > 1) {
    newSelectedSlidesIds = [
      ...currentSelectedIds.slice(0, slideIndex),
      ...currentSelectedIds.slice(slideIndex + 1)
    ]

  } else {
    newSelectedSlidesIds = currentSelectedIds
  }

  return {
    ...editor,
    selected: {
      ...editor.selected,
      selectedSlidesIds: newSelectedSlidesIds,
      selectedObjId: null,
    },
  };
}

function selectObject(editor: Editor, payload: {selectedObjId: string}): Editor {
  const newSelectedObjId = payload.selectedObjId
  let newSelectedSlidesIds = [...editor.selected.selectedSlidesIds]

  if (editor.selected.selectedSlidesIds.length > 1) {
    for (const slide of editor.presentation.slides) {
      const foundSlide = slide.slideObj.find(obj => obj.id === newSelectedObjId)

      if (foundSlide) {
        newSelectedSlidesIds = [slide.id];
        break
      }
    }
  }
  return {
    ...editor,
    selected: {
      ...editor.selected,
      selectedObjId: newSelectedObjId,
      selectedSlidesIds: newSelectedSlidesIds,
    },
  };
}

function unselectObject(editor: Editor): Editor {
  return {
    ...editor,
    selected: {
      ...editor.selected,
      selectedObjId: null,
    }
  }
}

function addSlideObj(editor: Editor, payload: {newSlideObj: SlideObj}): Editor {
  if (editor.selected.selectedSlidesIds.length != 1) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == editor.selected.selectedSlidesIds[0]
      ? { ...slide, slideObj: [...slide.slideObj, payload.newSlideObj] }
      : slide,
  );
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selected: {
      ...editor.selected,
      selectedObjId: payload.newSlideObj.id,
    },
  };
}

function deleteSlideObj(editor: Editor): Editor {
  const selected = editor.selected;
  if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == selected.selectedSlidesIds[0]
      ? {
          ...slide,
          slideObj: slide.slideObj.filter(
            (obj) => obj.id != selected.selectedObjId,
          ),
        }
      : slide,
  );
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selected: {
      ...editor.selected,
      selectedObjId: null,
    },
  };
}

function moveSlideObj(editor: Editor, newPosition: Position): Editor {
  const selected = editor.selected;
  if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == selected.selectedSlidesIds[0]
      ? {
          ...slide,
          slideObj: slide.slideObj.map((obj) =>
            obj.id == selected.selectedObjId
              ? { ...obj, position: newPosition }
              : obj,
          ),
        }
      : slide,
  );
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
  };
}

function changeSlideObjSize(editor: Editor, newSize: Size): Editor {
  const selected = editor.selected;
  if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == selected.selectedSlidesIds[0]
      ? {
          ...slide,
          slideObj: slide.slideObj.map((obj) =>
            obj.id == selected.selectedObjId ? { ...obj, size: newSize } : obj,
          ),
        }
      : slide,
  );
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
  };
}

function changeTextContent(editor: Editor, payload: {newContent: string}): Editor {
  const selected = editor.selected;

  if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
    return editor;
  }

  const activeSlideId = selected.selectedSlidesIds[0];
  const targetObjId = selected.selectedObjId;
  const isContentEmpty = payload.newContent.trim() === "";

  const newSlides = editor.presentation.slides.map((slide) => {
    if (slide.id !== activeSlideId) {
      return slide;
    }

    return {
      ...slide,
      slideObj: isContentEmpty
        ? slide.slideObj.filter((obj) => obj.id !== targetObjId)
        : slide.slideObj.map((obj) =>
          obj.id === targetObjId && obj.type === "text"
            ? {...obj, content: payload.newContent}
            : obj
        )
    }
  }
  );
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selected: {
      ...editor.selected,
      selectedObjId: isContentEmpty ? null : editor.selected.selectedObjId,
    }
  };
}

function changeFontSize(editor: Editor, newFontSize: number): Editor {
  const selected = editor.selected;
  if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == selected.selectedSlidesIds[0]
      ? {
          ...slide,
          slideObj: slide.slideObj.map((obj) =>
            obj.id == selected.selectedObjId && obj.type == "text"
              ? { ...obj, fontSize: newFontSize }
              : obj,
          ),
        }
      : slide,
  );
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
  };
}

function changeFontFamily(editor: Editor, newFontFamily: string): Editor {
  const selected = editor.selected;
  if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == selected.selectedSlidesIds[0]
      ? {
          ...slide,
          slideObj: slide.slideObj.map((obj) =>
            obj.id == selected.selectedObjId && obj.type == "text"
              ? { ...obj, fontFamily: newFontFamily }
              : obj,
          ),
        }
      : slide,
  );
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
  };
}

function changeBackground(editor: Editor, payload: {newBackground: Background}): Editor {
  if (editor.selected.selectedSlidesIds.length != 1) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == editor.selected.selectedSlidesIds[0]
      ? { ...slide, background: payload.newBackground }
      : slide,
  );
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
  };
}

export {
  createNewSlide,
  createNewTextObject,
  createNewImageObject,
  createNewBackgroundPicture,
  createNewBackgroundColor,
  changePresentationTitle,
  addSlide,
  deleteSlides,
  moveSlide,
  selectOneSlide,
  selectMultipleSlides,
  selectObject,
  unselectObject,
  addSlideObj,
  deleteSlideObj,
  moveSlideObj,
  changeSlideObjSize,
  changeTextContent,
  changeFontSize,
  changeFontFamily,
  changeBackground,
};

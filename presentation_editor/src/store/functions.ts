import type {
  Editor,
  Slide,
  Selected,
  SlideObj,
  Background,
  Position,
  Size,
} from "./types.ts";

function generateNewSlide(): Slide {
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

function changePresentationTitle(editor: Editor, newTitle: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      title: newTitle,
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
    const lastSelectedIndexInOriginal = slides.findIndex(s => s.id === lastSelectedId);
    const targetIndex = lastSelectedIndexInOriginal - selectedSlidesIds.length + 1;

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
    },
  };
}

function selectMultipleSlides(editor: Editor, payload: {selectedSlideId: string}): Editor {
  const newSelectedSlidesIds = editor.selected.selectedSlidesIds;
  newSelectedSlidesIds.push(payload.selectedSlideId);

  return {
    ...editor,
    selected: {
      ...editor.selected,
      selectedSlidesIds: newSelectedSlidesIds,
    },
  };
}

function selectObject(editor: Editor, selectedObjId: string): Editor {
  return {
    ...editor,
    selected: {
      ...editor.selected,
      selectedObjId,
    },
  };
}

function addSlideObj(editor: Editor, newSlideObj: SlideObj): Editor {
  if (editor.selected.selectedSlidesIds.length != 1) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == editor.selected.selectedSlidesIds[0]
      ? { ...slide, slideObj: [...slide.slideObj, newSlideObj] }
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
      selectedObjId: newSlideObj.id,
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

function changeTextContent(editor: Editor, newContent: string): Editor {
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
              ? { ...obj, content: newContent }
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

function changeBackground(editor: Editor, newBackground: Background): Editor {
  if (editor.selected.selectedSlidesIds.length != 1) {
    return editor;
  }

  const newSlides = editor.presentation.slides.map((slide) =>
    slide.id == editor.selected.selectedSlidesIds[0]
      ? { ...slide, background: newBackground }
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
  generateNewSlide,
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
};

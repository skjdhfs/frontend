import { createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import type { Editor, Slide, SlideObj } from './types.ts';
import { createNewSlide } from './functions.ts';
import { loadFromLocalStorage } from './localStorage.ts';
import type { Background, Position, Size } from './types.ts';

const defaultSlide: Slide = createNewSlide();
const defaultEditor: Editor = {
  presentation: { title: 'New Presentation', slides: [defaultSlide] },
  selected: { selectedSlidesIds: [defaultSlide.id], selectedObjId: null },
};
const initialState: Editor = loadFromLocalStorage() || defaultEditor;

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addSlide: (state, action: PayloadAction<{ newSlide: Slide }>) => {
      const {newSlide} = action.payload;
      const selectedSlidesIds = state.selected.selectedSlidesIds;
      const slides = state.presentation.slides

      let targetIndex = slides.length

      if (selectedSlidesIds.length > 0) {
        const lastSelectedId = selectedSlidesIds[selectedSlidesIds.length - 1]
        const lastIndex = slides.findIndex(s => s.id === lastSelectedId)

        if (lastIndex !== -1) {
          targetIndex = lastIndex + 1
        }
      }

      slides.splice(targetIndex, 0, newSlide)
      state.selected.selectedSlidesIds = [newSlide.id]
      state.selected.selectedObjId = null
    },

    deleteSlides: (state) => {
      const slides = state.presentation.slides;
      const selectedIds = state.selected.selectedSlidesIds;

      if (slides.length === 0 || selectedIds.length === 0) return;

      const lastSelectedId = selectedIds[selectedIds.length - 1];
      const lastSelectedIndex = slides.findIndex((s) => s.id === lastSelectedId);

      const remainingSlides = slides.filter((slide) => !selectedIds.includes(slide.id));
      state.presentation.slides = remainingSlides;

      if (remainingSlides.length === 0) {
        state.selected.selectedSlidesIds = [];
        state.selected.selectedObjId = null;
        return;
      }

      let targetIndex = lastSelectedIndex;

      if (targetIndex >= remainingSlides.length) {
        targetIndex = remainingSlides.length - 1;
      }

      state.selected.selectedSlidesIds = [remainingSlides[targetIndex].id];
      state.selected.selectedObjId = null;
    },

    addSlideObj: (state, action: PayloadAction<{ newObj: SlideObj }>) => {
      if (state.selected.selectedSlidesIds.length != 1) {
        return;
      }

      state.presentation.slides.map((slide) => {
        if (slide.id === state.selected.selectedSlidesIds[0]) {
          slide.slideObj.push(action.payload.newObj)
        }
      })

      state.selected.selectedObjId = action.payload.newObj.id
    },

    deleteSlideObj: (state) => {
      const selected = state.selected
      if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
        return;
      }

      const targetSlide = state.presentation.slides.find((s) => s.id === selected.selectedSlidesIds[0])
      if (targetSlide) {
        targetSlide.slideObj = targetSlide.slideObj.filter((obj) => obj.id !== selected.selectedObjId)
      }
     
      state.selected.selectedObjId = null
    },

    changeTitle: (state, action: PayloadAction<{ newTitle: string }>) => {
      if (action.payload.newTitle.trim() === '') {
        return
      }

      state.presentation.title = action.payload.newTitle
    },

    selectOneSlide: (state, action: PayloadAction<{ selectedSlideId: string }>) => {
      state.selected.selectedSlidesIds = [action.payload.selectedSlideId]
      state.selected.selectedObjId = null
    },

    selectMultipleSlides: (state, action: PayloadAction<{ selectedSlideId: string }>) => {
      const selectedIds = state.selected.selectedSlidesIds
      const newId = action.payload.selectedSlideId
      const slideIndex = selectedIds.indexOf(newId)

      if (slideIndex === -1) {
        state.selected.selectedSlidesIds.push(newId)
      } else if (slideIndex > -1 && selectedIds.length > 1) {
        state.selected.selectedSlidesIds.splice(slideIndex, 1)
      }

      state.selected.selectedObjId = null
    },

    moveSlides: (state, action: PayloadAction<{ targetIndex: number }>) => {
      const slides = state.presentation.slides
      const selectedSlidesIds = state.selected.selectedSlidesIds
      const targetIndex = action.payload.targetIndex

      const movedSlides = slides.filter((s) => selectedSlidesIds.includes(s.id))
      const remainingSlides = slides.filter((s) => !selectedSlidesIds.includes(s.id));

      if (targetIndex === 0) {
        state.presentation.slides = [...movedSlides, ...remainingSlides]
      } else {
        const insertAt = slides[targetIndex - 1]
        const insertIndex = remainingSlides.indexOf(insertAt)

        if (insertIndex === -1) return

        state.presentation.slides = remainingSlides
        state.presentation.slides.splice(insertIndex + 1, 0, ...movedSlides)

        state.selected.selectedObjId = null
      }
    },

    selectObject: (state, action: PayloadAction<{ selectedObjId: string }>) => {
      const selectedObjId = action.payload.selectedObjId

      if (state.selected.selectedSlidesIds.length > 1) {
        state.presentation.slides.map((slide) => {
          if (slide.slideObj.find((obj) => obj.id === selectedObjId)) {
            state.selected.selectedSlidesIds = [slide.id]
          }
        })
      }

      state.selected.selectedObjId = selectedObjId
    },

    unselectObject: (state) => {
      state.selected.selectedObjId = null
    },

    changeTextContent: (state, action: PayloadAction<{ newContent: string }>) => {
      const selected = state.selected
      const newContent = action.payload.newContent

      if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
        return;
      }

      const targetSlide = state.presentation.slides.find((s) => s.id === selected.selectedSlidesIds[0])
      const targetObjId = selected.selectedObjId;
      
      if (targetSlide) {
        const targetObject = targetSlide.slideObj.find((obj) => obj.id ===targetObjId)

        if (targetObject) {
          const isContentEmpty = newContent.trim() === '';
          if (isContentEmpty) {
            targetSlide.slideObj = targetSlide.slideObj.filter((obj) => obj.id !== targetObjId)
          } else if (targetObject.type === 'text') {
            targetObject.content = newContent
          }
        }
      }
    },

    changeBackground: (state, action: PayloadAction<{ newBackground: Background }>) => {
      const selectedSlidesIds = state.selected.selectedSlidesIds
      const slides = state.presentation.slides

      if (selectedSlidesIds.length !== 1) return

      const targetSlideId = selectedSlidesIds[0]
      const targetSlide = slides.find((s) => s.id === targetSlideId)

      if (targetSlide) {
        targetSlide.background = action.payload.newBackground
      }
    },

    changeObjectPosition: (state, action: PayloadAction<{ newPosition: Position }>) => {
      const selected = state.selected
      const slides = state.presentation.slides
      if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
        return;
      }

      const targetSlideId = selected.selectedSlidesIds[0]
      const targetSlide = slides.find((s) => s.id === targetSlideId)

      if (targetSlide) {
        const targetObjId = selected.selectedObjId
        const targetObject = targetSlide.slideObj.find((obj) => obj.id === targetObjId)

        if (targetObject) {
          targetObject.position = action.payload.newPosition
        }
      }
    },

    changeObjectSize: (state, action: PayloadAction<{ newSize: Size; newPosition?: Position }>) => {
      const selected = state.selected
      const slides = state.presentation.slides

      if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
        return;
      }

      const targetSlideId = selected.selectedSlidesIds[0]
      const targetSlide = slides.find((s) => s.id === targetSlideId)

      if (targetSlide) {
        const targetObjId = selected.selectedObjId
        const targetObject = targetSlide.slideObj.find((obj) => obj.id === targetObjId)

        if (targetObject) {
          targetObject.size = action.payload.newSize
          targetObject.position = action.payload.newPosition || targetObject.position
        }
      }
    }
  }
});

export const { 
  addSlide, 
  deleteSlides, 
  addSlideObj, 
  deleteSlideObj, 
  changeTitle,
  selectOneSlide,
  selectMultipleSlides,
  moveSlides,
  selectObject,
  unselectObject,
  changeTextContent,
  changeBackground,
  changeObjectPosition,
  changeObjectSize,
} = editorSlice.actions;

export default editorSlice.reducer;
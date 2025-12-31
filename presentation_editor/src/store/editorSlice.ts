import { createSlice, current} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import type { Editor, Slide, SlideObj } from './types.ts';
import { createNewSlide } from './functions.ts';
import { loadFromLocalStorage } from './localStorage.ts';
import type { Background, Position, Size } from './types.ts';

interface EditorState {
  present: Editor,
  history: EditorHistory,
}

interface EditorHistory {
  past: Editor[],
  future: Editor[],
}

const defaultSlide: Slide = createNewSlide();
const defaultEditor: Editor = {
  presentation: { title: 'New Presentation', slides: [defaultSlide] },
  selected: { selectedSlidesIds: [defaultSlide.id], selectedObjId: null },
};
const initialState: EditorState = {
  present: loadFromLocalStorage() || defaultEditor,
  history: {
    past: [],
    future: [],
  }
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    commitToHistory: (state) => {
      state.history.past.push(current(state.present))
      state.history.future = []

      const maxHistoryLength = 50
      if (state.history.past.length > maxHistoryLength) {
        state.history.past.shift()
      }
    },

    undoAction: (state) => {
      const previousState = state.history.past.pop()
      if (previousState) {
        state.history.future.push(state.present)
        state.present = previousState
      }
    },

    redoAction: (state) => {
      const nextState = state.history.future.pop()
      if (nextState) {
        state.history.past.push(state.present)
        state.present = nextState
      }
    },

    addSlide: (state, action: PayloadAction<{ newSlide: Slide }>) => {
      editorSlice.caseReducers.commitToHistory(state)
      
      const {newSlide} = action.payload;
      const selectedSlidesIds = state.present.selected.selectedSlidesIds;
      const slides = state.present.presentation.slides

      let targetIndex = slides.length

      if (selectedSlidesIds.length > 0) {
        const lastSelectedId = selectedSlidesIds[selectedSlidesIds.length - 1]
        const lastIndex = slides.findIndex(s => s.id === lastSelectedId)

        if (lastIndex !== -1) {
          targetIndex = lastIndex + 1
        }
      }

      slides.splice(targetIndex, 0, newSlide)
      state.present.selected.selectedSlidesIds = [newSlide.id]
      state.present.selected.selectedObjId = null
    },

    deleteSlides: (state) => {
      const slides = state.present.presentation.slides;
      const selectedIds = state.present.selected.selectedSlidesIds;

      if (slides.length === 0 || selectedIds.length === 0) return;

      editorSlice.caseReducers.commitToHistory(state)

      const lastSelectedId = selectedIds[selectedIds.length - 1];
      const lastSelectedIndex = slides.findIndex((s) => s.id === lastSelectedId);

      const remainingSlides = slides.filter((slide) => !selectedIds.includes(slide.id));
      state.present.presentation.slides = remainingSlides;

      if (remainingSlides.length === 0) {
        state.present.selected.selectedSlidesIds = [];
        state.present.selected.selectedObjId = null;
        return;
      }

      let targetIndex = lastSelectedIndex;

      if (targetIndex >= remainingSlides.length) {
        targetIndex = remainingSlides.length - 1;
      }

      state.present.selected.selectedSlidesIds = [remainingSlides[targetIndex].id];
      state.present.selected.selectedObjId = null;
    },

    addSlideObj: (state, action: PayloadAction<{ newObj: SlideObj }>) => {
      if (state.present.selected.selectedSlidesIds.length != 1) {
        return;
      }

      editorSlice.caseReducers.commitToHistory(state)

      state.present.presentation.slides.map((slide) => {
        if (slide.id === state.present.selected.selectedSlidesIds[0]) {
          slide.slideObj.push(action.payload.newObj)
        }
      })

      state.present.selected.selectedObjId = action.payload.newObj.id
    },

    deleteSlideObj: (state) => {
      const selected = state.present.selected
      if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
        return;
      }

      editorSlice.caseReducers.commitToHistory(state)

      const targetSlide = state.present.presentation.slides.find((s) => s.id === selected.selectedSlidesIds[0])
      if (targetSlide) {
        targetSlide.slideObj = targetSlide.slideObj.filter((obj) => obj.id !== selected.selectedObjId)
      }
     
      state.present.selected.selectedObjId = null
    },

    changeTitle: (state, action: PayloadAction<{ newTitle: string }>) => {
      if (action.payload.newTitle.trim() === '') {
        return
      }

      editorSlice.caseReducers.commitToHistory(state)

      state.present.presentation.title = action.payload.newTitle
    },

    selectOneSlide: (state, action: PayloadAction<{ selectedSlideId: string }>) => {
      state.present.selected.selectedSlidesIds = [action.payload.selectedSlideId]
      state.present.selected.selectedObjId = null
    },

    selectMultipleSlides: (state, action: PayloadAction<{ selectedSlideId: string }>) => {
      const selectedIds = state.present.selected.selectedSlidesIds
      const newId = action.payload.selectedSlideId
      const slideIndex = selectedIds.indexOf(newId)

      if (slideIndex === -1) {
        state.present.selected.selectedSlidesIds.push(newId)
      } else if (slideIndex > -1 && selectedIds.length > 1) {
        state.present.selected.selectedSlidesIds.splice(slideIndex, 1)
      }

      state.present.selected.selectedObjId = null
    },

    moveSlides: (state, action: PayloadAction<{ targetIndex: number }>) => {
      const slides = state.present.presentation.slides
      const selectedSlidesIds = state.present.selected.selectedSlidesIds
      const targetIndex = action.payload.targetIndex

      const movedSlides = slides.filter((s) => selectedSlidesIds.includes(s.id))
      const remainingSlides = slides.filter((s) => !selectedSlidesIds.includes(s.id));

      if (targetIndex === 0) {
        state.present.presentation.slides = [...movedSlides, ...remainingSlides]
      } else {
        const insertAt = slides[targetIndex - 1]
        const insertIndex = remainingSlides.indexOf(insertAt)

        if (insertIndex === -1) return

        editorSlice.caseReducers.commitToHistory(state)

        state.present.presentation.slides = remainingSlides
        state.present.presentation.slides.splice(insertIndex + 1, 0, ...movedSlides)

        state.present.selected.selectedObjId = null
      }
    },

    selectObject: (state, action: PayloadAction<{ selectedObjId: string }>) => {
      const selectedObjId = action.payload.selectedObjId

      if (state.present.selected.selectedSlidesIds.length > 1) {
        state.present.presentation.slides.map((slide) => {
          if (slide.slideObj.find((obj) => obj.id === selectedObjId)) {
            state.present.selected.selectedSlidesIds = [slide.id]
          }
        })
      }

      state.present.selected.selectedObjId = selectedObjId
    },

    unselectObject: (state) => {
      state.present.selected.selectedObjId = null
    },

    changeTextContent: (state, action: PayloadAction<{ newContent: string }>) => {
      const selected = state.present.selected
      const newContent = action.payload.newContent

      if (selected.selectedSlidesIds.length != 1 || !selected.selectedObjId) {
        return;
      }

      editorSlice.caseReducers.commitToHistory(state)

      const targetSlide = state.present.presentation.slides.find((s) => s.id === selected.selectedSlidesIds[0])
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
      const selectedSlidesIds = state.present.selected.selectedSlidesIds
      const slides = state.present.presentation.slides

      if (selectedSlidesIds.length !== 1) return

      editorSlice.caseReducers.commitToHistory(state)

      const targetSlideId = selectedSlidesIds[0]
      const targetSlide = slides.find((s) => s.id === targetSlideId)

      if (targetSlide) {
        targetSlide.background = action.payload.newBackground
      }
    },

    changeObjectPosition: (state, action: PayloadAction<{ newPosition: Position }>) => {
      const selected = state.present.selected
      const slides = state.present.presentation.slides
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
      const selected = state.present.selected
      const slides = state.present.presentation.slides

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
  commitToHistory,
  undoAction,
  redoAction,
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
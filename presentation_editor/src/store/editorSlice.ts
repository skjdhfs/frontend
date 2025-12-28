import { createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import type { Editor, Slide } from './types.ts';
import { createNewSlide } from './functions.ts';
import { loadFromLocalStorage } from './localStorage.ts';

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

        let newSlides: Slide[] = []

        if (!selectedSlidesIds) {
            newSlides.push(newSlide)
        } else {
            const lastSelectedSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
            const lastSelectedSlide = state.presentation.slides.find(
            (slide) => slide.id == lastSelectedSlideId
            )!;
            const targetSlideIndex = state.presentation.slides.indexOf(lastSelectedSlide) + 1;

            newSlides = [
            ...slides.slice(0, targetSlideIndex),
            newSlide,
            ...slides.slice(targetSlideIndex),
            ];
        }

        const newSelectedSlidesIds = [newSlide.id];

        state.presentation.slides = newSlides
        state.selected.selectedSlidesIds = newSelectedSlidesIds
        state.selected.selectedObjId = null
    },
  }
});


export const { addSlide } = editorSlice.actions;

export default editorSlice.reducer;
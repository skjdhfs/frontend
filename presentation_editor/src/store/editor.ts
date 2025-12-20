import type { Editor, Slide } from './types.ts';
import { createNewSlide } from './functions.ts';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage.ts';

const defaultSlide: Slide = createNewSlide()
const defaultEditor: Editor = {
  presentation: {title: 'New Presentation', slides: [defaultSlide]},
  selected: {selectedSlidesIds: [defaultSlide.id], selectedObjId: null}
}
const initialState: Editor = loadFromLocalStorage() || defaultEditor;

let editor: Editor = initialState;

let editorChangeHandler: null | (() => void) = null;

function getEditor() {
  return editor;
}

function setEditor(newEditor: Editor) {
  editor = newEditor;
}

function dispatch<P>(modifyFn: (currentEditor: Editor, payload: P) => Editor, payload: P) {
  const newEditor: Editor = modifyFn(editor, payload);
  setEditor(newEditor);

  saveToLocalStorage(editor);

  if (editorChangeHandler) {
    editorChangeHandler();
  }
}

function addEditorChangeHandler(handler: () => void) {
  editorChangeHandler = handler;
}

export { getEditor, dispatch, addEditorChangeHandler };

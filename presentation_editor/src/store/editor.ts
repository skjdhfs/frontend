import type { Editor } from "./types.ts";
import { testEditor } from "./data.ts";

let editor: Editor = testEditor;

let editorChangeHandler: null| (() => void) = null;

function getEditor() {
    return editor;
}

function setEditor(newEditor: Editor) {
    editor = newEditor;
}

function dispatch<P>(modifyFn: (currentEditor: Editor, payload: P) => Editor, payload: P) {

    const newEditor: Editor = modifyFn(editor, payload);
    setEditor(newEditor);

    if (editorChangeHandler) {
        editorChangeHandler()
    }
}

function addEditorChangeHandler(handler: () => void) {
    editorChangeHandler = handler;
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler
}
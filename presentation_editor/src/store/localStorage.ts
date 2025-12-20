import type {Editor} from './types'

const STORAGE_KEY = 'presentation_editor_data';

function saveToLocalStorage(editor: Editor) {
    try {
        const serializedState = JSON.stringify(editor);
        localStorage.setItem(STORAGE_KEY, serializedState)
    } catch (e) {
        console.log('Ошибка при сохранении в Local Storage: ', e)
    }
}

function loadFromLocalStorage(): Editor | undefined {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY)
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.log('Ошибка при загрузке из Local Storage: ', e)
        return undefined
    }
}

export {
    saveToLocalStorage, 
    loadFromLocalStorage,
}
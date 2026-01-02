import { Select } from "../../common/Select/Select";
import { changeFontFamily } from "../../store/editorSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks";

function SelectFont() {
    const dispatch = useAppDispatch()

    const FONT_FAMILIES = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Roboto'];

    const selected = useAppSelector((state) => state.editor.present.selected)
    
    const currentSlide = useAppSelector((state) => {
        const slides = state.editor.present.presentation.slides
        const selectedSlidesIds = state.editor.present.selected.selectedSlidesIds
        const currentSlideId = selectedSlidesIds[0]
        return slides.find(s => s.id === currentSlideId)
    })
    
    const currentObject = currentSlide?.slideObj.find(obj => obj.id === selected.selectedObjId)

    const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (currentSlide && currentObject) {
            dispatch(changeFontFamily({slideId: currentSlide.id, objectId: currentObject.id, newFontFamily: e.target.value}))
        }
       
    }

    const defaultFont = FONT_FAMILIES[0]
    const currentFont = currentObject && currentObject.type === 'text' ? currentObject.fontFamily : defaultFont

    return (
        <Select options={FONT_FAMILIES} value={currentFont} name={'Font Family'} onChange={handleFontFamilyChange}></Select>
    )
}

export {SelectFont}
import { InputField } from "../../common/InputField/InputField"
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks"
import { useState, useEffect } from "react"
import { changeFontSize } from "../../store/editorSlice"

function InputFontSize() {
    const dispatch = useAppDispatch()

    const selected = useAppSelector((state) => state.editor.present.selected)
    
    const currentSlide = useAppSelector((state) => {
    const slides = state.editor.present.presentation.slides
    const selectedSlidesIds = state.editor.present.selected.selectedSlidesIds
    const currentSlideId = selectedSlidesIds[0]
    return slides.find(s => s.id === currentSlideId)
    })

    const currentObject = currentSlide?.slideObj.find(obj => obj.id === selected.selectedObjId)
    
    const defaultFontSize = '14'
    const fontSize = currentObject && currentObject.type === 'text' ? String(currentObject.fontSize) : defaultFontSize

    const [inputFontSize, setInputFontSize] = useState(fontSize)
    useEffect(() => {
    setInputFontSize(fontSize)
    }, [fontSize])

    const handleFontSizeChange = () => {
    const newSize = Number(inputFontSize)
    if (!isNaN(newSize) && inputFontSize.trim() !== '' && currentSlide && currentObject) {
        dispatch(changeFontSize({slideId: currentSlide.id, objectId: currentObject.id, newSize}))
    } else {
        setInputFontSize(fontSize)
    }
    }
    return(
        <InputField
            placeholder={'Presentation Title'}
            value={inputFontSize}
            onChange={(e) => setInputFontSize(e.target.value)}
            onBlur={handleFontSizeChange}
        ></InputField>
    )
}

export {InputFontSize}
import { InputField } from "../../common/InputField/InputField";
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks";
import { useState, useEffect } from "react";
import { changeTitle } from "../../store/editorSlice";

function InputTitle() {
    const dispatch = useAppDispatch()

    const title = useAppSelector((state) => state.editor.present.presentation.title);

    const [inputTitle, setInputTitle] = useState(title)
    useEffect(() => {
    setInputTitle(title)
    }, [title])
    
    const handleTitleChange = () => {
    if (inputTitle.trim() !== '') {
        dispatch(changeTitle({ newTitle: inputTitle }));
    } else {
        setInputTitle(title)
    }
    };

    return(
        <InputField
            placeholder={'Presentation Title'}
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            onBlur={handleTitleChange}
        ></InputField>
    )
}

export {InputTitle}
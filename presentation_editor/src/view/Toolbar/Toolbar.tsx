import styles from './Toolbar.module.css';
import { useAppDispatch, useAppSelector} from '../../store/hooks/reduxHooks';
import { ButtonLarge } from '../../common/ButtonLarge/ButtonLarge';
import { ButtonSmall } from '../../common/ButtonSmall/ButtonSmall';
import { InputFile } from '../../common/InputFile/InputFile';
import { DropdownMenu } from '../../common/DropdownMenu/DropdownMenu';
import { SelectFont } from '../SelectFont/SelectFont';
import { InputTitle } from '../InputTitle/InputTitle';
import { InputColor } from '../../common/InputColor/InputColor';
import { InputFontSize } from '../InputFontSize/InputFontSize';
import type { Size } from '../../store/types';
import { createNewTextObject, createNewSlide, createNewImageObject } from '../../store/functions';
import { addSlide, deleteSlides, addSlideObj, deleteSlideObj, undoAction, redoAction, changeFontWeight, changeFontColor, changeFontItalic, changeFontUnderline } from '../../store/editorSlice';

function Toolbar() {
  const dispatch = useAppDispatch()

  const slides = useAppSelector((state) => state.editor.present.presentation.slides)
  const selected = useAppSelector((state) => state.editor.present.selected)

  const targetSlideId = selected.selectedSlidesIds[0]
  const targetSlide = slides.find(s => s.id === targetSlideId)

  const targetObjectId = selected.selectedObjId
  const targetObject = targetSlide?.slideObj.find(obj => obj.id === targetObjectId)

  const handleAddSlideClick = () => {
    dispatch(addSlide({newSlide: createNewSlide()}));
  };

  const handleDeleteSlidesClick = () => {
    dispatch(deleteSlides());
  };

  const handleAddTextObject = () => {
    dispatch(addSlideObj({ newObj: createNewTextObject() }));
  };

  const handleDeleteSlideObject = () => {
    dispatch(deleteSlideObj());
  };

  const handleAddSlideImgObj = (src: string, size: Size) => {
    dispatch(addSlideObj({ newObj: createNewImageObject(src, size) }));
  };

  const handleUndo = () => {
    dispatch(undoAction())
  }

  const handleRedo = () => {
    dispatch(redoAction())
  }

  const handleFontWeightChange = () => {
    if (targetSlide && targetObject) {
      dispatch(changeFontWeight({slideId: targetSlide.id, objectId: targetObject.id}))
    }
  }

  const handleFontColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event?.target.value;
    if (targetSlide && targetObject) {
      dispatch(changeFontColor({slideId: targetSlide.id, objectId: targetObject.id, newColor}))
    }
  }

  const handleItalicChange = () => {
    if (targetSlide && targetObject) {
      dispatch(changeFontItalic({slideId: targetSlide.id, objectId: targetObject.id}))
    }
  }

  const handleUnderlineChange = () => {
    if (targetSlide && targetObject) {
      dispatch(changeFontUnderline({slideId: targetSlide.id, objectId: targetObject.id}))
    }
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.section}>
        <InputTitle></InputTitle>
        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={'src/assets/arrow-undo.png'}
            text={'Отменить'}
            onClick={handleUndo}
          ></ButtonSmall>

          <ButtonSmall
            image={'src/assets/arrow-redo.png'}
            text={'Вернуть'}
            onClick={handleRedo}
          ></ButtonSmall>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.buttonContainer}>
          <ButtonLarge
            image={'src/assets/add-slide.png'}
            text={'Добавить слайд'}
            onClick={handleAddSlideClick}
          ></ButtonLarge>

          <ButtonLarge
            image={'src/assets/delete.png'}
            text={'Удалить слайд'}
            onClick={handleDeleteSlidesClick}
          ></ButtonLarge>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={'src/assets/text.png'}
            text={'Добавить текст'}
            onClick={handleAddTextObject}
          ></ButtonSmall>

          <InputFile
            image={'src/assets/image.png'}
            text={'Добавить изображение'}
            onImageLoadSuccess={handleAddSlideImgObj}
          ></InputFile>
        </div>

        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={'src/assets/delete.png'}
            text={'Удалить элемент'}
            onClick={handleDeleteSlideObject}
          ></ButtonSmall>

          <DropdownMenu></DropdownMenu>
        </div>
      </div>

      <div className={styles.section}>
        <SelectFont></SelectFont>
        <InputFontSize></InputFontSize>
      </div>

      <div className={styles.section}>
        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={'src/assets/bold.png'}
            text={'Жирный текст'}
            onClick={handleFontWeightChange}
          ></ButtonSmall>

          <ButtonSmall
            image={'src/assets/italic.png'}
            text={'Курсив'}
            onClick={handleItalicChange}
          ></ButtonSmall>
        </div>

        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={'src/assets/underline.png'}
            text={'Подчеркивание'}
            onClick={handleUnderlineChange}
          ></ButtonSmall>

          <InputColor
            image={'src/assets/palette.png'}
            text={'Цвет текста'}
            onChange={handleFontColorChange}
          ></InputColor>
        </div>
      </div>
      
      <div className={styles.section}>
        
        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={'src/assets/save.png'}
            text={'Сохранить PDF'}
            onClick={() => console.log('Сохранение презентации в PDF')}
          ></ButtonSmall>

          <ButtonSmall
            image={'src/assets/play.png'}
            text={'Проигрывать'}
            onClick={() => console.log('Просмотр презентации')}
          ></ButtonSmall>
        </div>
      </div>
    </div>
  );
}

export { Toolbar };

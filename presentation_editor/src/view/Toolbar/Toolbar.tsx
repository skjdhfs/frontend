import styles from './Toolbar.module.css';
import { ButtonLarge } from '../../common/ButtonLarge/ButtonLarge';
import { ButtonSmall } from '../../common/ButtonSmall/ButtonSmall';
import { InputField } from '../../common/InputField/InputField';
import { InputFile } from '../../common/InputFile/InputFile';
import { Select } from '../../common/Select/Select';
import { DropdownMenu } from '../../common/DropdownMenu/DropdownMenu';
import type { Size } from '../../store/types';
import { createNewTextObject, createNewSlide, createNewImageObject } from '../../store/functions';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { addSlide, deleteSlides, addSlideObj, deleteSlideObj, changeTitle } from '../../store/editorSlice';

function Toolbar() {
  const dispatch = useAppDispatch()

  const title = useAppSelector((state) => state.editor.presentation.title);

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

  const handleTitleChange = (title: string) => {
    dispatch(changeTitle({ newTitle: title }));
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.section}>
        <InputField
          placeholder={'Presentation Title'}
          value={title}
          onBlur={handleTitleChange}
        ></InputField>
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
        <Select></Select>
        {/* <InputField placeholder={'Font Size'} value={'14'} onBlur={handleTitleChange}></InputField> */}
      </div>

      <div className={styles.section}>
        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={'src/assets/bold.png'}
            text={'Жирный текст'}
            onClick={() => console.log('Жирный текст')}
          ></ButtonSmall>

          <ButtonSmall
            image={'src/assets/italic.png'}
            text={'Курсив'}
            onClick={() => console.log('Курсив')}
          ></ButtonSmall>
        </div>

        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={'src/assets/underline.png'}
            text={'Подчеркивание'}
            onClick={() => console.log('Подчеркивание')}
          ></ButtonSmall>

          <ButtonSmall
            image={'src/assets/palette.png'}
            text={'Цвет текста'}
            onClick={() => console.log('Изменить цвет текста')}
          ></ButtonSmall>
        </div>
      </div>
    </div>
  );
}

export { Toolbar };

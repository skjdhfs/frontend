import styles from "./Toolbar.module.css";
import { ButtonLarge } from "../../common/ButtonLarge/ButtonLarge";
import { ButtonSmall } from "../../common/ButtonSmall/ButtonSmall";
import { InputField } from "../../common/InputField/InputField";
import { Select } from "../../common/Select/Select";

import { dispatch } from "../../store/editor";
import { addSlide, addSlideObj, createNewTextObject, deleteSlides } from "../../store/functions";
import { createNewSlide } from "../../store/functions";

function Toolbar() {

  const handleAddSlideClick = () => {
    dispatch(addSlide, {newSlide: createNewSlide()})
  };

  const handleDeleteSlidesClick = () => {
    dispatch<void>(deleteSlides, undefined)
  }

  const handleAddTextObject = () => {
    dispatch(addSlideObj, {newSlideObj: createNewTextObject()})
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.section}>
        <InputField
          text={"New Presentation"}
          id={"title"}
          onInput={(event) =>
            console.log(
              "Новое название презентации: ",
              event.currentTarget.value,
            )
          }
        ></InputField>
        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={"src/assets/save.png"}
            text={"Сохранить PDF"}
            onClick={() => console.log("Сохранение презентации в PDF")}
          ></ButtonSmall>

          <ButtonSmall
            image={"src/assets/play.png"}
            text={"Проигрывать"}
            onClick={() => console.log("Просмотр презентации")}
          ></ButtonSmall>
        </div>
        
      </div>

      <div className={styles.section}>
        <div className={styles.buttonContainer}>
          <ButtonLarge
            image={"src/assets/add-slide.png"}
            text={"Добавить слайд"}
            onClick={handleAddSlideClick}
          ></ButtonLarge>

          <ButtonLarge
            image={"src/assets/delete.png"}
            text={"Удалить слайд"}
            onClick={handleDeleteSlidesClick}
          ></ButtonLarge>
        </div>
        
      </div>

      <div className={styles.section}>
        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={"src/assets/text.png"}
            text={"Добавить текст"}
            onClick={handleAddTextObject}
          ></ButtonSmall>

          <ButtonSmall
            image={"src/assets/image.png"}
            text={"Добавить изображение"}
            onClick={() => console.log("Добавление изображения")}
          ></ButtonSmall>
        </div>

        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={"src/assets/delete.png"}
            text={"Удалить элемент"}
            onClick={() => console.log("Удаление элемента")}
          ></ButtonSmall>

          <ButtonSmall
            image={"src/assets/fill.png"}
            text={"Цвет фона"}
            onClick={() => console.log("Изменение цвета фона")}
          ></ButtonSmall>
        </div>
      </div>

      <div className={styles.section}>
        <Select ></Select>
        <InputField
          text={"Font Size"}
          id={"font-size"}
          onInput={(event) =>
            console.log("Размер шрифта изменен на: ", event.currentTarget.value)
          }
        ></InputField>
      </div>

      <div className={styles.section}>
        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={"src/assets/bold.png"}
            text={"Жирный текст"}
            onClick={() => console.log("Жирный текст")}
          ></ButtonSmall>

          <ButtonSmall
            image={"src/assets/italic.png"}
            text={"Курсив"}
            onClick={() => console.log("Курсив")}
          ></ButtonSmall>
        </div>

        <div className={styles.buttonContainer}>
          <ButtonSmall
            image={"src/assets/underline.png"}
            text={"Подчеркивание"}
            onClick={() => console.log("Подчеркивание")}
          ></ButtonSmall>

          <ButtonSmall
            image={"src/assets/palette.png"}
            text={"Цвет текста"}
            onClick={() => console.log("Изменить цвет текста")}
          ></ButtonSmall>
        </div>       
      </div>
    </div>
  );
}

export { Toolbar };

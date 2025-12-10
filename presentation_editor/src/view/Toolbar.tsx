import styles from "./Toolbar.module.css";
import { ButtonLarge } from "../common/ButtonLarge";
import { ButtonSmall } from "../common/ButtonSmall";
import { InputField } from "../common/InputField";
import { Select } from "../common/Select";

import { dispatch } from "../editor";
import { addSlide, deleteSlides } from "../store/functions";
import { generateNewSlide } from "../store/functions";

function Toolbar() {

  const handleAddSlideClick = () => {
    dispatch(addSlide, {newSlide: generateNewSlide()})
  };

  const handleDeleteSlidesClick = () => {
    dispatch<void>(deleteSlides, undefined)
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.section}>
        <InputField
          text={"New Presentation"}
          id={"title"}
          width={300}
          onInput={(event) =>
            console.log(
              "Новое название презентации: ",
              event.currentTarget.value,
            )
          }
        ></InputField>

        <div className={styles.buttonColumn}>
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

      <div className={styles.section}>
        <div className={styles.buttonGrid}>
          <ButtonSmall
            image={"src/assets/text.png"}
            text={"Добавить текст"}
            onClick={() => console.log("Добавление текста")}
          ></ButtonSmall>

          <ButtonSmall
            image={"src/assets/image.png"}
            text={"Добавить изображение"}
            onClick={() => console.log("Добавление изображения")}
          ></ButtonSmall>

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
          width={100}
          onInput={(event) =>
            console.log("Размер шрифта изменен на: ", event.currentTarget.value)
          }
        ></InputField>
      </div>

      <div className={styles.section}>
        <div className={styles.buttonGrid}>
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

import styles from "./Toolbar.module.css";
import { ButtonLarge } from "../common/ButtonLarge";
import { ButtonSmall } from "../common/ButtonSmall";
import { InputField } from "../common/InputField";
import { Select } from "../common/Select";

function Toolbar() {
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
        />
        <div className={styles.buttonColumn}>
          <ButtonSmall
            image={"src/assets/save.png"}
            text={"Сохранить PDF"}
            onClick={() => console.log("Сохранение презентации в PDF")}
          />
          <ButtonSmall
            image={"src/assets/play.png"}
            text={"Проигрывать"}
            onClick={() => console.log("Просмотр презентации")}
          />
        </div>
      </div>
      <div className={styles.section}>
        <ButtonLarge
          image={"src/assets/add-slide.png"}
          text={"Добавить слайд"}
          onClick={() => console.log("Добавление слайда")}
        />
        <ButtonLarge
          image={"src/assets/delete.png"}
          text={"Удалить слайд"}
          onClick={() => console.log("Удаление слайда")}
        />
      </div>
      <div className={styles.section}>
        <div className={styles.buttonGrid}>
          <ButtonSmall
            image={"src/assets/text.png"}
            text={"Добавить текст"}
            onClick={() => console.log("Добавление текста")}
          />
          <ButtonSmall
            image={"src/assets/image.png"}
            text={"Добавить изображение"}
            onClick={() => console.log("Добавление изображения")}
          />
          <ButtonSmall
            image={"src/assets/delete.png"}
            text={"Удалить элемент"}
            onClick={() => console.log("Удаление элемента")}
          />
          <ButtonSmall
            image={"src/assets/fill.png"}
            text={"Цвет фона"}
            onClick={() => console.log("Изменение цвета фона")}
          />
        </div>
      </div>
      <div className={styles.section}>
        <Select />
        <InputField
          text={"Font Size"}
          id={"font-size"}
          width={100}
          onInput={(event) =>
            console.log("Размер шрифта изменен на: ", event.currentTarget.value)
          }
        />
      </div>
      <div className={styles.section}>
        <div className={styles.buttonGrid}>
          <ButtonSmall
            image={"src/assets/bold.png"}
            text={"Жирный текст"}
            onClick={() => console.log("Жирный текст")}
          />
          <ButtonSmall
            image={"src/assets/italic.png"}
            text={"Курсив"}
            onClick={() => console.log("Курсив")}
          />
          <ButtonSmall
            image={"src/assets/underline.png"}
            text={"Подчеркивание"}
            onClick={() => console.log("Подчеркивание")}
          />
          <ButtonSmall
            image={"src/assets/palette.png"}
            text={"Цвет текста"}
            onClick={() => console.log("Изменить цвет текста")}
          />
        </div>
      </div>
    </div>
  );
}

export { Toolbar };

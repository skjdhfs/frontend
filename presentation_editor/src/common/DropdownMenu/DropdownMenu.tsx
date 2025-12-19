import styles from "./DropdownMenu.module.css";
import { useState, useRef, useEffect } from "react";
import { ButtonSmall } from "../ButtonSmall/ButtonSmall";
import { InputFile } from "../InputFile/InputFile";
import { InputColor } from "../InputColor/InputColor";
import { dispatch } from "../../store/editor";
import {
  changeBackground,
  createNewBackgroundPicture,
} from "../../store/functions";

function DropdownMenu() {
  const handleAddBackgroundImg = (src: string) => {
    dispatch(changeBackground, {
      newBackground: createNewBackgroundPicture(src),
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <ButtonSmall
        image={"src/assets/fill.png"}
        text={"Изменить фон"}
        onClick={toggleMenu}
      ></ButtonSmall>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <InputFile
            image={"src/assets/image.png"}
            text={"Установить фоновое изображение"}
            onImageLoadSuccess={handleAddBackgroundImg}
          ></InputFile>
          <InputColor
            image={"src/assets/fill.png"}
            text={"Изменить цвет фона"}
          ></InputColor>
        </div>
      )}
    </div>
  );
}

export { DropdownMenu };

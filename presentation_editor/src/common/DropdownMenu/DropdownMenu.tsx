import styles from "./DropdownMenu.module.css"
import { useState } from "react"
import { ButtonSmall } from "../ButtonSmall/ButtonSmall";
import { InputFile } from "../InputFile/InputFile";
import { InputColor } from "../InputColor/InputColor";
import { dispatch } from "../../store/editor";
import { changeBackground, createNewBackgroundPicture } from "../../store/functions";

function DropdownMenu() {
    const handleAddBackgroundImg = (src: string) => {
      dispatch(changeBackground, {newBackground: createNewBackgroundPicture(src)})
    }

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return(
        <div className={styles.menuContainer}>
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
    )
}

export {DropdownMenu}
import styles from "./DropdownMenu.module.css"
import { useState, useRef } from "react"
import { ButtonSmall } from "../ButtonSmall/ButtonSmall";

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const colorInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
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
                    <ButtonSmall
                        image={"src/assets/image.png"}
                        text={"Установить фоновое изображение"}
                        onClick={toggleMenu}
                    ></ButtonSmall>
                    <ButtonSmall
                        image={"src/assets/fill.png"}
                        text={"Изменить цвет фона"}
                        onClick={toggleMenu}
                    ></ButtonSmall>
                </div>   
            )}
        </div>
    )
}

export {DropdownMenu}
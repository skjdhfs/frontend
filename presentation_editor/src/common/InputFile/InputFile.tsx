import styles from "./InputFile.module.css"

import { ButtonSmall } from "../ButtonSmall/ButtonSmall"
import { addSlideObj, createNewImageObject } from "../../store/functions";
import { dispatch } from "../../store/editor";
import type { Size } from "../../store/types";

import { useRef } from "react";

function InputFile() {

    const readImageFile = (file: File) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileSrc: string = event.target?.result as string;

            const image = new Image();
            image.src = fileSrc;
            image.onload = () => {
                const imageSize: Size = {
                    height: image.naturalWidth,
                    width: image.naturalWidth,
                }

                dispatch(addSlideObj, {newSlideObj: createNewImageObject(fileSrc, imageSize)});
            }
        }
        reader.readAsDataURL(file);
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0]

            if (file.type.startsWith("image/")) {
                readImageFile(file)
            } else {
                alert("Выберите файл изображения")
            }
        }
    }

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    }

    return(
        <div>
            <input
                type="file"
                ref={fileInputRef}
                className={styles.input}
                accept="image/*"
                onChange={handleFileUpload}
            />
            <ButtonSmall
                image={"src/assets/image.png"}
                text={"Добавить изображение"}
                onClick={handleClick}>
            </ButtonSmall>
        </div>
    )
}
export {InputFile}
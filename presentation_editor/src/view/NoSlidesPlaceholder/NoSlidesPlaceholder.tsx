import styles from "./NoSlidesPlaceholder.module.css";

import { dispatch } from "../../store/editor";
import { createNewSlide } from "../../store/functions";
import { addSlide } from "../../store/functions";

function NoSlidesPlaceholder() {

  const handleAddSlideClick = () => {
    dispatch(addSlide, {newSlide: createNewSlide()})
  }

  return(
    <div className={styles.noSlidesPlaceholder} onClick={handleAddSlideClick}>
      <p>Добавить слайд</p>
    </div>
  )
}

export {NoSlidesPlaceholder}
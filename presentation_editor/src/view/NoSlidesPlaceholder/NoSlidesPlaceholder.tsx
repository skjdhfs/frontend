import styles from "./NoSlidesPlaceholder.module.css";

import { dispatch } from "../../store/editor";
import { generateNewSlide } from "../../store/functions";
import { addSlide } from "../../store/functions";

function NoSlidesPlaceholder() {

  const handleAddSlideClick = () => {
    dispatch(addSlide, {newSlide: generateNewSlide()})
  }

  return(
    <div className={styles.noSlidesPlaceholder} onClick={handleAddSlideClick}>
      <p>Добавить слайд</p>
    </div>
  )
}

export {NoSlidesPlaceholder}
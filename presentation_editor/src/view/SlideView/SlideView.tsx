import styles from "./SlideView.module.css";

import type { Slide } from "../../store/types";

import { ImageObject } from "../ImageObject/ImageObject";
import { TextObject } from "../TextObject/TextObject";

import { dispatch } from "../../store/editor";
import { changeTextContent, selectObject } from "../../store/functions";

type SlideViewProps = {
  slide: Slide;
  selectedObjId: string | null;
};

function SlideView(props: SlideViewProps) {
  
  return (
    <div className={styles.slide}>
      {props.slide.slideObj.map((object) => {

        const handleSlideObjClick = () => {
          dispatch(selectObject, {selectedObjId: object.id})
        }

        const isSelected = object.id === props.selectedObjId;
        if (object.type == "text") {

        const handleTextContentChange = (content: string) => {
          dispatch(changeTextContent, {newContent: content})
        }

          return (
            <TextObject
              key={object.id}
              textObj={object}
              scale={1}
              onClick={handleSlideObjClick}
              onContentChange={handleTextContentChange}
              isSelected={isSelected}
            ></TextObject>
          );
        }
        return (
          <ImageObject
            key={object.id}
            imageObj={object}
            onClick={() => console.log(object.id)}
            scale={1}
          ></ImageObject>
        );
      })}
    </div>
  );
}

export { SlideView };

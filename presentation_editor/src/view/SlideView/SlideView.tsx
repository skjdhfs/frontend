import styles from "./SlideView.module.css";

import type { Slide } from "../../store/types";

import { ImageObject } from "../ImageObject/ImageObject";
import { TextObject } from "../TextObject/TextObject";

import { dispatch } from "../../store/editor";
import {
  changeTextContent,
  selectObject,
  unselectObject,
} from "../../store/functions";

type SlideViewProps = {
  slide: Slide;
  selectedObjId: string | null;
};

function SlideView(props: SlideViewProps) {
  const background = props.slide.background;

  let style;

  if (background.type === "color") {
    style = {
      backgroundColor: `${background.color}`,
    };
  } else {
    style = {
      backgroundImage: `url(${background.src})`,
      backgroundSize: "cover",
    };
  }

  const handleUnselectObject = () => {
    dispatch<void>(unselectObject, undefined);
  };

  return (
    <div className={styles.slide} onClick={handleUnselectObject} style={style}>
      {props.slide.slideObj.map((object) => {
        const handleSlideObjClick = (
          event: React.MouseEvent<HTMLDivElement>,
        ) => {
          event.stopPropagation();
          dispatch(selectObject, { selectedObjId: object.id });
        };

        const isSelected = object.id === props.selectedObjId;

        if (object.type == "text") {
          const handleTextContentChange = (content: string) => {
            dispatch(changeTextContent, { newContent: content });
          };

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
            onClick={handleSlideObjClick}
            scale={1}
            isSelected={isSelected}
          ></ImageObject>
        );
      })}
    </div>
  );
}

export { SlideView };

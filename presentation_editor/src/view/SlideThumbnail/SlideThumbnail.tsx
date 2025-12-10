import styles from "./SlideThumbnail.module.css";

import type { Slide } from "../../store/types";

import { ImageObject } from "../ImageObject/ImageObject";
import { TextObject } from "../TextObject/TextObject";

type SlideViewProps = {
  slide: Slide;
  onClick: () => void;
};

function SlideThumbnail(props: SlideViewProps) {
  return (
    <div className={styles.thumbnail} onClick={props.onClick}>
      {props.slide.slideObj.map((object) => {
        if (object.type == "text") {
          return (
            <TextObject
              key={object.id}
              textObj={object}
              scale={0.3}
            ></TextObject>
          );
        }
        return (
          <ImageObject
            key={object.id}
            imageObj={object}
            scale={0.3}
          ></ImageObject>
        );
      })}
    </div>
  );
}

export { SlideThumbnail };

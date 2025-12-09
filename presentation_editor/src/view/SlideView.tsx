import styles from "./SlideView.module.css";

import type { Slide } from "../store/types";

import { ImageObject } from "./ImageObject";
import { TextObject } from "./TextObject";

type SlideViewProps = {
  slide: Slide;
};

function SlideView(props: SlideViewProps) {
  return (
    <div className={styles.slide}>
      {props.slide.slideObj.map((object) => {
        if (object.type == "text") {
          return (
            <TextObject
              key={object.id}
              textObj={object}
              onClick={() => console.log(object.id)}
            ></TextObject>
          );
        }
        return (
          <ImageObject
            key={object.id}
            imageObj={object}
            onClick={() => console.log(object.id)}
          ></ImageObject>
        );
      })}
    </div>
  );
}

export { SlideView };

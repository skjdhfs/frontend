import styles from "./SlideThumbnail.module.css";

import type { Slide } from "../store/types";

import { ImageObjectThumbnail } from "./ImageObjectThumbnail";
import { TextObjectThumbnail } from "./TextObjectThumbnail";

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
            <TextObjectThumbnail
              key={object.id}
              textObj={object}
            ></TextObjectThumbnail>
          );
        }
        return (
          <ImageObjectThumbnail
            key={object.id}
            imageObj={object}
          ></ImageObjectThumbnail>
        );
      })}
    </div>
  );
}

export { SlideThumbnail };

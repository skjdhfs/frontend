import styles from "./SlideThumbnail.module.css";

import type { Slide } from "../../store/types";

import { ImageObject } from "../ImageObject/ImageObject";
import { TextObject } from "../TextObject/TextObject";

type SlideViewProps = {
  slide: Slide;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function SlideThumbnail(props: SlideViewProps) {
  const background = props.slide.background;
  let style;

  if (background.type === "color" ) {
    style = {
      backgroundColor: `${background.color}`
    }
  } else {
    style = {
      backgroundImage: `url(${background.src})`,
      backgroundSize: "cover",
    }
  }
  const thumbnailClasses = `${styles.thumbnail} ${props.isSelected ? styles.selected : ''}`

  return (
    <div className={thumbnailClasses} onClick={props.onClick} style={style}>
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

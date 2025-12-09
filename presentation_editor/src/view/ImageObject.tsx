import type { ImageObj } from "../store/types";
import styles from "./ImageObject.module.css";

type ImageObjProps = {
  imageObj: ImageObj;
  onClick?: () => void;
  // scale?: number;
};

function ImageObject(props: ImageObjProps) {
  // const {
  //     scale = 1,
  // } = props
  const imageObj = props.imageObj;
  const style = {
    top: `${imageObj.position.y}px`,
    left: `${imageObj.position.x}px`,
    height: `${imageObj.size.height}px`,
    width: `${imageObj.size.width}px`,
  };
  return (
    <img
      className={styles.image}
      src={imageObj.src}
      style={style}
      onClick={props.onClick}
    />
  );
}

export { ImageObject };

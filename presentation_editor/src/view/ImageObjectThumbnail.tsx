import type { ImageObj } from "../store/types";
import styles from "./ImageObject.module.css";

type ImageObjProps = {
  imageObj: ImageObj;
};

function ImageObjectThumbnail(props: ImageObjProps) {
  const imageObj = props.imageObj;
  const scale = 0.3;
  const style = {
    top: `${imageObj.position.y * scale}px`,
    left: `${imageObj.position.x * scale}px`,
    height: `${imageObj.size.height * scale}px`,
    width: `${imageObj.size.width * scale}px`,
  };
  return <img className={styles.image} src={imageObj.src} style={style} />;
  // return <ImageObject imageObj={imgObj} scale={0.3}/>
}

export { ImageObjectThumbnail };

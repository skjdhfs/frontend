import type { TextObj } from "../store/types";
import styles from "./TextObject.module.css";

type TextObjProps = {
  textObj: TextObj;
};

function TextObjectThumbnail(props: TextObjProps) {
  const textObj = props.textObj;
  const scale = 0.3;
  const style = {
    top: `${textObj.position.y * scale}px`,
    left: `${textObj.position.x * scale}px`,
    fontFamily: `${textObj.fontFamily}`,
    fontSize: `${textObj.fontSize * scale}px`,
    color: `${textObj.fontColor}`,
    height: `${textObj.size.height * scale}px`,
    width: `${textObj.size.width * scale}px`,
  };
  return (
    <div className={styles.text} style={style}>
      {textObj.content}
    </div>
  );
}

export { TextObjectThumbnail };

import type { TextObj } from "../store/types";
import styles from "./TextObject.module.css";

type TextObjProps = {
  textObj: TextObj;
  onClick: () => void;
};

function TextObject(props: TextObjProps) {
  const textObj = props.textObj;
  const style = {
    top: `${textObj.position.y}px`,
    left: `${textObj.position.x}px`,
    fontFamily: `${textObj.fontFamily}`,
    fontSize: `${textObj.fontSize}px`,
    color: `${textObj.fontColor}`,
    height: `${textObj.size.height}px`,
    width: `${textObj.size.width}px`,
  };
  return (
    <div className={styles.text} style={style} onClick={props.onClick}>
      {textObj.content}
    </div>
  );
}

export { TextObject };

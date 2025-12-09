import type { TextObj } from "../store/types";
import styles from "./TextObject.module.css";

type TextObjProps = {
  textObj: TextObj;
  onClick?: () => void;
  scale: number
};

function TextObject(props: TextObjProps) {
  const textObj = props.textObj;
  const style = {
    top: `${textObj.position.y * props.scale}px`,
    left: `${textObj.position.x * props.scale}px`,
    fontFamily: `${textObj.fontFamily}`,
    fontSize: `${textObj.fontSize * props.scale}px`,
    color: `${textObj.fontColor}`,
    height: `${textObj.size.height * props.scale}px`,
    width: `${textObj.size.width * props.scale}px`,
  };
  return (
    <div className={styles.text} style={style} onClick={props.onClick}>
      {textObj.content}
    </div>
  );
}

export { TextObject };

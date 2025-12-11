import type { TextObj } from "../../store/types";
import styles from "./TextObject.module.css";
import { useState, useRef, useEffect } from "react";

type TextObjProps = {
  textObj: TextObj;
  scale: number
  isSelected?: boolean;
  onClick?: () => void;
  onContentChange?: (newContent: string) => void;
};

function TextObject(props: TextObjProps) {
  const slideObjClasses = `${styles.text} ${props.isSelected ? styles.selected : ''}`
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

  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = () => {
    setIsEditing(true); 
  };

  const handleExit = () => {
    setIsEditing(false)
    if (textRef.current && props.onContentChange) {
      props.onContentChange(textRef.current.innerText);
    }
  }

  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div 
      className={slideObjClasses} 
      style={style} 
      onClick={props.onClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleExit}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      ref={textRef}
    >
      {textObj.content}
    </div>
  );
}

export { TextObject };

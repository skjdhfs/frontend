import type { TextObj } from '../../store/types';

import styles from './TextObject.module.css';

import { useRef } from 'react';

type TextObjProps = {
  textObj: TextObj;
  scale: number;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onContentChange?: (newContent: string) => void;
};

function TextObject(props: TextObjProps) {
  const slideObjClasses = `${styles.text} ${props.isSelected ? styles.selected : ''}`;

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

  const textRef = useRef<HTMLDivElement>(null);

  const handleExit = () => {
    if (textRef.current && props.onContentChange) {
      props.onContentChange(textRef.current.innerText);
    }
  };

  return (
    <div
      className={slideObjClasses}
      style={style}
      onClick={props.onClick}
      onBlur={handleExit}
      contentEditable={props.isSelected}
      suppressContentEditableWarning={true}
      ref={textRef}
    >
      {textObj.content}
    </div>
  );
}

export { TextObject };

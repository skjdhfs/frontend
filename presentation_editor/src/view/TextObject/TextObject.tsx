import { useRef } from 'react';
import type { TextObj } from '../../store/types';
import styles from './TextObject.module.css';
import { SelectionFrame } from '../SelectionFrame/SelectionFrame';

type TextObjProps = {
  textObj: TextObj;
  scale: number;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onContentChange?: (newContent: string) => void;
  onMouseDown?: (event: React.MouseEvent<Element, MouseEvent>) => void
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

  const textRef = useRef<HTMLDivElement>(null);

  const handleExit = () => {
    if (textRef.current && props.onContentChange) {
      props.onContentChange(textRef.current.innerText);
    }
  };

  return (
    <div
      className={styles.text}
      style={style}
      onClick={props.onClick}
      onBlur={handleExit}
      contentEditable={props.isSelected ? 'plaintext-only' : false}
      suppressContentEditableWarning={true}
      ref={textRef}
    >
      <div>
        {textObj.content}
      </div>
      
      {props.isSelected && (
        <SelectionFrame
          object={props.textObj}>
        </SelectionFrame>
      )}
    </div>
  );
}

export { TextObject };

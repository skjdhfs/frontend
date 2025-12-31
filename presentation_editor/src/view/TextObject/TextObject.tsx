import { useRef } from 'react';
import styles from './TextObject.module.css';
import { SelectionFrame } from '../SelectionFrame/SelectionFrame';
import { useAppSelector, useAppDispatch } from '../../store/hooks/reduxHooks';
import type { TextObj } from '../../store/types';
import { changeTextContent, selectObject } from '../../store/editorSlice';

type TextObjProps = {
  textObjId: string;
  slideId: string;
  scale: number;
};

function TextObject(props: TextObjProps) {
  const { textObjId, slideId, scale } = props;
  const dispatch = useAppDispatch(); 
  const textRef = useRef<HTMLDivElement>(null);

  const textObj = useAppSelector((state) => {
    const slide = state.editor.present.presentation.slides.find(s => s.id === slideId);
    const obj = slide?.slideObj.find(o => o.id === textObjId) as TextObj | undefined;
    return obj
  })
  const isSelected = useAppSelector((state) => state.editor.present.selected.selectedObjId === textObjId)

  if (!textObj) return null;

  const style = {
    top: `${textObj.position.y * scale}px`,
    left: `${textObj.position.x * scale}px`,
    fontFamily: `${textObj.fontFamily}`,
    fontSize: `${textObj.fontSize * scale}px`,
    color: `${textObj.fontColor}`,
    height: `${textObj.size.height * scale}px`,
    width: `${textObj.size.width * scale}px`,
  };

  const handleExit = () => {
    if (textRef.current) {
      const newContent = textRef.current.innerText;
      dispatch(changeTextContent({newContent}))
    }
  };

  const handleObjClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(selectObject({selectedObjId: textObj.id}))
  }

  return (
    <div
      className={styles.text}
      style={style}
      onClick={handleObjClick}
      onBlur={handleExit}
      contentEditable={isSelected ? 'plaintext-only' : false}
      suppressContentEditableWarning={true}
      ref={textRef}
    >
      <div>{textObj.content}</div>
      {isSelected && <SelectionFrame object={textObj}></SelectionFrame>}
    </div>
  );
}

export { TextObject };

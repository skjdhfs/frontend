import type { ImageObj } from '../../store/types';
import styles from './ImageObject.module.css';
import { SelectionFrame } from '../SelectionFrame/SelectionFrame';
import { useDnd } from '../../store/hooks/useDnd';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { changeObjectPosition, selectObject, commitToHistory } from '../../store/editorSlice';

type ImageObjProps = {
  imageObjId: string;
  slideId: string;
  scale: number;
};

function ImageObject(props: ImageObjProps) {
  const { imageObjId, slideId, scale } = props;
  
  const dispatch = useAppDispatch()

  const imageObj = useAppSelector((state) => {
    const slide = state.editor.present.presentation.slides.find(s => s.id === slideId);
    const obj = slide?.slideObj.find(o => o.id === imageObjId) as ImageObj | undefined;
    return obj
  })

  const isSelected = useAppSelector((state) => state.editor.present.selected.selectedObjId === imageObjId)

  const { onMouseDown } = useDnd({
    startX: imageObj?.position.x ?? 0,
    startY: imageObj?.position.y ?? 0,
    onDragStart: () => dispatch(commitToHistory()),
    onDrag: (newX, newY) => dispatch(changeObjectPosition({ newPosition: { x: newX, y: newY } })),
  });

  if (!imageObj) return null

  const styleContainer = {
    top: `${imageObj.position.y * scale}px`,
    left: `${imageObj.position.x * scale}px`,
    height: `${imageObj.size.height * scale}px`,
    width: `${imageObj.size.width * scale}px`,
    cursor: isSelected ? 'move' : 'default',
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    onMouseDown(event);
  };

  const handleObjClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(selectObject({selectedObjId: imageObj.id}))
  }

  return (
    <div style={styleContainer} className={styles.imageContainer}>
      {isSelected && <SelectionFrame object={imageObj}></SelectionFrame>}
      <img
        src={imageObj.src}
        className={styles.image}
        onClick={handleObjClick}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export { ImageObject };

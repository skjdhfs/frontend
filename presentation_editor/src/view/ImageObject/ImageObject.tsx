import type { ImageObj } from '../../store/types';
import styles from './ImageObject.module.css';
import { SelectionFrame } from '../SelectionFrame/SelectionFrame';
import { useDnd } from '../../store/hooks/useDnd';
import { dispatch } from '../../store/editor';
import { moveSlideObj } from '../../store/functions';

type ImageObjProps = {
  imageObj: ImageObj;
  scale: number;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (event: React.MouseEvent<Element, MouseEvent>) => void
};

function ImageObject(props: ImageObjProps) {

  const imageObj = props.imageObj;

  const styleContainer = {
    top: `${imageObj.position.y * props.scale}px`,
    left: `${imageObj.position.x * props.scale}px`,
    height: `${imageObj.size.height * props.scale}px`,
    width: `${imageObj.size.width * props.scale}px`,
    cursor: props.isSelected ? 'move' : 'default',
  };

  const {onMouseDown} = useDnd({
    startX: imageObj.position.x,
    startY: imageObj.position.y,
    onDrag: (newX, newY) => dispatch(moveSlideObj, {newPosition: {x: newX, y: newY}})
  })

  const handleMouseDown = (event: React.MouseEvent) => {
    onMouseDown(event)
  }

  return (
    <div
      style={styleContainer} 
      className={styles.imageContainer} 
    >
      {props.isSelected && (
        <SelectionFrame
          object={imageObj}>
        </SelectionFrame>
      )}
      <img 
        src={imageObj.src} 
        className={styles.image}
        onClick={props.onClick} 
        onMouseDown={handleMouseDown}
      />
      
    </div>
    
  );
}

export { ImageObject };

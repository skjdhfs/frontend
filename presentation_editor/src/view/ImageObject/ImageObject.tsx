import type { ImageObj } from '../../store/types';
import styles from './ImageObject.module.css';
import { SelectionFrame } from '../SelectionFrame/SelectionFrame';

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
  };

  return (
    <div
      style={styleContainer} 
      className={styles.imageContainer} 
    >
      <img 
        src={imageObj.src} 
        className={styles.image}
        onClick={props.onClick} 
      />
      {props.isSelected && (
        <SelectionFrame
          object={imageObj}>
        </SelectionFrame>
      )}
    </div>
    
  );
}

export { ImageObject };

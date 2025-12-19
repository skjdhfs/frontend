import type { ImageObj } from '../../store/types';
import styles from './ImageObject.module.css';

type ImageObjProps = {
  imageObj: ImageObj;
  scale: number;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function ImageObject(props: ImageObjProps) {
  const slideObjClasses = `${styles.image} ${props.isSelected ? styles.selected : ''}`;

  const imageObj = props.imageObj;
  const style = {
    top: `${imageObj.position.y * props.scale}px`,
    left: `${imageObj.position.x * props.scale}px`,
    height: `${imageObj.size.height * props.scale}px`,
    width: `${imageObj.size.width * props.scale}px`,
  };
  return (
    <img className={slideObjClasses} src={imageObj.src} style={style} onClick={props.onClick} />
  );
}

export { ImageObject };

import styles from './SlideThumbnail.module.css';
import type { Slide } from '../../store/types';
import { ImageObject } from '../ImageObject/ImageObject';
import { TextObject } from '../TextObject/TextObject';
import { useState } from 'react';
import { useDnd } from '../../store/hooks/useDnd';
import { dispatch } from '../../store/editor';
import { moveSlides, selectMultipleSlides, selectOneSlide } from '../../store/functions';

type SlideViewProps = {
  slide: Slide;
  index: number;
  length: number;
  selectedSlidesIds: string[];
};

function SlideThumbnail(props: SlideViewProps) {
  const background = props.slide.background;
  let style;

  if (background.type === 'color') {
    style = {
      backgroundColor: `${background.color}`,
    };
  } else {
    style = {
      backgroundImage: `url(${background.src})`,
      backgroundSize: 'cover',
    };
  }
  const isSelected = props.selectedSlidesIds.includes(props.slide.id)
  const thumbnailClasses = `${styles.thumbnail} ${isSelected ? styles.selected : ''}`;

  const slideHeight = 170

  const [offsetY, setOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const {onMouseDown} = useDnd({
    startX: 0,
    startY: 0,
    onDrag: (_, y) => {
      setIsDragging(true)
      setOffsetY(y)
    },
    onFinish: (_, y) => {
      setIsDragging(false)
      setOffsetY(0)
      const shift = Math.round(y / slideHeight)
      const targetIndex = Math.max(0, Math.min(props.length - 1, props.index + shift))
      if (props.index !== targetIndex) {
        dispatch(moveSlides, {targetIndex})
      }
    }
  })

  const slideWrapperStyle = {
    transform: `translateY(${offsetY}px)`,
    zIndex: isDragging ? 100 : 1,
    position: 'relative' as const,
    opacity: isDragging ? 0.8 : 1,
    transition: isDragging ? 'none' : 'transform 0.2s',
  }

  const handleSlideThumbnailClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const isModifierPressed = event.ctrlKey || event.metaKey

    if (isModifierPressed) {
      dispatch(selectMultipleSlides, {selectedSlideId: props.slide.id})
    } else {
      dispatch(selectOneSlide, {selectedSlideId: props.slide.id})
    }
  }

  return (
    <div
      className={styles.slideWrapper}
      onMouseDown={(e) => {onMouseDown(e)}}
      style={slideWrapperStyle}
    >
      <div>{props.index + 1}</div>

      <div 
        className={thumbnailClasses} 
        onClick={handleSlideThumbnailClick} 
        style={style}
      >
        {props.slide.slideObj.map((object) => {
          if (object.type == 'text') {
            return <TextObject key={object.id} textObj={object} scale={0.3}></TextObject>;
          }
          return <ImageObject key={object.id} imageObj={object} scale={0.3}></ImageObject>;
        })}
      </div>
    </div>
    
  );
}

export { SlideThumbnail };

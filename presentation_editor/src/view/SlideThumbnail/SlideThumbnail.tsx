import styles from './SlideThumbnail.module.css';
import type { Slide } from '../../store/types';
import { ImageObject } from '../ImageObject/ImageObject';
import { TextObject } from '../TextObject/TextObject';
import { dispatch } from '../../store/editor';
import { moveSlides, selectMultipleSlides, selectOneSlide } from '../../store/functions';
import { useSlideDnd } from '../../store/hooks/useSlideDnd';

type SlideThumbnailProps = {
  slide: Slide;
  index: number;
  length: number;
  selectedSlidesIds: string[];
  setDropIndex: (i: number | null) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  dragOffset: number;
  onDragStart: (id: string) => void;
  onDrag: (offset: number) => void;
  onDragEnd: () => void
};

function SlideThumbnail(props: SlideThumbnailProps) {
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
  const isSelected = props.selectedSlidesIds.includes(props.slide.id);
  const thumbnailClasses = `${styles.thumbnail} ${isSelected ? styles.selected : ''}`;

  const slideHeight = 190;

  const { onMouseDown } = useSlideDnd({
    index: props.index,
    slideHeight: slideHeight,
    scrollContainerRef: props.scrollContainerRef,
    onDragStart: () => {
      props.onDragStart(props.slide.id)
    },
    onDrag: (y) => {
      props.onDrag(y)
      const shift = Math.round(y / slideHeight)
      let targetIndex = props.index + shift
      if (y > 0) targetIndex += 1
      const finalTargetIndex = Math.max(0, Math.min(props.length, targetIndex))
      props.setDropIndex(finalTargetIndex)
    },
    onFinish: (y) => {
      const shift = Math.round(y / slideHeight)
      let targetIndex = props.index + shift
      if (y > 0) targetIndex += 1
      const finalTargetIndex = Math.max(0, Math.min(props.length, targetIndex))
      props.onDragEnd()
      props.setDropIndex(null)
      dispatch(moveSlides, { targetIndex: finalTargetIndex });
    },
  });

  const slideWrapperStyle = {
    transform: `translateY(${props.dragOffset}px)`,
    zIndex: props.isDragging ? 1000 : 1,
    position: 'relative' as const,
    opacity: props.isDragging ? 0.8 : 1,
  };

  const handleSlideThumbnailClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const isModifierPressed = event.ctrlKey || event.metaKey;

    if (isModifierPressed) {
      dispatch(selectMultipleSlides, { selectedSlideId: props.slide.id });
    } else {
      dispatch(selectOneSlide, { selectedSlideId: props.slide.id });
    }
  };

  return (
    <div 
      className={styles.slideWrapper}
      onMouseDown={(e) => {
        const isSelected = props.selectedSlidesIds.includes(props.slide.id)
        if (isSelected) {onMouseDown(e)}
      }}
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

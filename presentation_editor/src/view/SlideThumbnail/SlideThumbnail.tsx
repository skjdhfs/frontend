import styles from './SlideThumbnail.module.css';
import { ImageObject } from '../ImageObject/ImageObject';
import { TextObject } from '../TextObject/TextObject';
import { selectOneSlide, selectMultipleSlides, moveSlides } from '../../store/editorSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { useSlideDnd } from '../../store/hooks/useSlideDnd';
import { useState } from 'react';

type SlideThumbnailProps = {
  slideId: string;
  index: number;
  setDropIndex: (i: number | null) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

function SlideThumbnail(props: SlideThumbnailProps) {
  const {
    slideId,
    index,
    setDropIndex,
    scrollContainerRef,
  } = props

  const [dragOffset, setDragOffset] = useState(0);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const dispatch = useAppDispatch()

  const slides = useAppSelector((state) => state.editor.presentation.slides)
  const selectedSlidesIds = useAppSelector((state) => state.editor.selected.selectedSlidesIds)
  
  const slide = slides.find(s => s.id === slideId)
  const length = slides.length
  const isSelected = selectedSlidesIds.includes(slideId)

  const isDragging = activeDragId !== null && isSelected

  const onDragStart = (id: string) => {
    setActiveDragId(id)
  }

  const onDrag = (offset: number) => {
    setDragOffset(offset)
  }

  const onDragEnd = () => {
    setActiveDragId(null);
    setDragOffset(0);
  }

  const slideHeight = 190;
  const { onMouseDown } = useSlideDnd({
    index: index,
    slideHeight: slideHeight,
    scrollContainerRef: scrollContainerRef,
    onDragStart: () => {
      onDragStart(slideId)
    },
    onDrag: (y) => {
      onDrag(y)
      const shift = Math.round(y / slideHeight)
      let targetIndex = index + shift
      if (y > 0) targetIndex += 1
      const finalTargetIndex = Math.max(0, Math.min(length, targetIndex))
      setDropIndex(finalTargetIndex)
    },
    onFinish: (y) => {
      const shift = Math.round(y / slideHeight)
      let targetIndex = index + shift
      if (y > 0) targetIndex += 1
      const finalTargetIndex = Math.max(0, Math.min(length, targetIndex))
      onDragEnd()
      setDropIndex(null)
      dispatch(moveSlides({ targetIndex: finalTargetIndex }));
    },
  });

  if (!slide) return null

  const background = slide.background;
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

  const thumbnailClasses = `${styles.thumbnail} ${isSelected ? styles.selected : ''}`;

  const slideWrapperStyle = {
    transform: `translateY(${dragOffset}px)`,
    zIndex: isDragging ? 1000 : 1,
    position: 'relative' as const,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleSlideThumbnailClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const isModifierPressed = event.ctrlKey || event.metaKey;

    if (isModifierPressed) {
      dispatch(selectMultipleSlides({ selectedSlideId: slide.id }));
    } else {
      dispatch(selectOneSlide({ selectedSlideId: slide.id }));
    }
  };

  return (
    <div 
      className={styles.slideWrapper}
      onMouseDown={(e) => {
        if (isSelected) {onMouseDown(e)}
      }}
      style={slideWrapperStyle}
    >
      <div>{index + 1}</div>
      <div 
        className={thumbnailClasses} 
        onClick={handleSlideThumbnailClick} 
        style={style}
      >
        {slide.slideObj.map((object) => {
          if (object.type == 'text') {
            return ( 
            <TextObject 
              key={object.id} 
              textObjId={object.id} 
              slideId={slide.id} 
              scale={0.3}
            ></TextObject>
          )
          }
          return (
          <ImageObject 
            key={object.id} 
            imageObjId={object.id} 
            slideId={slide.id} 
            scale={0.3}
          ></ImageObject>
          )
        })}
      </div>
    </div>
  );
}

export { SlideThumbnail };

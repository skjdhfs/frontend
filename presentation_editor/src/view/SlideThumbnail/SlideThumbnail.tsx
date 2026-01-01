import styles from './SlideThumbnail.module.css';
import { moveSlides, selectMultipleSlides, selectOneSlide } from '../../store/editorSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { useSlideDnd } from '../../store/hooks/useSlideDnd';
import { useState, useEffect, useRef } from 'react';
import { SlideView } from '../SlideView/SlideView';

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
  const thumbnailRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const slides = useAppSelector((state) => state.editor.present.presentation.slides)
  const selectedSlidesIds = useAppSelector((state) => state.editor.present.selected.selectedSlidesIds)
  
  const slide = slides.find(s => s.id === slideId)
  const length = slides.length
  const isSelected = selectedSlidesIds.includes(slideId)

  useEffect(() => {
    if (isSelected && thumbnailRef.current) {
      thumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [isSelected])

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

  const handleSlideThumbnailClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const isModifierPressed = event.ctrlKey || event.metaKey;

    if (isModifierPressed) {
      dispatch(selectMultipleSlides({ selectedSlideId: slide.id }));
    } else {
      dispatch(selectOneSlide({ selectedSlideId: slide.id }));
    }
  };

  const slideWrapperStyle = {
    transform: `translateY(${dragOffset}px)`,
    zIndex: isDragging ? 1000 : 1,
    position: 'relative' as const,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div 
      className={styles.slideWrapper}
      ref={thumbnailRef}
      onMouseDown={(e) => {
        if (isSelected) {onMouseDown(e)}
      }}
      style={slideWrapperStyle}
      onClick={handleSlideThumbnailClick}
    >
      <div>{index + 1}</div>
      <SlideView slideId={slideId} isThumbnail={true}></SlideView>
    </div>
  );
}

export { SlideThumbnail };

import styles from './Sidebar.module.css';
import type { SlideList } from '../../store/types';
import { SlideThumbnail } from '../SlideThumbnail/SlideThumbnail';

import { dispatch } from '../../store/editor';
import { selectMultipleSlides, selectOneSlide } from '../../store/functions';

type SidebarProps = {
  slides: SlideList;
  selectedSlidesIds: string[];
};

function Sidebar(props: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      {props.slides.map((slide, index) => {
        const isSelected = props.selectedSlidesIds.includes(slide.id);

        const handleSlideThumbnailClick = (event: React.MouseEvent<HTMLDivElement>) => {
          const isModifierPressed = event.ctrlKey || event.metaKey;

          if (isModifierPressed) {
            dispatch(selectMultipleSlides, { selectedSlideId: slide.id });
          } else {
            dispatch(selectOneSlide, { selectedSlideId: slide.id });
          }
        };

        return (
          <div key={slide.id}>
            <div>{index + 1}</div>
            <SlideThumbnail
              slide={slide}
              isSelected={isSelected}
              onClick={handleSlideThumbnailClick}
            ></SlideThumbnail>
          </div>
        );
      })}
    </div>
  );
}

export { Sidebar };

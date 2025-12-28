import styles from './Sidebar.module.css';
import type { SlideList } from '../../store/types';
import { SlideThumbnail } from '../SlideThumbnail/SlideThumbnail';
import { useState } from 'react';

type SidebarProps = {
  slides: SlideList;
  selectedSlidesIds: string[];
};

function Sidebar(props: SidebarProps) {
  const [dropIndex, setDropIndex] = useState<number | null>(null)
  
  return (
    <div className={styles.sidebar}>
      {props.slides.map((slide, index) => {
        return (
          <div key={slide.id} className={styles.previewContainer}>
            {dropIndex == index && <div className={styles.dropIndicator}></div>}
            <SlideThumbnail
              slide={slide}
              index={index}
              length={props.slides.length}
              selectedSlidesIds={props.selectedSlidesIds}
              setDropIndex={setDropIndex}
            ></SlideThumbnail>
            {dropIndex == props.slides.length && index == props.slides.length - 1 && (
              <div className={`${styles.dropIndicator} ${styles.bottom}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { Sidebar };

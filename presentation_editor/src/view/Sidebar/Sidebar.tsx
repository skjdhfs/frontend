import styles from './Sidebar.module.css';
import type { SlideList } from '../../store/types';
import { SlideThumbnail } from '../SlideThumbnail/SlideThumbnail';
import { useState, useRef } from 'react';

type SidebarProps = {
  slides: SlideList;
  selectedSlidesIds: string[];
};

function Sidebar(props: SidebarProps) {
  const [dropIndex, setDropIndex] = useState<number | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={sidebarRef} className={styles.sidebar}>
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
              scrollContainerRef={sidebarRef}
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

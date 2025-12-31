import styles from './Sidebar.module.css';
import { SlideThumbnail } from '../SlideThumbnail/SlideThumbnail';
import { useState, useRef } from 'react';
import { useAppSelector } from '../../store/hooks/reduxHooks';

function Sidebar() {
  const [dropIndex, setDropIndex] = useState<number | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null);

  const slides = useAppSelector((state) => state.editor.present.presentation.slides)
  
  return (
    <div ref={sidebarRef} className={styles.sidebar}>
      {slides.map((slide, index) => {

        return (
          <div key={slide.id} className={styles.previewContainer}>

            {dropIndex == index && <div className={styles.dropIndicator}></div>}

            <SlideThumbnail
              slideId={slide.id}
              index={index}
              setDropIndex={setDropIndex}
              scrollContainerRef={sidebarRef}
            ></SlideThumbnail>

            {dropIndex == slides.length && index == slides.length - 1 && (
              <div className={`${styles.dropIndicator} ${styles.bottom}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { Sidebar };

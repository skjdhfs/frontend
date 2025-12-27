import styles from './Sidebar.module.css';
import type { SlideList } from '../../store/types';
import { SlideThumbnail } from '../SlideThumbnail/SlideThumbnail';

type SidebarProps = {
  slides: SlideList;
  selectedSlidesIds: string[];
};

function Sidebar(props: SidebarProps) {

  return (
    <div className={styles.sidebar}>
      {props.slides.map((slide, index) => {
        return (
            <SlideThumbnail
              key={slide.id}
              slide={slide}
              index={index}
              length={props.slides.length}
              selectedSlidesIds={props.selectedSlidesIds}
            ></SlideThumbnail>
        );
      })}
    </div>
  );
}

export { Sidebar };

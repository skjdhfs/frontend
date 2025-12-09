import styles from "./Sidebar.module.css";
import type { SlideList } from "../store/types";
import { SlideThumbnail } from "./SlideThumbnail";

type SidebarProps = {
  slides: SlideList;
};

function Sidebar(props: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      {props.slides.map((slide, index) => (
        <div key={slide.id}>
          <div>{index + 1}</div>
          <SlideThumbnail
            slide={slide}
            onClick={() => console.log(slide.id, ", ", index + 1)}
          ></SlideThumbnail>
        </div>
      ))}
    </div>
  );
}

export { Sidebar };

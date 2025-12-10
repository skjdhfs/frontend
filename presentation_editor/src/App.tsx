import styles from "./App.module.css";

import { Toolbar } from "./view/Toolbar/Toolbar";
import { Sidebar } from "./view/Sidebar/Sidebar";
import { SlideView } from "./view/SlideView/SlideView";

import type { Editor } from "./store/types";

type AppProps = {
  editor: Editor;
};

function App(props: AppProps) {
  const selectedSlideIds = props.editor.selected.selectedSlidesIds;

  const slides = props.editor.presentation.slides;
  const firstSelectedSlide = slides.find(
    (slide) => slide.id == selectedSlideIds[0],
  );
  if (!firstSelectedSlide) {
    return <></>;
  }
  return (
    <div className={styles.page}>
      <Toolbar></Toolbar>
      <div className={styles.main}>
        <Sidebar slides={props.editor.presentation.slides} ></Sidebar>
        <div className={styles.workspace}>
          <SlideView slide={firstSelectedSlide} ></SlideView>
        </div>
      </div>
    </div>
  );
}

export default App;
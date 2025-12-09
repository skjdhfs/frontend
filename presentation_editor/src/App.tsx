import styles from "./App.module.css";

import { Toolbar } from "./view/Toolbar";
import { Sidebar } from "./view/Sidebar";
import { SlideView } from "./view/SlideView";

import type { Editor } from "./store/types";

type AppProps = {
  editor: Editor;
};

function App(props: AppProps) {
  const selectedSlideIds = props.editor.selected.selectedSlidesIds;
  const firstSelectedSlide = props.editor.presentation.slides.find(
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

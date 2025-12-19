import styles from "./App.module.css";

import { Toolbar } from "./view/Toolbar/Toolbar";
import { Sidebar } from "./view/Sidebar/Sidebar";
import { SlideView } from "./view/SlideView/SlideView";
import { NoSlidesPlaceholder } from "./view/NoSlidesPlaceholder/NoSlidesPlaceholder";

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

  let WorkspaceContent;

  if (slides.length == 0 || !firstSelectedSlide) {
    WorkspaceContent = <NoSlidesPlaceholder></NoSlidesPlaceholder>;
  } else {
    WorkspaceContent = (
      <SlideView
        slide={firstSelectedSlide}
        selectedObjId={props.editor.selected.selectedObjId}
      ></SlideView>
    );
  }

  return (
    <div className={styles.page}>
      <Toolbar title={props.editor.presentation.title}></Toolbar>

      <div className={styles.main}>
        <Sidebar
          slides={props.editor.presentation.slides}
          selectedSlidesIds={props.editor.selected.selectedSlidesIds}
        ></Sidebar>

        <div className={styles.workspace}>{WorkspaceContent}</div>
      </div>
    </div>
  );
}

export default App;

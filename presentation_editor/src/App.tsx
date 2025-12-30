import styles from './App.module.css';
import { Toolbar } from './view/Toolbar/Toolbar';
import { Sidebar } from './view/Sidebar/Sidebar';
import { SlideView } from './view/SlideView/SlideView';
import { NoSlidesPlaceholder } from './view/NoSlidesPlaceholder/NoSlidesPlaceholder';
import { useAppSelector } from './store/hooks/reduxHooks';

function App() {
  const slides = useAppSelector((state) => state.editor.presentation.slides);
  const selectedSlidesIds = useAppSelector((state) => state.editor.selected.selectedSlidesIds);
  const firstSelectedSlide = slides.find((slide) => slide.id == selectedSlidesIds[0]);

  let WorkspaceContent;

  if (slides.length == 0 || !firstSelectedSlide) {
    WorkspaceContent = <NoSlidesPlaceholder></NoSlidesPlaceholder>;
  } else {
    WorkspaceContent = (
      <SlideView
        slideId={firstSelectedSlide.id}
      ></SlideView>
    );
  }

  return (
    <div className={styles.page}>
      <Toolbar></Toolbar>

      <div className={styles.main}>
        <Sidebar></Sidebar>

        <div className={styles.workspace}>{WorkspaceContent}</div>
      </div>
    </div>
  );
}

export default App;

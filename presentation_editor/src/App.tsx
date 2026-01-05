import styles from './App.module.css';
import { Toolbar } from './view/Toolbar/Toolbar';
import { Sidebar } from './view/Sidebar/Sidebar';
import { SlideView } from './view/SlideView/SlideView';
import { NoSlidesPlaceholder } from './view/NoSlidesPlaceholder/NoSlidesPlaceholder';
import { LoginPage } from './view/LoginPage/LoginPage';
import { useAppSelector, useAppDispatch } from './store/hooks/reduxHooks';
import { undoAction, redoAction } from './store/editorSlice';
import { useEffect } from 'react';
import { checkAuthStatus } from './store/authThunks';

function App() {
  const dispatch = useAppDispatch()
  const slides = useAppSelector((state) => state.editor.present.presentation.slides);
  const selectedSlidesIds = useAppSelector((state) => state.editor.present.selected.selectedSlidesIds);
  const firstSelectedSlide = slides.find((slide) => slide.id == selectedSlidesIds[0]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isZ = event.code === 'KeyZ'; 
      const isY = event.code === 'KeyY';
      const isMod = event.ctrlKey || event.metaKey;

      if (!isMod) return;
      if (event.repeat) return;

      if (isZ) {
        event.preventDefault();
        event.stopPropagation(); 
        dispatch(undoAction());
      }
      
      if (isY) {
        event.preventDefault();
        event.stopPropagation();
        dispatch(redoAction());
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [dispatch]);

  let WorkspaceContent;

  if (slides.length == 0 || !firstSelectedSlide) {
    WorkspaceContent = <NoSlidesPlaceholder></NoSlidesPlaceholder>;
  } else {
    WorkspaceContent = (
      <SlideView
        slideId={firstSelectedSlide.id}
        isThumbnail={false}
      ></SlideView>
    );
  }

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <LoginPage />;
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

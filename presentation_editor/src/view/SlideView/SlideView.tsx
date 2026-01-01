import styles from './SlideView.module.css'
import { ImageObject } from '../ImageObject/ImageObject';
import { TextObject } from '../TextObject/TextObject';
import { useAppSelector, useAppDispatch } from '../../store/hooks/reduxHooks';
import { unselectObject } from '../../store/editorSlice';

type SlideViewProps = {
  slideId: string;
  isThumbnail: boolean;
};

function SlideView(props: SlideViewProps) {
  const {
    slideId,
    isThumbnail,
  } = props

  const dispatch = useAppDispatch()

  const isSelected = useAppSelector((state) => state.editor.present.selected.selectedSlidesIds.includes(slideId))
  const slide = useAppSelector((state) => state.editor.present.presentation.slides.find(s => s.id === slideId))
  if (!slide) return null

  const background = slide.background;

  let style;
  if (background.type === 'color') {
    style = {
      backgroundColor: `${background.color}`,
    };
  } else {
    style = {
      backgroundImage: `url(${background.src})`,
      backgroundSize: 'cover',
    };
  }

  const thumbnailClasses = `${styles.thumbnail} ${isSelected ? styles.selected : ''}`;
  const slideClasses = `${styles.slide}`

  const className = isThumbnail ? thumbnailClasses : slideClasses
  
  const scale = isThumbnail ? 0.3 : 1

  const handleUnselectObject = () => {
    dispatch(unselectObject());
  };

  return (
    <div className={className} style={style} onClick={handleUnselectObject}>
      
      {slide.slideObj.map((object) => {

        if (object.type == 'text') {

          return (
            <TextObject
              key={object.id}
              slideId={slide.id}
              textObjId={object.id}
              scale={scale}
              isThumbnail={isThumbnail}
            ></TextObject>
          );
        }
        return (
          <ImageObject
            key={object.id}
            slideId={slide.id}
            imageObjId={object.id}
            scale={scale}
            isThumbnail={isThumbnail}
          ></ImageObject>
        );
      })}
    </div>
  );
}

export { SlideView };

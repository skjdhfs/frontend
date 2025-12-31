import styles from './SlideView.module.css';
import { ImageObject } from '../ImageObject/ImageObject';
import { TextObject } from '../TextObject/TextObject';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import { unselectObject } from '../../store/editorSlice';

type SlideViewProps = {
  slideId: string;
};

function SlideView(props: SlideViewProps) {
  const {
    slideId,
  } = props

  const dispatch = useAppDispatch()

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

  const handleUnselectObject = () => {
    dispatch(unselectObject());
  };

  return (
    <div className={styles.slide} onClick={handleUnselectObject} style={style}>
      
      {slide.slideObj.map((object) => {

        if (object.type == 'text') {

          return (
            <TextObject
              key={object.id}
              slideId={slide.id}
              textObjId={object.id}
              scale={1}
            ></TextObject>
          );
        }
        return (
          <ImageObject
            key={object.id}
            slideId={slide.id}
            imageObjId={object.id}
            scale={1}
          ></ImageObject>
        );
      })}
    </div>
  );
}

export { SlideView };

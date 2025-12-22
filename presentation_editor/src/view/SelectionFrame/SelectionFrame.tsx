import styles from './SelectionFrame.module.css'
import { useDnd } from '../../store/hooks/useDnd'
import { dispatch } from '../../store/editor'
import { moveSlideObj, changeSlideObjSize } from '../../store/functions'
import type { SlideObj } from '../../store/types'

type SelectionFrameProps = {
    object: SlideObj
}

function SelectionFrame(props: SelectionFrameProps) {
    const {
        object
    } = props

    const {onMouseDown} = useDnd({
        startX: object.position.x,
        startY: object.position.y,
        onDrag: (newX, newY) => dispatch(moveSlideObj, {newPosition: {x: newX, y: newY}})
    })

    const style = {
        top: 0,
        left: 0,
        width: object.size.width,
        height: object.size.height,
    }

    return (
        <div
            className={styles.frame}
            style={style}
            onClick={(e) => e.stopPropagation()} 
        >
            <div onMouseDown={onMouseDown} className={`${styles.border} ${styles.borderTop}`}></div>
            <div onMouseDown={onMouseDown} className={`${styles.border} ${styles.borderBottom}`}></div>
            <div onMouseDown={onMouseDown} className={`${styles.border} ${styles.borderLeft}`}></div>
            <div onMouseDown={onMouseDown} className={`${styles.border} ${styles.borderRight}`}></div>
        </div>
    )
}

export {SelectionFrame}
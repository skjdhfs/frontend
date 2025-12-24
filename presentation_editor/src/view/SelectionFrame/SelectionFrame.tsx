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
        top: -2,
        left: -2,
        width: object.size.width + 4,
        height: object.size.height + 4,
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
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

    const {onMouseDown: onMoveMouseDown} = useDnd({
        startX: object.position.x,
        startY: object.position.y,
        onDrag: (newX, newY) => dispatch(moveSlideObj, {newPosition: {x: newX, y: newY}})
    })

    const minSize = 10;

    const aspectRatio = object.size.width / object.size.height

    const {onMouseDown: onBottomRight} = useDnd({
        startX: object.size.width,
        startY: object.size.height,
        onDrag: (newW) => {
            const width = Math.max(newW, minSize)
            const height = width / aspectRatio
            dispatch(changeSlideObjSize, {
                newSize: {width, height}
            })
        }
    })

    const {onMouseDown: onBottomLeft} = useDnd({
        startX: object.position.x,
        startY: object.size.height,
        onDrag: (newX) => {
            const offsetX = object.position.x - newX;
            const width = Math.max(object.size.width + offsetX, minSize)
            const height = width / aspectRatio

            dispatch(changeSlideObjSize, {
                newSize: {width, height},
                newPosition: {x: object.position.x + (object.size.width - width), y: object.position.y}
            })
        }
    })

    const {onMouseDown: onTopRight} = useDnd({
        startX: object.size.width,
        startY: object.position.y,
        onDrag: (_, newY) => {
            const offsetY = object.position.y - newY
            const height = Math.max(object.size.height + offsetY, minSize)
            const width = height * aspectRatio
            if (height > minSize) {
                dispatch(changeSlideObjSize, {
                    newSize: {width, height},
                    newPosition: {x: object.position.x, y: newY}
                })
            }
        }
    })

    const {onMouseDown: onTopLeft} = useDnd({
        startX: object.position.x,
        startY: object.position.y,
        onDrag: (_, newY) => {

            const offsetY = object.position.y - newY
            const height = object.size.height + offsetY
            const width = height * aspectRatio
            const offsetX = width - object.size.width

            if (height > minSize) {
                dispatch(changeSlideObjSize, {
                    newSize: {width, height},
                    newPosition: {x: object.position.x - offsetX, y: newY}
                })
            }
        }
    })

    const styleContainer = {
        top: -2,
        left: -2,
        width: object.size.width + 4,
        height: object.size.height + 4,
    }

    return (
        <div
            className={styles.container}
            style={styleContainer}
            onClick={(e) => e.stopPropagation()} 
        >
            <div onMouseDown={onMoveMouseDown} className={`${styles.border} ${styles.borderTop}`}></div>
            <div onMouseDown={onMoveMouseDown} className={`${styles.border} ${styles.borderBottom}`}></div>
            <div onMouseDown={onMoveMouseDown} className={`${styles.border} ${styles.borderLeft}`}></div>
            <div onMouseDown={onMoveMouseDown} className={`${styles.border} ${styles.borderRight}`}></div>

            <div onMouseDown={onTopLeft} className={`${styles.dot} ${styles.dotTopLeft}`}></div>
            <div onMouseDown={onTopRight} className={`${styles.dot} ${styles.dotTopRight}`}></div>
            <div onMouseDown={onBottomLeft} className={`${styles.dot} ${styles.dotBottomLeft}`}></div>
            <div onMouseDown={onBottomRight} className={`${styles.dot} ${styles.dotBottomRight}`}></div>
        </div>
    )
}

export {SelectionFrame}
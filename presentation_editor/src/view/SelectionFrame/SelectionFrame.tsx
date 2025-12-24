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
    const isImage = object.type === 'image'
    const aspectRatio = object.size.width / object.size.height

    const {onMouseDown: onBottomRight} = useDnd({
        startX: object.size.width,
        startY: object.size.height,
        onDrag: (newW, newH) => {
            const width = Math.max(newW, minSize)
            let height = Math.max(newH, minSize)
            if (isImage) {
                height = width / aspectRatio
            }
            dispatch(changeSlideObjSize, {
                newSize: {width, height}
            })
        }
    })

    const {onMouseDown: onBottomLeft} = useDnd({
        startX: object.position.x,
        startY: object.size.height,
        onDrag: (newX, newH) => {
            const offsetX = object.position.x - newX;
            const width = Math.max(object.size.width + offsetX, minSize)
            let height = Math.max(newH, minSize)

            if (isImage) {
                height = width / aspectRatio
            }

            dispatch(changeSlideObjSize, {
                newSize: {width, height},
                newPosition: {x: object.position.x + (object.size.width - width), y: object.position.y}
            })
        }
    })

    const {onMouseDown: onTopRight} = useDnd({
        startX: object.size.width,
        startY: object.position.y,
        onDrag: (newW, newY) => {
            const offsetY = object.position.y - newY
            const height = Math.max(object.size.height + offsetY, minSize)
            let width = Math.max(newW, minSize)

            if (isImage) {
                width = height * aspectRatio
            }

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
        onDrag: (newX, newY) => {

            const offsetX = object.position.x - newX
            const offsetY = object.position.y - newY

            let width = Math.max(object.size.width + offsetX, minSize)
            let height = Math.max(object.size.height + offsetY, minSize)

            if (isImage) {
                width = height * aspectRatio
            }

            if (height > minSize) {
                dispatch(changeSlideObjSize, {
                    newSize: {width, height},
                    newPosition: {
                        x: object.position.x + object.size.width - width,
                        y: object.position.y + object.size.height - height
                    }
                })
            }
        }
    })

    const {onMouseDown: onMidRight} = useDnd({
        startX: object.size.width,
        startY: 0,
        onDrag: (newW) => {
            dispatch(changeSlideObjSize, {
                newSize: {width: Math.max(newW, minSize), height: object.size.height}
            })
        }
    })

    const {onMouseDown: onMidLeft} = useDnd({
        startX: object.position.x,
        startY: 0,
        onDrag: (newX) => {
            const offsetX = object.position.x - newX
            const width = Math.max(object.size.width + offsetX, minSize)
            dispatch(changeSlideObjSize, {
                newSize: {width, height: object.size.height},
                newPosition: {
                    x: object.position.x + object.size.width - width,
                    y: object.position.y
                }
            })
        }
    })

    const {onMouseDown: onMidBottom} = useDnd({
        startX: 0,
        startY: object.size.height,
        onDrag: (_, newH) => {
            dispatch(changeSlideObjSize, {
                newSize: {
                    width: object.size.width,
                    height: Math.max(newH, minSize)
                }
            })
        }
    })

    const {onMouseDown: onMidTop} = useDnd({
        startX: 0,
        startY: object.position.y,
        onDrag: (_, newY) => {
            const offsetY = object.position.y - newY
            const height = Math.max(object.size.height + offsetY, minSize)
            dispatch(changeSlideObjSize, {
                newSize: {width: object.size.width, height},
                newPosition: {
                    x: object.position.x,
                    y: object.position.y + object.size.height - height
                }
            })
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

            <div onMouseDown={onTopLeft} className={`${styles.dot} ${styles.dotTopLeft} ${styles.dotCorner}`}></div>
            <div onMouseDown={onTopRight} className={`${styles.dot} ${styles.dotTopRight} ${styles.dotCorner}`}></div>
            <div onMouseDown={onBottomLeft} className={`${styles.dot} ${styles.dotBottomLeft} ${styles.dotCorner}`}></div>
            <div onMouseDown={onBottomRight} className={`${styles.dot} ${styles.dotBottomRight} ${styles.dotCorner}`}></div>

            <div onMouseDown={onMidTop} className={`${styles.dot} ${styles.dotMidTop}`}></div>
            <div onMouseDown={onMidBottom} className={`${styles.dot} ${styles.dotMidBottom}`}></div>
            <div onMouseDown={onMidLeft} className={`${styles.dot} ${styles.dotMidLeft}`}></div>
            <div onMouseDown={onMidRight} className={`${styles.dot} ${styles.dotMidRight}`}></div>
        </div>
    )
}

export {SelectionFrame}
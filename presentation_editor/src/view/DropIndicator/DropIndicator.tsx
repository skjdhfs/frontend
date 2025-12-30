import styles from './DropIndicator.module.css'

type DropIndicatorProps = {
    isVisible: boolean
}

function DropIndicator(props: DropIndicatorProps) {
    const {isVisible} = props

    const style = {
        display: isVisible ? 'block' as const : 'none' as const
    }
    return (
        <div className={styles.dropIndicator} style={style}></div>
    )
}

export {DropIndicator}
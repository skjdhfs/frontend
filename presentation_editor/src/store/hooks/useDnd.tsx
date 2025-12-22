
type DndArgs = {
  startX: number,
  startY: number,
  onDrag?: (newX: number, newY: number) => void,
  onFinish?: (newX: number, newY: number) => void,
}

type DndResult = {
    onMouseDown: (event: React.MouseEvent) => void
}

function useDnd(args: DndArgs): DndResult {

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault()

        const startMouseX = event.pageX
        const startMouseY = event.pageY

        const initialX = args.startX
        const initialY = args.startY

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const offsetX = (moveEvent.pageX - startMouseX)
            const offsetY = (moveEvent.pageY - startMouseY)

            const newX = initialX + offsetX
            const newY = initialY + offsetY

            args.onDrag?.(newX, newY)
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    return {onMouseDown: handleMouseDown}
}

export { useDnd }
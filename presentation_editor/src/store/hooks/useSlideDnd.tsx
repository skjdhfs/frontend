import { useCallback, useRef, useEffect } from 'react';

type SlideDndArgs = {
  index: number;
  slideHeight: number;
  onDrag?: (y: number) => void; 
  onDragStart?: (event: MouseEvent) => void;
  onFinish?: (targetIndex: number) => void;
};

function useSlideDnd(args: SlideDndArgs) {
  const argsRef = useRef(args);
  argsRef.current = args;

  const startMouseY = useRef(0);
  const isDragging = useRef(false);
  const wasMoved = useRef(false);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaY = event.clientY - startMouseY.current;

    if (!wasMoved.current && Math.abs(deltaY) > 3) {
      wasMoved.current = true;
      argsRef.current.onDragStart?.(event);
    }

    if (wasMoved.current) {
      argsRef.current.onDrag?.(deltaY);
    }
  }, []);

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const deltaY = event.clientY - startMouseY.current;

      if (wasMoved.current) {
        argsRef.current.onFinish?.(deltaY);
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      isDragging.current = true;
      wasMoved.current = false;
      startMouseY.current = event.clientY;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  return { onMouseDown };
}

export { useSlideDnd };

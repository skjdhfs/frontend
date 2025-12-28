import { useCallback, useRef, useEffect } from 'react';

type SlideDndArgs = {
  index: number;
  slideHeight: number;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
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
  const scrollAnimationFrame = useRef<number | null>(null);
  const lastMouseY = useRef(0);

  const handleAutoScroll = useCallback(() => {
    const container = argsRef.current.scrollContainerRef?.current;
    if (!container || !isDragging.current) {
      scrollAnimationFrame.current = null;
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const cursorY = lastMouseY.current;
    const scrollThreshold = 50; 
    const scrollSpeed = 10; 

    const distanceFromTop = cursorY - containerRect.top;
    const distanceFromBottom = containerRect.bottom - cursorY;

    let scrollAmount = 0;
    if (distanceFromTop < scrollThreshold && container.scrollTop > 0) {

      scrollAmount = -scrollSpeed * ((scrollThreshold - distanceFromTop) / scrollThreshold);
    } else if (distanceFromBottom < scrollThreshold) {
    
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (container.scrollTop < maxScroll) {
        scrollAmount = scrollSpeed * ((scrollThreshold - distanceFromBottom) / scrollThreshold);
      }
    }

    if (scrollAmount !== 0) {
      container.scrollTop += scrollAmount;
      
      scrollAnimationFrame.current = requestAnimationFrame(handleAutoScroll);
    } else {
      scrollAnimationFrame.current = null;
    }
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging.current) return;

    lastMouseY.current = event.clientY;
    const deltaY = event.clientY - startMouseY.current;

    if (!wasMoved.current && Math.abs(deltaY) > 3) {
      wasMoved.current = true;
      argsRef.current.onDragStart?.(event);
    }

    if (wasMoved.current) {
      argsRef.current.onDrag?.(deltaY);
      
      if (scrollAnimationFrame.current === null) {
        handleAutoScroll();
      }
    }
  }, [handleAutoScroll]);

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      if (scrollAnimationFrame.current !== null) {
        cancelAnimationFrame(scrollAnimationFrame.current);
        scrollAnimationFrame.current = null;
      }

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
      if (scrollAnimationFrame.current !== null) {
        cancelAnimationFrame(scrollAnimationFrame.current);
      }
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

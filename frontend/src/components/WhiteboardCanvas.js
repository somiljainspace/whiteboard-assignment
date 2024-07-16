import React, { useEffect, useState, useRef } from 'react';

const WhiteboardCanvas = React.forwardRef(({ tool, color }, ref) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState(null); // Define currentRect state here
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
  }, [ref]);

  useEffect(() => {
    const canvas = ref.current;
    const context = contextRef.current;

    const startDrawing = (event) => {
      const canvas = ref.current;
      const rect = canvas.getBoundingClientRect();
      let x, y;
      if (event.offsetX !== undefined && event.offsetY !== undefined) {
        x = event.offsetX;
        y = event.offsetY;
      } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      }
      context.strokeStyle = color;
      setStartPos({ x, y });
      if (tool === 'pencil') {
        context.beginPath();
        context.moveTo(x, y);
      }
      setIsDrawing(true);
    };

    const finishDrawing = () => {
      if (tool === 'rectangle' && isDrawing) {
        const { x, y, width, height } = currentRect;
        context.strokeRect(x, y, width, height);
      }
      context.closePath();
      setIsDrawing(false);
    };

    const draw = (event) => {
      if (!isDrawing) return;
      const canvas = ref.current;
      const rect = canvas.getBoundingClientRect();
      let x, y;
      if (event.offsetX !== undefined && event.offsetY !== undefined) {
        x = event.offsetX;
        y = event.offsetY;
      } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      }
      if (tool === 'pencil') {
        context.lineTo(x, y);
        context.stroke();
      } else if (tool === 'rectangle') {
        const { x: startX, y: startY } = startPos;
        const width = x - startX;
        const height = y - startY;
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous rectangles
        context.strokeRect(startX, startY, width, height);
        setCurrentRect({ x: startX, y: startY, width, height }); // Update currentRect state
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', finishDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', finishDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', finishDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseleave', finishDrawing);
    };
  }, [isDrawing, color, tool, startPos, ref, currentRect]);

  return (
    <canvas
      ref={ref}
      width={800}
      height={600}
      style={{ border: '1px solid #000' }}
    />
  );
});

export default WhiteboardCanvas;

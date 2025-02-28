import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ResizableComponentProps {
  children: React.ReactNode;
  styles: Record<string, string>;
  onResize: (newStyles: Record<string, string>) => void;
  isSelected: boolean;
}

export function ResizableComponent({
  children,
  styles,
  onResize,
  isSelected,
}: ResizableComponentProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [resizeDirection, setResizeDirection] = useState<string>("");

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.stopPropagation();
      setIsResizing(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      const element = e.currentTarget.parentElement as HTMLElement;
      setStartSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
      setResizeDirection(direction);
    },
    []
  );

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;

      let newWidth = startSize.width;
      let newHeight = startSize.height;

      if (resizeDirection.includes("e")) newWidth = startSize.width + dx;
      if (resizeDirection.includes("w")) newWidth = startSize.width - dx;
      if (resizeDirection.includes("s")) newHeight = startSize.height + dy;
      if (resizeDirection.includes("n")) newHeight = startSize.height - dy;

      // Minimum size constraints
      newWidth = Math.max(50, newWidth);
      newHeight = Math.max(30, newHeight);

      onResize({
        ...styles,
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      });
    },
    [isResizing, startPos, startSize, resizeDirection, styles, onResize]
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResizeMove);
      window.addEventListener("mouseup", handleResizeEnd);
      return () => {
        window.removeEventListener("mousemove", handleResizeMove);
        window.removeEventListener("mouseup", handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  if (!isSelected) return <>{children}</>;

  return (
    <div className="relative group">
      {children}
      {/* Resize handles */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          isSelected && "border-2 border-primary"
        )}
      >
        {/* Corner handles */}
        <div
          className="absolute top-0 left-0 w-2 h-2 bg-primary cursor-nw-resize -translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, "nw")}
          style={{ pointerEvents: "auto" }}
        />
        <div
          className="absolute top-0 right-0 w-2 h-2 bg-primary cursor-ne-resize translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, "ne")}
          style={{ pointerEvents: "auto" }}
        />
        <div
          className="absolute bottom-0 left-0 w-2 h-2 bg-primary cursor-sw-resize -translate-x-1/2 translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, "sw")}
          style={{ pointerEvents: "auto" }}
        />
        <div
          className="absolute bottom-0 right-0 w-2 h-2 bg-primary cursor-se-resize translate-x-1/2 translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, "se")}
          style={{ pointerEvents: "auto" }}
        />

        {/* Edge handles */}
        <div
          className="absolute top-0 left-1/2 w-2 h-2 bg-primary cursor-n-resize -translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, "n")}
          style={{ pointerEvents: "auto" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary cursor-s-resize -translate-x-1/2 translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, "s")}
          style={{ pointerEvents: "auto" }}
        />
        <div
          className="absolute left-0 top-1/2 w-2 h-2 bg-primary cursor-w-resize -translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, "w")}
          style={{ pointerEvents: "auto" }}
        />
        <div
          className="absolute right-0 top-1/2 w-2 h-2 bg-primary cursor-e-resize translate-x-1/2 -translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, "e")}
          style={{ pointerEvents: "auto" }}
        />
      </div>
    </div>
  );
}

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Move, Maximize2, RotateCw } from "lucide-react";

interface InteractiveComponentProps {
  children: React.ReactNode;
  styles: Record<string, string>;
  onStyleChange: (newStyles: Record<string, string>) => void;
  isSelected: boolean;
  onSelect: () => void;
  onDrop: (e: React.DragEvent) => void;
}

type InteractionMode = "none" | "move" | "resize" | "rotate";

export function InteractiveComponent({
  children,
  styles,
  onStyleChange,
  isSelected,
  onSelect,
  onDrop,
}: InteractiveComponentProps) {
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>("none");
  const componentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startStyles, setStartStyles] = useState<Record<string, string>>({});

  // Handle mode selection
  const handleModeSelect = (e: React.MouseEvent, mode: InteractionMode) => {
    e.stopPropagation();
    setInteractionMode(mode === interactionMode ? "none" : mode);
  };

  // Handle mouse down for moving
  const handleMoveStart = useCallback(
    (e: React.MouseEvent) => {
      if (interactionMode !== "move") return;
      e.stopPropagation();
      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartStyles({
        left: styles.left || "0px",
        top: styles.top || "0px",
      });
    },
    [interactionMode, styles]
  );

  // Handle mouse down for resizing
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      if (interactionMode !== "resize") return;
      e.stopPropagation();
      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      const element = componentRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      setStartStyles({
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        left: styles.left || "0px",
        top: styles.top || "0px",
      });
    },
    [interactionMode, styles]
  );

  // Handle mouse down for rotating
  const handleRotateStart = useCallback(
    (e: React.MouseEvent) => {
      if (interactionMode !== "rotate") return;
      e.stopPropagation();
      setIsDragging(true);
      const element = componentRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      setStartPos({
        x: startAngle,
        y: parseFloat(styles.rotate?.replace("deg", "") || "0"),
      });
    },
    [interactionMode, styles]
  );

  // Handle mouse move
  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      switch (interactionMode) {
        case "move": {
          const dx = e.clientX - startPos.x;
          const dy = e.clientY - startPos.y;
          const startLeft = parseInt(startStyles.left || "0");
          const startTop = parseInt(startStyles.top || "0");

          onStyleChange({
            ...styles,
            left: `${startLeft + dx}px`,
            top: `${startTop + dy}px`,
          });
          break;
        }
        case "resize": {
          const dx = e.clientX - startPos.x;
          const dy = e.clientY - startPos.y;
          const startWidth = parseInt(startStyles.width || "0");
          const startHeight = parseInt(startStyles.height || "0");

          onStyleChange({
            ...styles,
            width: `${Math.max(50, startWidth + dx)}px`,
            minHeight: `${Math.max(40, startHeight + dy)}px`,
          });
          break;
        }
        case "rotate": {
          const element = componentRef.current;
          if (!element) return;
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          const rotation = ((angle - startPos.x) * 180) / Math.PI + startPos.y;

          onStyleChange({
            ...styles,
            transform: `rotate(${rotation}deg)`,
            rotate: `${rotation}deg`,
          });
          break;
        }
      }
    },
    [isDragging, interactionMode, startPos, startStyles, styles, onStyleChange]
  );

  // Handle mouse up
  const handleMoveEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleMoveEnd);
      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleMoveEnd);
      };
    }
  }, [isDragging, handleMove, handleMoveEnd]);

  const handleDragOver = (e: React.DragEvent) => {
    if (isSelected) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={componentRef}
      className={cn("absolute")}
      style={styles}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseDown={interactionMode === "move" ? handleMoveStart : undefined}
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      {children}

      {isSelected && (
        <>
          {/* Selection border */}
          <div
            className={cn(
              "absolute -inset-[1px] border-2 border-blue-500 pointer-events-none",
              interactionMode === "resize" && "border-dashed"
            )}
          />

          {/* Control buttons */}
          <div className="absolute -top-12 right-0 flex gap-2">
            <button
              className={cn(
                "p-2 rounded-full bg-white shadow-md hover:bg-gray-50",
                interactionMode === "move" && "bg-blue-100"
              )}
              onClick={(e) => handleModeSelect(e, "move")}
            >
              <Move className="w-4 h-4" />
            </button>
            <button
              className={cn(
                "p-2 rounded-full bg-white shadow-md hover:bg-gray-50",
                interactionMode === "resize" && "bg-blue-100"
              )}
              onClick={(e) => handleModeSelect(e, "resize")}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              className={cn(
                "p-2 rounded-full bg-white shadow-md hover:bg-gray-50",
                interactionMode === "rotate" && "bg-blue-100"
              )}
              onClick={(e) => handleModeSelect(e, "rotate")}
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Resize handles */}
          {interactionMode === "resize" && (
            <>
              <div
                className="absolute top-0 left-0 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize -translate-x-1/2 -translate-y-1/2"
                onMouseDown={(e) => handleResizeStart(e, "nw")}
              />
              <div
                className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize translate-x-1/2 -translate-y-1/2"
                onMouseDown={(e) => handleResizeStart(e, "ne")}
              />
              <div
                className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize -translate-x-1/2 translate-y-1/2"
                onMouseDown={(e) => handleResizeStart(e, "sw")}
              />
              <div
                className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize translate-x-1/2 translate-y-1/2"
                onMouseDown={(e) => handleResizeStart(e, "se")}
              />
              <div
                className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-n-resize -translate-x-1/2 -translate-y-1/2"
                onMouseDown={(e) => handleResizeStart(e, "n")}
              />
              <div
                className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-s-resize -translate-x-1/2 translate-y-1/2"
                onMouseDown={(e) => handleResizeStart(e, "s")}
              />
              <div
                className="absolute left-0 top-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-w-resize -translate-x-1/2 -translate-y-1/2"
                onMouseDown={(e) => handleResizeStart(e, "w")}
              />
              <div
                className="absolute right-0 top-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-e-resize translate-x-1/2 -translate-y-1/2"
                onMouseDown={(e) => handleResizeStart(e, "e")}
              />
            </>
          )}

          {/* Rotation handles */}
          {interactionMode === "rotate" && (
            <>
              <div
                className="absolute -top-6 left-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-move -translate-x-1/2"
                onMouseDown={handleRotateStart}
              />
              <div
                className="absolute top-1/2 -right-6 w-3 h-3 bg-blue-500 rounded-full cursor-move -translate-y-1/2"
                onMouseDown={handleRotateStart}
              />
              <div
                className="absolute -bottom-6 left-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-move -translate-x-1/2"
                onMouseDown={handleRotateStart}
              />
              <div
                className="absolute top-1/2 -left-6 w-3 h-3 bg-blue-500 rounded-full cursor-move -translate-y-1/2"
                onMouseDown={handleRotateStart}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

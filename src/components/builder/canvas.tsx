import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ComponentItem } from "./component-library";
import { RenderableComponents } from "./renderable-components";
import { InteractiveComponent } from "./interactive-component";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layers } from "lucide-react";

interface CanvasProps {
  onDrop: (
    component: ComponentItem,
    position: { x: number; y: number }
  ) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

interface DroppedComponent extends ComponentItem {
  id: string;
  position: { x: number; y: number };
  content: string | string[] | null;
  styles: Record<string, string>;
  parentId: string | null;
  children: string[];
}

export function Canvas({ onDrop, onSelect, selectedId }: CanvasProps) {
  const [components, setComponents] = useState<DroppedComponent[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showHierarchy, setShowHierarchy] = useState(true);

  // Handle delete key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedId) {
        deleteComponent(selectedId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const deleteComponent = (id: string) => {
    setComponents((prev) => {
      // First, find the component to delete
      const componentToDelete = prev.find((c) => c.id === id);
      if (!componentToDelete) return prev;

      // Update parent's children array
      const updatedComponents = prev.map((comp) => {
        if (comp.id === componentToDelete.parentId) {
          return {
            ...comp,
            children: comp.children.filter((childId) => childId !== id),
          };
        }
        return comp;
      });

      // Remove the component and all its children recursively
      const idsToRemove = new Set<string>([id]);
      const addChildrenToRemove = (parentId: string) => {
        const children = updatedComponents.filter(
          (c) => c.parentId === parentId
        );
        children.forEach((child) => {
          idsToRemove.add(child.id);
          addChildrenToRemove(child.id);
        });
      };
      addChildrenToRemove(id);

      return updatedComponents.filter((c) => !idsToRemove.has(c.id));
    });
    onSelect(""); // Deselect after deletion
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent, parentId: string | null = null) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const componentData = e.dataTransfer.getData("application/json");
    if (!componentData) return;

    const component = JSON.parse(componentData) as ComponentItem;
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left - 100, // Center horizontally (200px width / 2)
      y: e.clientY - rect.top - 20, // Center vertically (40px height / 2)
    };

    const newComponent: DroppedComponent = {
      ...component,
      id: `${component.name}-${Date.now()}`,
      position,
      styles: {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "200px",
        minHeight: "40px",
        padding: "8px",
        margin: "0px",
        fontSize: "16px",
        fontFamily: "Inter",
        color: "#000000",
        backgroundColor: parentId ? "rgba(0,0,0,0.05)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "none",
        rotate: "0deg",
        border: parentId ? "1px dashed rgba(0,0,0,0.2)" : "none",
      },
      content: null,
      parentId,
      children: [],
    };

    setComponents((prev) => {
      const newComponents = [...prev, newComponent];
      if (parentId) {
        return newComponents.map((comp) =>
          comp.id === parentId
            ? { ...comp, children: [...comp.children, newComponent.id] }
            : comp
        );
      }
      return newComponents;
    });

    onDrop(component, position);
    onSelect(newComponent.id);
  };

  const handleContentChange = (id: string, newContent: string | string[]) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, content: newContent } : comp
      )
    );
  };

  const handleStyleChange = (id: string, newStyles: Record<string, string>) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? { ...comp, styles: { ...comp.styles, ...newStyles } }
          : comp
      )
    );
  };

  const renderHierarchy = (parentId: string | null = null, depth = 0) => {
    const componentsAtLevel = components.filter((c) => c.parentId === parentId);

    return componentsAtLevel.map((component) => (
      <div key={component.id}>
        <div
          className={cn(
            "flex items-center gap-2 p-2 cursor-pointer hover:bg-accent/50 rounded",
            selectedId === component.id && "bg-accent"
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => onSelect(component.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, component.id)}
        >
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <span className="text-sm">{component.name}</span>
        </div>
        {component.children.length > 0 &&
          renderHierarchy(component.id, depth + 1)}
      </div>
    ));
  };

  const renderComponent = (component: DroppedComponent) => {
    const ComponentToRender =
      RenderableComponents[component.name as keyof typeof RenderableComponents];
    if (!ComponentToRender) return null;

    return (
      <InteractiveComponent
        key={component.id}
        styles={component.styles}
        onStyleChange={(newStyles) =>
          handleStyleChange(component.id, newStyles)
        }
        isSelected={selectedId === component.id}
        onSelect={() => onSelect(component.id)}
        onDrop={(e) => handleDrop(e, component.id)}
      >
        <ComponentToRender
          id={component.id}
          styles={component.styles}
          content={component.content}
          isEditing={false}
          onContentChange={(content) =>
            handleContentChange(component.id, content)
          }
        >
          {component.children.map((childId) => {
            const childComponent = components.find((c) => c.id === childId);
            return childComponent ? renderComponent(childComponent) : null;
          })}
        </ComponentToRender>
      </InteractiveComponent>
    );
  };

  return (
    <div className="flex flex-1">
      {/* Hierarchy Panel */}
      {showHierarchy && (
        <div className="w-64 border-r bg-background">
          <div className="h-12 border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <h3 className="font-medium">Hierarchy</h3>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="p-2">{renderHierarchy()}</div>
          </ScrollArea>
        </div>
      )}

      {/* Canvas */}
      <div className="flex-1 bg-accent/10 p-8">
        <div
          className={cn(
            "relative max-w-6xl mx-auto min-h-[calc(100vh-10rem)] bg-background rounded-lg shadow-sm border",
            isDraggingOver && "ring-2 ring-primary/20"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, null)}
        >
          {components.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Drag and drop components here
            </div>
          ) : (
            components
              .filter((component) => component.parentId === null)
              .map((component) => renderComponent(component))
          )}
        </div>
      </div>
    </div>
  );
}

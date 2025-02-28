"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Save } from "lucide-react";
import {
  ComponentLibrary,
  ComponentItem,
} from "@/components/builder/component-library";
import { Canvas } from "@/components/builder/canvas";
import { StyleEditor } from "@/components/builder/style-editor";

export default function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );
  const [projectName, setProjectName] = useState("Untitled Project");
  const [components, setComponents] = useState<
    (ComponentItem & { id: string; styles: Record<string, string> })[]
  >([]);

  useEffect(() => {
    // In a real app, this would load the project data from a database
    console.log("Loading project:", id);
  }, [id]);

  const handleDrop = (
    component: ComponentItem,
    position: { x: number; y: number }
  ) => {
    const newComponent = {
      ...component,
      id: `${component.name}-${Date.now()}`,
      styles: {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "auto",
        height: "auto",
        padding: "8px",
        margin: "0px",
        fontSize: "16px",
        fontFamily: "Inter",
        color: "#000000",
        backgroundColor: "transparent",
      },
    };
    setComponents((prev) => [...prev, newComponent]);
    console.log("Component dropped:", { component, position });
  };

  const handleStyleChange = (id: string, styles: Record<string, string>) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? {
              ...comp,
              styles: { ...comp.styles, ...styles },
            }
          : comp
      )
    );
  };

  const handleSave = () => {
    // In a real app, this would save the current state to a database
    console.log("Saving project:", id);
  };

  const handlePreview = () => {
    // In a real app, this would open a preview of the current page
    window.open(`/preview/${id}`, "_blank");
  };

  const selectedComponent =
    components.find((c) => c.id === selectedComponentId) || null;

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Component Library */}
      <div className="w-64 border-r bg-background">
        <div className="h-16 border-b flex items-center justify-between px-4">
          <h2 className="font-semibold">Components</h2>
        </div>
        <ComponentLibrary onDragStart={() => {}} />
      </div>

      {/* Main Content - Canvas */}
      <main className="flex-1 flex flex-col">
        <div className="h-16 border-b flex items-center justify-between px-6">
          <Input
            className="w-64"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        <Canvas
          onDrop={handleDrop}
          onSelect={setSelectedComponentId}
          selectedId={selectedComponentId}
        />
      </main>

      {/* Right Sidebar - Style Editor */}
      <StyleEditor
        selectedComponent={selectedComponent}
        onStyleChange={handleStyleChange}
      />
    </div>
  );
}

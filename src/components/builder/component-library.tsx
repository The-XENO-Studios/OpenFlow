import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Type,
  Image as ImageIcon,
  Square,
  Layout,
  ListOrdered,
  Link as LinkIcon,
  Grid2X2,
  FormInput,
  Video,
  Map,
  Share2,
  Table,
} from "lucide-react";

export interface ComponentItem {
  name: string;
  iconName: string;
  category: string;
  description: string;
}

// Map of icon names to their components
export const ICON_MAP = {
  Type,
  ImageIcon,
  Square,
  Layout,
  ListOrdered,
  LinkIcon,
  Grid2X2,
  FormInput,
  Video,
  Map,
  Share2,
  Table,
} as const;

const components: ComponentItem[] = [
  // Layout Components
  {
    name: "Container",
    iconName: "Layout",
    category: "Layout",
    description: "A centered container for content",
  },
  {
    name: "Grid",
    iconName: "Grid2X2",
    category: "Layout",
    description: "Responsive grid layout",
  },
  {
    name: "Section",
    iconName: "Square",
    category: "Layout",
    description: "Full-width section",
  },

  // Basic Components
  {
    name: "Text",
    iconName: "Type",
    category: "Basic",
    description: "Regular text block",
  },
  {
    name: "Image",
    iconName: "ImageIcon",
    category: "Basic",
    description: "Image upload and display",
  },
  {
    name: "Button",
    iconName: "Square",
    category: "Basic",
    description: "Clickable button",
  },
  {
    name: "Link",
    iconName: "LinkIcon",
    category: "Basic",
    description: "Hyperlink element",
  },

  // Content Components
  {
    name: "List",
    iconName: "ListOrdered",
    category: "Content",
    description: "Ordered or unordered list",
  },
  {
    name: "Table",
    iconName: "Table",
    category: "Content",
    description: "Data table",
  },
  {
    name: "Video",
    iconName: "Video",
    category: "Content",
    description: "Video player",
  },
  {
    name: "Map",
    iconName: "Map",
    category: "Content",
    description: "Embedded map",
  },

  // Form Components
  {
    name: "Input",
    iconName: "FormInput",
    category: "Form",
    description: "Text input field",
  },
  {
    name: "Form",
    iconName: "Square",
    category: "Form",
    description: "Complete form element",
  },
];

interface ComponentLibraryProps {
  onDragStart: (component: ComponentItem) => void;
}

export function ComponentLibrary({ onDragStart }: ComponentLibraryProps) {
  const categories = Array.from(new Set(components.map((c) => c.category)));

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-medium mb-3">{category}</h3>
            <div className="grid gap-2">
              {components
                .filter((c) => c.category === category)
                .map((component) => {
                  const Icon =
                    ICON_MAP[component.iconName as keyof typeof ICON_MAP];
                  return (
                    <div
                      key={component.name}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData(
                          "application/json",
                          JSON.stringify(component)
                        );
                        onDragStart(component);
                      }}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-md border cursor-move",
                        "hover:bg-accent hover:text-accent-foreground",
                        "active:opacity-70 transition-colors"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <div>
                        <div className="text-sm font-medium">
                          {component.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {component.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

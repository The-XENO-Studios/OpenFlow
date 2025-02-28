import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ComponentItem, ICON_MAP } from "./component-library";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StyleEditorProps {
  selectedComponent:
    | (ComponentItem & { id: string; styles: Record<string, string> })
    | null;
  onStyleChange: (id: string, styles: Record<string, string>) => void;
}

export function StyleEditor({
  selectedComponent,
  onStyleChange,
}: StyleEditorProps) {
  if (!selectedComponent) {
    return (
      <div className="w-80 border-l bg-background p-4 flex items-center justify-center text-muted-foreground">
        Select a component to edit its properties
      </div>
    );
  }

  const Icon = ICON_MAP[selectedComponent.iconName as keyof typeof ICON_MAP];

  const handleStyleChange = (property: string, value: string) => {
    onStyleChange(selectedComponent.id, { [property]: value });
  };

  const handleResponsiveChange = (property: string, value: string) => {
    const currentStyles = selectedComponent.styles[property] || "";
    const mediaQuery = "@media (max-width: 768px)";

    if (currentStyles.includes(mediaQuery)) {
      // Update existing media query
      const updatedStyles = currentStyles.replace(
        new RegExp(`${mediaQuery}\\s*{([^}]*)}`, "g"),
        `${mediaQuery} { ${property}: ${value}; }`
      );
      handleStyleChange(property, updatedStyles);
    } else {
      // Add new media query
      handleStyleChange(
        property,
        `${currentStyles}; ${mediaQuery} { ${property}: ${value}; }`
      );
    }
  };

  return (
    <div className="w-80 border-l bg-background">
      <div className="h-16 border-b flex items-center px-4 gap-2">
        <Icon className="h-4 w-4" />
        <h2 className="font-semibold">{selectedComponent.name}</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4">
          <Tabs defaultValue="style" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="responsive">Responsive</TabsTrigger>
            </TabsList>

            <TabsContent value="style" className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs">Typography</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label htmlFor="font-family" className="text-xs">
                          Font Family
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleStyleChange("fontFamily", value)
                          }
                          defaultValue={selectedComponent.styles.fontFamily}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Arial">Arial</SelectItem>
                            <SelectItem value="Helvetica">Helvetica</SelectItem>
                            <SelectItem value="Times New Roman">
                              Times New Roman
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="font-size" className="text-xs">
                          Font Size
                        </Label>
                        <Input
                          id="font-size"
                          className="h-8"
                          placeholder="16px"
                          value={selectedComponent.styles.fontSize}
                          onChange={(e) =>
                            handleStyleChange("fontSize", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs">Colors</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label htmlFor="color" className="text-xs">
                          Text Color
                        </Label>
                        <Input
                          id="color"
                          type="color"
                          className="h-8"
                          value={selectedComponent.styles.color}
                          onChange={(e) =>
                            handleStyleChange("color", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="background" className="text-xs">
                          Background
                        </Label>
                        <Input
                          id="background"
                          type="color"
                          className="h-8"
                          value={selectedComponent.styles.backgroundColor}
                          onChange={(e) =>
                            handleStyleChange("backgroundColor", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs">Spacing</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label htmlFor="padding" className="text-xs">
                          Padding
                        </Label>
                        <Input
                          id="padding"
                          className="h-8"
                          placeholder="16px"
                          value={selectedComponent.styles.padding}
                          onChange={(e) =>
                            handleStyleChange("padding", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="margin" className="text-xs">
                          Margin
                        </Label>
                        <Input
                          id="margin"
                          className="h-8"
                          placeholder="16px"
                          value={selectedComponent.styles.margin}
                          onChange={(e) =>
                            handleStyleChange("margin", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs">Size</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label htmlFor="width" className="text-xs">
                          Width
                        </Label>
                        <Input
                          id="width"
                          className="h-8"
                          placeholder="auto"
                          value={selectedComponent.styles.width}
                          onChange={(e) =>
                            handleStyleChange("width", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="height" className="text-xs">
                          Height
                        </Label>
                        <Input
                          id="height"
                          className="h-8"
                          placeholder="auto"
                          value={selectedComponent.styles.height}
                          onChange={(e) =>
                            handleStyleChange("height", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="responsive" className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs">
                      Mobile Layout (max-width: 768px)
                    </Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label htmlFor="mobile-width" className="text-xs">
                          Width
                        </Label>
                        <Input
                          id="mobile-width"
                          className="h-8"
                          placeholder="100%"
                          onChange={(e) =>
                            handleResponsiveChange("width", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="mobile-font-size" className="text-xs">
                          Font Size
                        </Label>
                        <Input
                          id="mobile-font-size"
                          className="h-8"
                          placeholder="14px"
                          onChange={(e) =>
                            handleResponsiveChange("fontSize", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}

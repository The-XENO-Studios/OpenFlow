import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RenderableComponentProps {
  id: string;
  styles: Record<string, string>;
  content: string | string[] | null;
  isEditing: boolean;
  onContentChange: (content: string | string[]) => void;
  children?: React.ReactNode;
}

export const RenderableComponents = {
  Container: ({ styles, children }: RenderableComponentProps) => (
    <div className="relative w-full min-h-[100px] p-4" style={styles}>
      {children || (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          Drop components here
        </div>
      )}
    </div>
  ),

  Text: ({
    styles,
    content,
    isEditing,
    onContentChange,
    children,
  }: RenderableComponentProps) => (
    <div className={cn("relative")} style={styles}>
      {isEditing ? (
        <textarea
          className="w-full min-h-[100px] p-2 border rounded"
          value={content || "Add your text here"}
          onChange={(e) => onContentChange(e.target.value)}
          autoFocus
        />
      ) : (
        <p>{content || "Add your text here"}</p>
      )}
      {children}
    </div>
  ),

  Button: ({
    styles,
    content,
    isEditing,
    onContentChange,
    children,
  }: RenderableComponentProps) => (
    <div className="relative">
      <Button
        style={styles}
        className={cn("relative", isEditing && "pointer-events-none")}
      >
        {isEditing ? (
          <input
            type="text"
            className="absolute inset-0 bg-transparent text-center"
            value={content || "Button"}
            onChange={(e) => onContentChange(e.target.value)}
            autoFocus
          />
        ) : (
          content || "Button"
        )}
      </Button>
      {children}
    </div>
  ),

  Image: ({
    styles,
    content,
    isEditing,
    onContentChange,
    children,
  }: RenderableComponentProps) => (
    <div
      className={cn("relative", isEditing && "ring-2 ring-primary")}
      style={styles}
    >
      {content ? (
        <img
          src={content as string}
          alt="User uploaded"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full aspect-video bg-muted flex items-center justify-center">
          {isEditing ? (
            <Input
              type="url"
              placeholder="Enter image URL"
              className="max-w-xs mx-auto"
              onChange={(e) => onContentChange(e.target.value)}
              autoFocus
            />
          ) : (
            "Add image URL"
          )}
        </div>
      )}
      {children}
    </div>
  ),

  Grid: ({ styles, children }: RenderableComponentProps) => (
    <div
      className={cn(
        "grid gap-4 min-h-[100px]",
        styles.gridTemplateColumns ||
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      )}
      style={styles}
    >
      {children || (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          Drop components here to create a grid
        </div>
      )}
    </div>
  ),

  Section: ({ styles, children }: RenderableComponentProps) => (
    <section className="relative w-full min-h-[100px] py-12" style={styles}>
      {children || (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          Drop components here to create a section
        </div>
      )}
    </section>
  ),

  Input: ({ styles, children }: RenderableComponentProps) => (
    <div className="relative">
      <Input placeholder="Input field" style={styles} />
      {children}
    </div>
  ),

  List: ({
    styles,
    content,
    isEditing,
    onContentChange,
    children,
  }: RenderableComponentProps) => {
    const items = Array.isArray(content)
      ? content
      : ["Item 1", "Item 2", "Item 3"];

    return (
      <div className="relative" style={styles}>
        {isEditing ? (
          <textarea
            className="w-full min-h-[100px] p-2 border rounded"
            value={items.join("\n")}
            onChange={(e) => onContentChange(e.target.value.split("\n"))}
            placeholder="One item per line"
            autoFocus
          />
        ) : (
          <ul className="list-disc pl-4">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        {children}
      </div>
    );
  },
};

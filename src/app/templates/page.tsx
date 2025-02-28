import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TemplatesPage() {
  // Mock data - in a real app, this would come from an API
  const templates = [
    {
      id: 1,
      name: "Personal Portfolio",
      description:
        "A clean and modern portfolio template for showcasing your work",
      category: "Portfolio",
      image: "/templates/portfolio.jpg",
    },
    {
      id: 2,
      name: "Restaurant Website",
      description:
        "Perfect for restaurants, cafes, and food-related businesses",
      category: "Business",
      image: "/templates/restaurant.jpg",
    },
    {
      id: 3,
      name: "E-commerce Store",
      description:
        "A complete online store template with product listings and cart",
      category: "E-commerce",
      image: "/templates/ecommerce.jpg",
    },
    {
      id: 4,
      name: "Agency Landing Page",
      description:
        "Professional landing page for digital agencies and services",
      category: "Business",
      image: "/templates/agency.jpg",
    },
    {
      id: 5,
      name: "Blog",
      description:
        "Clean and minimal blog template for writers and content creators",
      category: "Blog",
      image: "/templates/blog.jpg",
    },
    {
      id: 6,
      name: "Event Landing Page",
      description: "Perfect for promoting events, conferences, and meetups",
      category: "Events",
      image: "/templates/event.jpg",
    },
  ];

  const categories = [
    "All",
    "Portfolio",
    "Business",
    "E-commerce",
    "Blog",
    "Events",
  ];

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
            <p className="text-muted-foreground mt-2">
              Choose a template to start your project
            </p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search templates..." className="pl-8" />
          </div>
        </div>

        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-muted" />
                {/* In a real app, replace with actual template preview images */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Preview Image
                </div>
              </div>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  Preview
                </Button>
                <Link href={`/builder/new?template=${template.id}`}>
                  <Button size="sm">Use Template</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

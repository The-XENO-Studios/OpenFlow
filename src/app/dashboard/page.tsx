import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Globe, Eye, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  // Mock data - in a real app, this would come from an API
  const stats = [
    { label: "Total Projects", value: "12" },
    { label: "Published Sites", value: "8" },
    { label: "Total Views", value: "2.4k" },
  ];

  const recentProjects = [
    { id: 1, name: "Personal Portfolio", status: "Published", views: 1234 },
    { id: 2, name: "Restaurant Website", status: "Draft", views: 0 },
    { id: 3, name: "E-commerce Store", status: "In Progress", views: 567 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Projects</h3>
        <div className="grid gap-4">
          {recentProjects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold">{project.name}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {project.status}
                    </span>
                    {project.status === "Published" && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="mr-1 h-4 w-4" />
                        {project.views} views
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.status === "Published" && (
                    <Button variant="outline" size="sm">
                      <Globe className="h-4 w-4" />
                      <span className="sr-only">View site</span>
                    </Button>
                  )}
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Edit project</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

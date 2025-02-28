import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectSettingsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Project Settings</h2>
        <p className="text-muted-foreground">
          Manage your project settings and configuration
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic settings for your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" placeholder="My Awesome Website" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="A brief description of your website"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable your website
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain">
          <Card>
            <CardHeader>
              <CardTitle>Domain Settings</CardTitle>
              <CardDescription>
                Configure your website&apos;s domain and SSL settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="domain">Custom Domain</Label>
                <Input id="domain" placeholder="www.example.com" />
                <p className="text-sm text-muted-foreground">
                  Enter your custom domain name
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SSL Certificate</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable HTTPS for your website
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your website for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  placeholder="Website Title | Brand Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Input
                  id="meta-description"
                  placeholder="A brief description of your website for search engines"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="website, business, portfolio"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Advanced configuration options for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="analytics">Google Analytics ID</Label>
                <Input id="analytics" placeholder="UA-XXXXXXXXX-X" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-code">Custom Code</Label>
                <Input
                  id="custom-code"
                  placeholder="<!-- Add your custom HTML/JavaScript here -->"
                />
                <p className="text-sm text-muted-foreground">
                  Add custom code to your website&apos;s header or footer
                </p>
              </div>
              <div className="pt-4">
                <Button variant="destructive">Delete Project</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

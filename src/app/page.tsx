import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layout, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-2xl">
              OpenFlow
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/features"
                className="text-sm font-medium hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="/templates"
                className="text-sm font-medium hover:text-primary"
              >
                Templates
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="/learn"
                className="text-sm font-medium hover:text-primary"
              >
                Learn
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Build websites visually,
              <br />
              without writing code
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-[600px]">
              Design and launch professional websites with our intuitive
              drag-and-drop builder. No coding required, and it&apos;s
              completely free.
            </p>
            <div className="flex gap-4">
              <Link href="/builder">
                <Button size="lg">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" size="lg">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything you need to create amazing websites
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Layout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visual Editor</h3>
                <p className="text-muted-foreground">
                  Drag and drop elements to design your website exactly how you
                  want it.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Code</h3>
                <p className="text-muted-foreground">
                  Add custom HTML, CSS, and JavaScript when you need more
                  control.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">One-Click Deploy</h3>
                <p className="text-muted-foreground">
                  Publish your website instantly with our built-in hosting
                  solution.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 OpenFlow. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

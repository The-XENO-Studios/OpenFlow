import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full">Sign In</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-center">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

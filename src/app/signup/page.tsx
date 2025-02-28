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

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details to get started with OpenFlow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name">Full Name</label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="confirm-password">Confirm Password</label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="w-full">Create Account</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
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

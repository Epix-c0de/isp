"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wifi, AlertCircle } from "lucide-react";

const initialState = {
    message: "",
    errors: undefined,
};

export default function LoginPage() {
    // @ts-ignore - straightforward usage of useActionState
    const [state, action, isPending] = useActionState(login, initialState);

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Wifi className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action} className="grid gap-4">
                        {state?.message && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            {state?.errors?.email && (
                                <p className="text-sm text-destructive">{state.errors.email}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                            {state?.errors?.password && (
                                <p className="text-sm text-destructive">{state.errors.password}</p>
                            )}
                        </div>

                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-muted-foreground">
                    Protected by Secure Session
                </CardFooter>
            </Card>
        </div>
    );
}

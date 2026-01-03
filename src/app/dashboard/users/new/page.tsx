"use client";

import { useActionState } from "react";
import { createUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const initialState = {
    message: "",
    errors: undefined,
};

export default function NewCustomerPage() {
    // @ts-ignore
    const [state, action, isPending] = useActionState(createUser, initialState);

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/users">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-lg font-semibold md:text-2xl">Add New Customer</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
                    <CardDescription>
                        Create a new customer account. They will receive an email with their login details.
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
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                required
                            />
                            {state?.errors?.name && (
                                <p className="text-sm text-destructive">{state.errors.name}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                            />
                            {state?.errors?.email && (
                                <p className="text-sm text-destructive">{state.errors.email}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="+254 7..."
                                required
                            />
                            {state?.errors?.phone && (
                                <p className="text-sm text-destructive">{state.errors.phone}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location / Building</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="Apartment B4, Street Name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Initial Password</Label>
                            <Input id="password" name="password" type="password" required minLength={6} />
                            {state?.errors?.password && (
                                <p className="text-sm text-destructive">{state.errors.password}</p>
                            )}
                        </div>

                        <Button className="w-full mt-4" type="submit" disabled={isPending}>
                            {isPending ? "Creating Account..." : "Create Customer Account"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

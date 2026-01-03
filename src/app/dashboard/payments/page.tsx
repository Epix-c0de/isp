import { db } from "@/db/drizzle";
import { payments, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function PaymentsPage() {
  const allPayments = await db
    .select({
      id: payments.id,
      amount: payments.amount,
      reference: payments.reference,
      status: payments.status,
      method: payments.method,
      createdAt: payments.createdAt,
      userName: users.name,
      userEmail: users.email,
    })
    .from(payments)
    .leftJoin(users, eq(payments.userId, users.id))
    .orderBy(desc(payments.createdAt));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Payments</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Link href="/dashboard/payments/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPayments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground h-24"
                  >
                    No payments recorded yet.
                  </TableCell>
                </TableRow>
              ) : (
                allPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="font-medium">{payment.userName || "Unknown"}</div>
                      <div className="text-xs text-muted-foreground">{payment.userEmail}</div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{payment.reference}</TableCell>
                    <TableCell className="capitalize">{payment.method}</TableCell>
                    <TableCell className="font-bold">
                      Ksh {payment.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "completed" ? "default" : "secondary"
                        }
                        className={payment.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.createdAt ? format(new Date(payment.createdAt), "PPP p") : "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

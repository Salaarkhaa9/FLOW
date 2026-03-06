import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  Send,
  Download,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const invoices = [
  {
    id: "INV-2024-001",
    customer: "ABC Freight Co.",
    load: "LD-12345",
    amount: 2450,
    status: "paid",
    dueDate: "Jan 20, 2024",
    paidDate: "Jan 18, 2024",
  },
  {
    id: "INV-2024-002",
    customer: "XYZ Logistics",
    load: "LD-12344",
    amount: 1850,
    status: "pending",
    dueDate: "Jan 25, 2024",
    paidDate: null,
  },
  {
    id: "INV-2024-003",
    customer: "FastShip Inc.",
    load: "LD-12343",
    amount: 980,
    status: "overdue",
    dueDate: "Jan 10, 2024",
    paidDate: null,
  },
  {
    id: "INV-2024-004",
    customer: "Metro Transport",
    load: "LD-12342",
    amount: 750,
    status: "draft",
    dueDate: "-",
    paidDate: null,
  },
  {
    id: "INV-2024-005",
    customer: "Prime Carriers",
    load: "LD-12341",
    amount: 3200,
    status: "paid",
    dueDate: "Jan 15, 2024",
    paidDate: "Jan 14, 2024",
  },
];

const statusConfig = {
  paid: { label: "Paid", variant: "default" as const, icon: CheckCircle2 },
  pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
  overdue: { label: "Overdue", variant: "destructive" as const, icon: AlertCircle },
  draft: { label: "Draft", variant: "outline" as const, icon: FileText },
};

const recentPayments = [
  { id: 1, from: "ABC Freight Co.", amount: 2450, type: "received", date: "Jan 18" },
  { id: 2, from: "Fuel Station #45", amount: -320, type: "sent", date: "Jan 17" },
  { id: 3, from: "Prime Carriers", amount: 3200, type: "received", date: "Jan 14" },
  { id: 4, from: "Insurance Co.", amount: -850, type: "sent", date: "Jan 12" },
];

export default function Payments() {
  return (
    <DashboardLayout title="Payments & Invoicing">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-chart-1" />
                </div>
                <div className="flex items-center gap-1 text-sm text-chart-1">
                  <ArrowUpRight className="h-4 w-4" />
                  +23%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">$124,500</p>
                <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                  +12%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">$18,450</p>
                <p className="text-sm text-muted-foreground">Outstanding</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">$2,830</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-chart-2" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoices */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>Manage your billing and payments</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Invoice
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="paid">Paid</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  </TabsList>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-9 w-48" />
                  </div>
                </div>

                <TabsContent value="all" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => {
                        const status = statusConfig[invoice.status as keyof typeof statusConfig];
                        const StatusIcon = status.icon;
                        return (
                          <TableRow key={invoice.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{invoice.id}</p>
                                <p className="text-xs text-muted-foreground">{invoice.load}</p>
                              </div>
                            </TableCell>
                            <TableCell>{invoice.customer}</TableCell>
                            <TableCell className="font-medium">
                              ${invoice.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={status.variant}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {status.label}
                              </Badge>
                            </TableCell>
                            <TableCell>{invoice.dueDate}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                  <DropdownMenuItem>Download PDF</DropdownMenuItem>
                                  <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          payment.type === "received" ? "bg-chart-1/10" : "bg-destructive/10"
                        }`}
                      >
                        {payment.type === "received" ? (
                          <ArrowDownRight className="h-5 w-5 text-chart-1" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{payment.from}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                      <span
                        className={`font-semibold ${
                          payment.type === "received" ? "text-chart-1" : "text-destructive"
                        }`}
                      >
                        {payment.type === "received" ? "+" : ""}${Math.abs(payment.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Collected this month</span>
                      <span className="font-medium">$106,050 / $124,500</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminders
                    </Button>
                    <Button className="w-full">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Record Payment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

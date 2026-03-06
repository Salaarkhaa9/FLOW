import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  Fuel,
  Wrench,
  FileText,
  Plus,
  Download,
  Search,
  DollarSign,
  TrendingDown,
  Receipt,
  MapPin,
  MoreHorizontal,
  Calendar,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const expenses = [
  {
    id: 1,
    description: "Diesel Fuel - Shell Station",
    category: "fuel",
    amount: 324.50,
    gallons: 85.4,
    vehicle: "TRK-001",
    driver: "John Smith",
    date: "Jan 18, 2024",
    state: "TX",
  },
  {
    id: 2,
    description: "Tire Replacement",
    category: "maintenance",
    amount: 1250.00,
    gallons: null,
    vehicle: "TRK-003",
    driver: "Mike Johnson",
    date: "Jan 17, 2024",
    state: "AZ",
  },
  {
    id: 3,
    description: "Diesel Fuel - Pilot",
    category: "fuel",
    amount: 298.75,
    gallons: 78.6,
    vehicle: "TRK-005",
    driver: "Sarah Wilson",
    date: "Jan 16, 2024",
    state: "WA",
  },
  {
    id: 4,
    description: "Oil Change & Service",
    category: "maintenance",
    amount: 450.00,
    gallons: null,
    vehicle: "TRK-001",
    driver: "John Smith",
    date: "Jan 15, 2024",
    state: "IL",
  },
  {
    id: 5,
    description: "Diesel Fuel - TA Travel Center",
    category: "fuel",
    amount: 412.30,
    gallons: 108.5,
    vehicle: "TRK-007",
    driver: "Tom Davis",
    date: "Jan 14, 2024",
    state: "OH",
  },
];

const categoryConfig = {
  fuel: { label: "Fuel", icon: Fuel, color: "text-chart-2" },
  maintenance: { label: "Maintenance", icon: Wrench, color: "text-chart-3" },
  toll: { label: "Tolls", icon: Receipt, color: "text-chart-4" },
  other: { label: "Other", icon: FileText, color: "text-muted-foreground" },
};

const iftaData = [
  { state: "TX", miles: 2450, gallons: 320, tax: 64.00 },
  { state: "OK", miles: 890, gallons: 116, tax: 18.56 },
  { state: "KS", miles: 420, gallons: 55, tax: 13.20 },
  { state: "MO", miles: 650, gallons: 85, tax: 14.45 },
  { state: "IL", miles: 380, gallons: 50, tax: 19.50 },
];

export default function Expenses() {
  return (
    <DashboardLayout title="Expenses & IFTA">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <TrendingDown className="h-4 w-4" />
                  +8%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">$18,450</p>
                <p className="text-sm text-muted-foreground">Total Expenses (MTD)</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Fuel className="h-6 w-6 text-chart-2" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">$12,340</p>
                <p className="text-sm text-muted-foreground">Fuel Costs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-chart-3" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">$4,850</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">$129.71</p>
                <p className="text-sm text-muted-foreground">IFTA Tax Due</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="expenses">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="ifta">IFTA Reporting</TabsTrigger>
            <TabsTrigger value="fuel">Fuel Log</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div>
                    <CardTitle>Expense Transactions</CardTitle>
                    <CardDescription>Track and manage all expenses</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search expenses..." className="pl-9" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="fuel">Fuel</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="toll">Tolls</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="january">
                    <SelectTrigger className="w-40">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January 2024</SelectItem>
                      <SelectItem value="december">December 2023</SelectItem>
                      <SelectItem value="november">November 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => {
                      const category = categoryConfig[expense.category as keyof typeof categoryConfig];
                      const CategoryIcon = category.icon;
                      return (
                        <TableRow key={expense.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{expense.description}</p>
                              <p className="text-xs text-muted-foreground">{expense.date}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              <CategoryIcon className={`h-3 w-3 mr-1 ${category.color}`} />
                              {category.label}
                            </Badge>
                          </TableCell>
                          <TableCell>{expense.vehicle}</TableCell>
                          <TableCell>{expense.driver}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{expense.state}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${expense.amount.toFixed(2)}
                            {expense.gallons && (
                              <p className="text-xs text-muted-foreground">
                                {expense.gallons} gal
                              </p>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Receipt</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ifta" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>IFTA Summary by State</CardTitle>
                  <CardDescription>Q1 2024 - Interstate Fuel Tax Report</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>State</TableHead>
                        <TableHead className="text-right">Miles</TableHead>
                        <TableHead className="text-right">Gallons</TableHead>
                        <TableHead className="text-right">MPG</TableHead>
                        <TableHead className="text-right">Tax Due</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {iftaData.map((row) => (
                        <TableRow key={row.state}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{row.state}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{row.miles.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{row.gallons}</TableCell>
                          <TableCell className="text-right">
                            {(row.miles / row.gallons).toFixed(1)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${row.tax.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-accent/50">
                        <TableCell className="font-semibold">Total</TableCell>
                        <TableCell className="text-right font-semibold">
                          {iftaData.reduce((sum, r) => sum + r.miles, 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {iftaData.reduce((sum, r) => sum + r.gallons, 0)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {(
                            iftaData.reduce((sum, r) => sum + r.miles, 0) /
                            iftaData.reduce((sum, r) => sum + r.gallons, 0)
                          ).toFixed(1)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${iftaData.reduce((sum, r) => sum + r.tax, 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filing Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Data Completeness</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <span className="text-sm">Quarter</span>
                      <Badge>Q1 2024</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <span className="text-sm">Due Date</span>
                      <span className="font-medium">Apr 30, 2024</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <span className="text-sm">Estimated Tax</span>
                      <span className="font-medium text-primary">$129.71</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate IFTA Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fuel" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Detailed fuel log view</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  Package,
  Clock,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const kpis = [
  {
    title: "Total Revenue",
    value: "$485,200",
    change: "+23.5%",
    trend: "up",
    period: "vs last month",
  },
  {
    title: "Total Loads",
    value: "342",
    change: "+18%",
    trend: "up",
    period: "vs last month",
  },
  {
    title: "Avg Revenue/Load",
    value: "$1,419",
    change: "+4.6%",
    trend: "up",
    period: "vs last month",
  },
  {
    title: "On-Time Delivery",
    value: "96.2%",
    change: "-1.2%",
    trend: "down",
    period: "vs last month",
  },
];

const revenueByLane = [
  { lane: "Chicago → Dallas", revenue: 45200, loads: 32, percentage: 25 },
  { lane: "LA → Phoenix", revenue: 38500, loads: 28, percentage: 21 },
  { lane: "NYC → Boston", revenue: 32100, loads: 45, percentage: 18 },
  { lane: "Seattle → Portland", revenue: 28400, loads: 38, percentage: 16 },
  { lane: "Miami → Atlanta", revenue: 24800, loads: 22, percentage: 14 },
];

const fleetPerformance = [
  { truck: "TRK-001", driver: "John Smith", loads: 28, revenue: 42000, utilization: 92 },
  { truck: "TRK-003", driver: "Mike Johnson", loads: 24, revenue: 36000, utilization: 85 },
  { truck: "TRK-005", driver: "Sarah Wilson", loads: 26, revenue: 39000, utilization: 88 },
  { truck: "TRK-007", driver: "Tom Davis", loads: 22, revenue: 33000, utilization: 78 },
];

const monthlyData = [
  { month: "Jan", revenue: 124500, loads: 85 },
  { month: "Feb", revenue: 132000, loads: 92 },
  { month: "Mar", revenue: 118000, loads: 78 },
  { month: "Apr", revenue: 145000, loads: 98 },
  { month: "May", revenue: 156000, loads: 105 },
  { month: "Jun", revenue: 148000, loads: 99 },
];

export default function Analytics() {
  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h2 className="text-2xl font-bold">Performance Overview</h2>
            <p className="text-muted-foreground">Track your business metrics and KPIs</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{kpi.title}</span>
                  <Badge
                    variant={kpi.trend === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {kpi.change}
                  </Badge>
                </div>
                <p className="text-3xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.period}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="revenue">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="fleet">Fleet Performance</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end gap-2">
                    {monthlyData.map((data, i) => (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                          style={{
                            height: `${(data.revenue / 160000) * 200}px`,
                          }}
                        />
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Lanes */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Revenue Lanes</CardTitle>
                  <CardDescription>Best performing routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueByLane.map((lane, i) => (
                      <div key={lane.lane}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">{lane.lane}</p>
                            <p className="text-xs text-muted-foreground">{lane.loads} loads</p>
                          </div>
                          <span className="font-semibold">${lane.revenue.toLocaleString()}</span>
                        </div>
                        <Progress value={lane.percentage * 4} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">$485.2K</p>
                    <p className="text-sm text-muted-foreground">Gross Revenue</p>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <TrendingDown className="h-8 w-8 mx-auto text-destructive mb-2" />
                    <p className="text-2xl font-bold">$142.5K</p>
                    <p className="text-sm text-muted-foreground">Operating Costs</p>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto text-chart-1 mb-2" />
                    <p className="text-2xl font-bold">$342.7K</p>
                    <p className="text-sm text-muted-foreground">Net Revenue</p>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <BarChart3 className="h-8 w-8 mx-auto text-chart-2 mb-2" />
                    <p className="text-2xl font-bold">70.6%</p>
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fleet" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Performance</CardTitle>
                <CardDescription>Individual truck and driver metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {fleetPerformance.map((truck) => (
                    <Card key={truck.truck} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Truck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{truck.truck}</p>
                            <p className="text-xs text-muted-foreground">{truck.driver}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Loads</span>
                            <span className="font-medium">{truck.loads}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Revenue</span>
                            <span className="font-medium">${truck.revenue.toLocaleString()}</span>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Utilization</span>
                              <span className="font-medium">{truck.utilization}%</span>
                            </div>
                            <Progress value={truck.utilization} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Load Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        <span>Total Loads</span>
                      </div>
                      <span className="text-2xl font-bold">342</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-chart-1" />
                        <span>On-Time</span>
                      </div>
                      <span className="text-2xl font-bold">329</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-destructive" />
                        <span>Delayed</span>
                      </div>
                      <span className="text-2xl font-bold">13</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Avg Delivery Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold text-primary">18.5</p>
                    <p className="text-muted-foreground">hours per load</p>
                    <Badge variant="default" className="mt-2">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      2.3 hrs faster
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold text-chart-1">4.8</p>
                    <p className="text-muted-foreground">out of 5.0</p>
                    <div className="flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${star <= 4 ? "text-chart-4" : "text-muted"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

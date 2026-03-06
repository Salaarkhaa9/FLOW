import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const stats = [
  {
    title: "Active Loads",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Fleet Utilization",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: Truck,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Revenue (MTD)",
    value: "$124,500",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "On-Time Delivery",
    value: "96.2%",
    change: "-1.2%",
    trend: "down",
    icon: TrendingUp,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
];

const recentLoads = [
  {
    id: "LD-12345",
    origin: "Chicago, IL",
    destination: "Dallas, TX",
    status: "in-transit",
    driver: "John Smith",
    eta: "2h 30m",
    rate: "$2,450",
  },
  {
    id: "LD-12344",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    status: "loading",
    driver: "Mike Johnson",
    eta: "Starting",
    rate: "$1,850",
  },
  {
    id: "LD-12343",
    origin: "New York, NY",
    destination: "Boston, MA",
    status: "delivered",
    driver: "Sarah Wilson",
    eta: "Completed",
    rate: "$980",
  },
  {
    id: "LD-12342",
    origin: "Seattle, WA",
    destination: "Portland, OR",
    status: "pending",
    driver: "Unassigned",
    eta: "Awaiting",
    rate: "$750",
  },
];

const statusConfig = {
  "in-transit": { label: "In Transit", variant: "default" as const, icon: Truck },
  loading: { label: "Loading", variant: "secondary" as const, icon: Clock },
  delivered: { label: "Delivered", variant: "outline" as const, icon: CheckCircle2 },
  pending: { label: "Pending", variant: "destructive" as const, icon: AlertCircle },
};

const activeDrivers = [
  { name: "John Smith", location: "I-35, TX", load: "LD-12345", status: "driving" },
  { name: "Mike Johnson", location: "LAX Warehouse", load: "LD-12344", status: "loading" },
  { name: "Tom Davis", location: "I-95, NJ", load: "LD-12346", status: "driving" },
  { name: "Chris Lee", location: "Rest Stop, OH", load: "LD-12347", status: "break" },
];

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-primary" : "text-destructive"
                    }`}>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Loads */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Loads</CardTitle>
                <CardDescription>Your latest freight activity</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLoads.map((load) => {
                  const status = statusConfig[load.status];
                  const StatusIcon = status.icon;
                  return (
                    <div
                      key={load.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <StatusIcon className="h-5 w-5 text-accent-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{load.id}</span>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="truncate">
                            {load.origin} → {load.destination}
                          </span>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="font-medium">{load.rate}</p>
                        <p className="text-sm text-muted-foreground">{load.driver}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Track Shipment</DropdownMenuItem>
                          <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Active Drivers */}
          <Card>
            <CardHeader>
              <CardTitle>Active Drivers</CardTitle>
              <CardDescription>Currently on the road</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDrivers.map((driver, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
                        {driver.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                        driver.status === "driving" ? "bg-primary" :
                        driver.status === "loading" ? "bg-chart-4" : "bg-chart-5"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{driver.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{driver.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {driver.load}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Fleet Capacity</span>
                  <span className="font-medium">12/15 Active</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common operations and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                <Package className="h-6 w-6 text-primary" />
                <span>Post New Load</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                <Truck className="h-6 w-6 text-chart-2" />
                <span>Add Vehicle</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                <DollarSign className="h-6 w-6 text-chart-1" />
                <span>Create Invoice</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                <MapPin className="h-6 w-6 text-chart-3" />
                <span>Track Shipment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

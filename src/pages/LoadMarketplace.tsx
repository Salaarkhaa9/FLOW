import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Search,
  Filter,
  Plus,
  MapPin,
  Calendar,
  Truck,
  DollarSign,
  Clock,
  Star,
  Heart,
  MoreVertical,
  ArrowRight,
  Snowflake,
  AlertTriangle,
  Zap,
  X,
  Phone,
  Mail,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Load {
  id: string;
  origin: {
    city: string;
    state: string;
    date: string;
    time: string;
  };
  destination: {
    city: string;
    state: string;
    date: string;
    time: string;
  };
  equipment: string;
  weight: string;
  distance: string;
  rate: number;
  ratePerMile: number;
  status: "available" | "booked" | "in-transit" | "completed";
  special: {
    tempControl?: boolean;
    hazmat?: boolean;
    expedited?: boolean;
  };
  postedBy: string;
  trustScore: number;
  postedAgo: string;
}

const sampleLoads: Load[] = [
  {
    id: "LD-45123",
    origin: { city: "Chicago", state: "IL", date: "Jan 21", time: "08:00 AM" },
    destination: { city: "Dallas", state: "TX", date: "Jan 22", time: "06:00 PM" },
    equipment: "Dry Van",
    weight: "42,000 lbs",
    distance: "920 mi",
    rate: 2450,
    ratePerMile: 2.66,
    status: "available",
    special: {},
    postedBy: "ABC Freight",
    trustScore: 4.8,
    postedAgo: "15 min ago",
  },
  {
    id: "LD-45124",
    origin: { city: "Los Angeles", state: "CA", date: "Jan 21", time: "10:00 AM" },
    destination: { city: "Phoenix", state: "AZ", date: "Jan 21", time: "08:00 PM" },
    equipment: "Reefer",
    weight: "38,500 lbs",
    distance: "372 mi",
    rate: 1850,
    ratePerMile: 4.97,
    status: "available",
    special: { tempControl: true },
    postedBy: "Fresh Foods Inc",
    trustScore: 4.9,
    postedAgo: "32 min ago",
  },
  {
    id: "LD-45125",
    origin: { city: "Houston", state: "TX", date: "Jan 22", time: "06:00 AM" },
    destination: { city: "Atlanta", state: "GA", date: "Jan 23", time: "04:00 PM" },
    equipment: "Flatbed",
    weight: "45,000 lbs",
    distance: "789 mi",
    rate: 3200,
    ratePerMile: 4.06,
    status: "available",
    special: { hazmat: true },
    postedBy: "Industrial Movers",
    trustScore: 4.5,
    postedAgo: "1 hour ago",
  },
  {
    id: "LD-45126",
    origin: { city: "New York", state: "NY", date: "Jan 21", time: "12:00 PM" },
    destination: { city: "Boston", state: "MA", date: "Jan 21", time: "06:00 PM" },
    equipment: "Dry Van",
    weight: "28,000 lbs",
    distance: "215 mi",
    rate: 980,
    ratePerMile: 4.56,
    status: "booked",
    special: { expedited: true },
    postedBy: "Quick Ship Co",
    trustScore: 4.7,
    postedAgo: "2 hours ago",
  },
  {
    id: "LD-45127",
    origin: { city: "Seattle", state: "WA", date: "Jan 23", time: "09:00 AM" },
    destination: { city: "Portland", state: "OR", date: "Jan 23", time: "03:00 PM" },
    equipment: "Reefer",
    weight: "35,000 lbs",
    distance: "174 mi",
    rate: 750,
    ratePerMile: 4.31,
    status: "available",
    special: { tempControl: true },
    postedBy: "Pacific Seafood",
    trustScore: 4.6,
    postedAgo: "3 hours ago",
  },
  {
    id: "LD-45128",
    origin: { city: "Denver", state: "CO", date: "Jan 24", time: "07:00 AM" },
    destination: { city: "Kansas City", state: "MO", date: "Jan 24", time: "07:00 PM" },
    equipment: "Dry Van",
    weight: "40,000 lbs",
    distance: "603 mi",
    rate: 1650,
    ratePerMile: 2.74,
    status: "available",
    special: {},
    postedBy: "Midwest Logistics",
    trustScore: 4.4,
    postedAgo: "4 hours ago",
  },
];

const statusStyles = {
  available: "bg-primary/10 text-primary border-primary/20",
  booked: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  "in-transit": "bg-chart-2/10 text-chart-2 border-chart-2/20",
  completed: "bg-chart-5/10 text-chart-5 border-chart-5/20",
};

interface LoadDetailsPanel {
  load: Load;
  onClose: () => void;
}

function LoadDetailsPanel({ load, onClose }: LoadDetailsPanel) {
  return (
    <Sheet open={!!load} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[500px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">{load.id}</SheetTitle>
            <Badge variant="outline" className={statusStyles[load.status]}>
              {load.status.charAt(0).toUpperCase() + load.status.slice(1)}
            </Badge>
          </div>
          <SheetDescription>
            Posted by {load.postedBy} • {load.postedAgo}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Route Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Route</h3>
            <div className="space-y-2 p-3 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="font-medium">{load.origin.city}, {load.origin.state}</p>
                  <p className="text-sm text-muted-foreground">{load.origin.date} • {load.origin.time}</p>
                </div>
              </div>
              <div className="flex justify-center py-2">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-chart-3 mt-1.5" />
                <div>
                  <p className="font-medium">{load.destination.city}, {load.destination.state}</p>
                  <p className="text-sm text-muted-foreground">{load.destination.date} • {load.destination.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Recommendations */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Driver Recommendations</h3>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">Houston, TX</p>
                    <p className="text-xs text-muted-foreground">THU 4/15 09:30 CDT</p>
                  </div>
                  <Badge variant="outline" className="bg-chart-5/10 text-chart-5 border-chart-5/20">3 matches</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Load Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Load Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Equipment</p>
                <p className="font-medium text-sm">{load.equipment}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Distance</p>
                <p className="font-medium text-sm">{load.distance}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Weight</p>
                <p className="font-medium text-sm">{load.weight}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Rate</p>
                <p className="font-medium text-sm">${load.rate.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          {(load.special.tempControl || load.special.hazmat || load.special.expedited) && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Special Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {load.special.tempControl && (
                  <Badge variant="outline" className="gap-1 bg-chart-3/10 text-chart-3 border-chart-3/20">
                    <Snowflake className="h-3 w-3" />
                    Temp Control
                  </Badge>
                )}
                {load.special.hazmat && (
                  <Badge variant="outline" className="gap-1 bg-destructive/10 text-destructive border-destructive/20">
                    <AlertTriangle className="h-3 w-3" />
                    Hazmat
                  </Badge>
                )}
                {load.special.expedited && (
                  <Badge variant="outline" className="gap-1 bg-chart-4/10 text-chart-4 border-chart-4/20">
                    <Zap className="h-3 w-3" />
                    Expedited
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Shipper Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Shipper Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{load.postedBy}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-chart-4 text-chart-4" />
                      {load.trustScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <Separator />
          <div className="space-y-2">
            {load.status === "available" && (
              <Button className="w-full gap-2" size="lg">
                <Check className="h-4 w-4" />
                Request Booking
              </Button>
            )}
            <Button variant="outline" className="w-full gap-2">
              <Mail className="h-4 w-4" />
              Contact Shipper
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Heart className="h-4 w-4" />
              Save Load
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function LoadsTable({ loads, onLoadSelect }: { loads: Load[]; onLoadSelect: (load: Load) => void }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-24">Load ID</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Equipment</TableHead>
            <TableHead className="text-right">Distance</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="w-20">Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loads.map((load) => (
            <TableRow
              key={load.id}
              onClick={() => onLoadSelect(load)}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-semibold">{load.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-sm">{load.origin.city}, {load.origin.state}</p>
                  <p className="text-xs text-muted-foreground">{load.origin.date} {load.origin.time}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-sm">{load.destination.city}, {load.destination.state}</p>
                  <p className="text-xs text-muted-foreground">{load.destination.date} {load.destination.time}</p>
                </div>
              </TableCell>
              <TableCell>{load.equipment}</TableCell>
              <TableCell className="text-right">{load.distance}</TableCell>
              <TableCell className="text-right font-semibold">${load.rate.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyles[load.status]}>
                  {load.status.charAt(0).toUpperCase() + load.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function LoadMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  return (
    <DashboardLayout title="Load Marketplace">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by origin, destination, or load ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Post Load
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Post New Load</DialogTitle>
                  <DialogDescription>
                    Enter the shipment details to post a new load to the marketplace.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Origin City</Label>
                      <Input placeholder="Enter origin city" />
                    </div>
                    <div className="space-y-2">
                      <Label>Origin State</Label>
                      <Input placeholder="State" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Destination City</Label>
                      <Input placeholder="Enter destination city" />
                    </div>
                    <div className="space-y-2">
                      <Label>Destination State</Label>
                      <Input placeholder="State" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Pickup Date & Time</Label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label>Delivery Date & Time</Label>
                      <Input type="datetime-local" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Equipment Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dryvan">Dry Van</SelectItem>
                          <SelectItem value="reefer">Reefer</SelectItem>
                          <SelectItem value="flatbed">Flatbed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Weight (lbs)</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Rate ($)</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Special Requirements</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox id="temp" />
                        <Label htmlFor="temp" className="font-normal">Temperature Control</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="hazmat" />
                        <Label htmlFor="hazmat" className="font-normal">Hazmat</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="expedited" />
                        <Label htmlFor="expedited" className="font-normal">Expedited</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>Post Load</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Equipment</SelectItem>
              <SelectItem value="dryvan">Dry Van</SelectItem>
              <SelectItem value="reefer">Reefer</SelectItem>
              <SelectItem value="flatbed">Flatbed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rate-high">Highest Rate</SelectItem>
              <SelectItem value="rate-low">Lowest Rate</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Package className="h-4 w-4" />
              All Loads
              <Badge variant="secondary" className="ml-1">
                {sampleLoads.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="my-loads" className="gap-2">
              My Loads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <LoadsTable loads={sampleLoads} onLoadSelect={setSelectedLoad} />
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No saved loads yet</h3>
                <p className="text-muted-foreground">
                  Click the heart icon on any load to save it for later.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-loads" className="mt-6">
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No loads posted</h3>
                <p className="text-muted-foreground mb-4">
                  Start by posting your first load to the marketplace.
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Load
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Side Panel for Load Details */}
        {selectedLoad && (
          <LoadDetailsPanel load={selectedLoad} onClose={() => setSelectedLoad(null)} />
        )}
      </div>
    </DashboardLayout>
  );
}

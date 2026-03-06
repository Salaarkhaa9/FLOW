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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Truck,
  Search,
  Plus,
  MapPin,
  Calendar,
  User,
  Wrench,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  FileText,
  Settings,
  Fuel,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Vehicle {
  id: string;
  unitId: string;
  plate: string;
  state: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  type: "truck" | "trailer";
  category?: string;
  status: "active" | "maintenance" | "inactive";
  driver?: string;
  location: string;
  mileage: number;
  nextService: string;
  fuelLevel: number;
  gpsStatus: "online" | "offline";
}

const vehicles: Vehicle[] = [
  {
    id: "TRK-001",
    unitId: "T-1001",
    plate: "ABC-1234",
    state: "TX",
    vin: "1HGBH41JXMN109186",
    make: "Freightliner",
    model: "Cascadia",
    year: 2022,
    type: "truck",
    status: "active",
    driver: "John Smith",
    location: "I-35, Dallas TX",
    mileage: 145000,
    nextService: "Feb 15, 2024",
    fuelLevel: 78,
    gpsStatus: "online",
  },
  {
    id: "TRK-002",
    unitId: "T-1002",
    plate: "XYZ-5678",
    state: "CA",
    vin: "2HGBH41JXMN109187",
    make: "Peterbilt",
    model: "579",
    year: 2021,
    type: "truck",
    status: "active",
    driver: "Mike Johnson",
    location: "LAX Warehouse",
    mileage: 189000,
    nextService: "Jan 28, 2024",
    fuelLevel: 45,
    gpsStatus: "online",
  },
  {
    id: "TRK-003",
    unitId: "T-1003",
    plate: "DEF-9012",
    state: "IL",
    vin: "3HGBH41JXMN109188",
    make: "Kenworth",
    model: "T680",
    year: 2023,
    type: "truck",
    status: "maintenance",
    location: "Shop - Chicago",
    mileage: 52000,
    nextService: "In Progress",
    fuelLevel: 30,
    gpsStatus: "offline",
  },
  {
    id: "TRL-001",
    unitId: "R-2001",
    plate: "TRL-1111",
    state: "TX",
    vin: "4HGBH41JXMN109189",
    make: "Great Dane",
    model: "Champion",
    year: 2022,
    type: "trailer",
    category: "Reefer",
    status: "active",
    location: "Attached: T-1001",
    mileage: 98000,
    nextService: "Mar 1, 2024",
    fuelLevel: 0,
    gpsStatus: "online",
  },
  {
    id: "TRL-002",
    unitId: "R-2002",
    plate: "TRL-2222",
    state: "CA",
    vin: "5HGBH41JXMN109190",
    make: "Wabash",
    model: "DuraPlate",
    year: 2020,
    type: "trailer",
    category: "Dry Van",
    status: "inactive",
    location: "Yard - Phoenix",
    mileage: 156000,
    nextService: "Overdue",
    fuelLevel: 0,
    gpsStatus: "offline",
  },
];

const statusStyles = {
  active: { bg: "bg-primary/10", text: "text-primary", label: "Active" },
  maintenance: { bg: "bg-chart-4/10", text: "text-chart-4", label: "Maintenance" },
  inactive: { bg: "bg-secondary/50", text: "text-secondary-foreground", label: "Inactive" },
};

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const status = statusStyles[vehicle.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${status.bg} flex items-center justify-center`}>
              <Truck className={`h-6 w-6 ${status.text}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{vehicle.unitId}</span>
                <Badge variant="outline" className={`${status.bg} ${status.text} border-0`}>
                  {status.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                View Documents
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Wrench className="h-4 w-4 mr-2" />
                Maintenance Log
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Deactivate Vehicle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Location
            </div>
            <p className="text-sm font-medium">{vehicle.location}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Next Service
            </div>
            <p className={`text-sm font-medium ${
              vehicle.nextService === "Overdue" ? "text-destructive" : ""
            }`}>
              {vehicle.nextService}
            </p>
          </div>
        </div>

        {vehicle.driver && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-background rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                {vehicle.driver.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{vehicle.driver}</p>
              <p className="text-xs text-muted-foreground">Assigned Driver</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between p-2 bg-background rounded-lg">
            <span className="text-muted-foreground">Mileage</span>
            <span className="font-medium">{vehicle.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-background rounded-lg">
            <span className="text-muted-foreground">GPS</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                vehicle.gpsStatus === "online" ? "bg-primary" : "bg-muted"
              }`} />
              <span className="font-medium capitalize">{vehicle.gpsStatus}</span>
            </div>
          </div>
        </div>

        {vehicle.type === "truck" && vehicle.fuelLevel > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Fuel className="h-3.5 w-3.5" />
                Fuel Level
              </div>
              <span className="text-sm font-medium">{vehicle.fuelLevel}%</span>
            </div>
            <Progress value={vehicle.fuelLevel} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function FleetManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const trucks = vehicles.filter(v => v.type === "truck");
  const trailers = vehicles.filter(v => v.type === "trailer");
  const activeCount = vehicles.filter(v => v.status === "active").length;
  const maintenanceCount = vehicles.filter(v => v.status === "maintenance").length;

  return (
    <DashboardLayout title="Fleet Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vehicles.length}</p>
                <p className="text-sm text-muted-foreground">Total Assets</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{maintenanceCount}</p>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Utilization</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by unit ID, VIN, or plate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>
                  Enter the vehicle details to add it to your fleet registry.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="trailer">Trailer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Internal Unit ID</Label>
                    <Input placeholder="e.g., T-1001" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>License Plate</Label>
                    <Input placeholder="ABC-1234" />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration State</Label>
                    <Input placeholder="TX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>VIN (Vehicle Identification Number)</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter 17-character VIN" className="flex-1" />
                    <Button variant="outline">Decode VIN</Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Make</Label>
                    <Input placeholder="Freightliner" />
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input placeholder="Cascadia" />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input type="number" placeholder="2024" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>GPS Device ID (Optional)</Label>
                  <Input placeholder="Enter tracking device serial number" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Save Vehicle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="trucks">
          <TabsList>
            <TabsTrigger value="trucks" className="gap-2">
              <Truck className="h-4 w-4" />
              Trucks
              <Badge variant="secondary" className="ml-1">{trucks.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="trailers" className="gap-2">
              Trailers
              <Badge variant="secondary" className="ml-1">{trailers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="trucks" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trucks.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trailers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trailers.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Plate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Mileage</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((v) => {
                      const status = statusStyles[v.status];
                      return (
                        <TableRow key={v.id}>
                          <TableCell className="font-medium">{v.unitId}</TableCell>
                          <TableCell className="capitalize">{v.type}</TableCell>
                          <TableCell>{v.year} {v.make} {v.model}</TableCell>
                          <TableCell>{v.plate} ({v.state})</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${status.bg} ${status.text} border-0`}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell>{v.driver || "-"}</TableCell>
                          <TableCell className="max-w-[150px] truncate">{v.location}</TableCell>
                          <TableCell className="text-right">{v.mileage.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

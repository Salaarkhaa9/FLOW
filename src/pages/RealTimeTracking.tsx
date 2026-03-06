import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Truck,
  Navigation,
  Clock,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Maximize2,
  Layers,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const activeShipments = [
  {
    id: "LD-12345",
    driver: "Ahmed Khan",
    truck: "TRK-001",
    origin: "Karachi",
    destination: "Lahore",
    status: "on-route",
    eta: "2h 30m",
    progress: 65,
    speed: "62 km/h",
    lastUpdate: "2 min ago",
    phone: "+92 (300) 123-4567",
    lat: 30.3753,
    lng: 69.3451,
  },
  {
    id: "LD-12346",
    driver: "Hassan Ali",
    truck: "TRK-003",
    origin: "Islamabad",
    destination: "Peshawar",
    status: "delayed",
    eta: "4h 15m",
    progress: 35,
    speed: "45 km/h",
    lastUpdate: "5 min ago",
    phone: "+92 (321) 234-5678",
    lat: 33.6844,
    lng: 73.0479,
  },
  {
    id: "LD-12347",
    driver: "Fatima Shah",
    truck: "TRK-005",
    origin: "Lahore",
    destination: "Faisalabad",
    status: "on-route",
    eta: "1h 45m",
    progress: 78,
    speed: "58 km/h",
    lastUpdate: "1 min ago",
    phone: "+92 (333) 345-6789",
    lat: 31.5204,
    lng: 74.3587,
  },
  {
    id: "LD-12348",
    driver: "Usman Malik",
    truck: "TRK-007",
    origin: "Multan",
    destination: "Karachi",
    status: "arriving",
    eta: "25 min",
    progress: 92,
    speed: "55 km/h",
    lastUpdate: "30 sec ago",
    phone: "+92 (345) 456-7890",
    lat: 24.8607,
    lng: 67.0011,
  },
];

const statusConfig = {
  "on-route": { label: "On Route", color: "bg-primary" },
  delayed: { label: "Delayed", color: "bg-destructive" },
  arriving: { label: "Arriving", color: "bg-chart-1" },
  stopped: { label: "Stopped", color: "bg-chart-4" },
};

export default function RealTimeTracking() {
  return (
    <DashboardLayout title="Real-Time Tracking">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Map Area */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <div>
              <CardTitle className="text-lg">Live Map</CardTitle>
              <CardDescription>Track all active shipments</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Layers className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <MapContainer
              center={[30.3753, 69.3451] as [number, number]}
              zoom={6}
              style={{ height: "100%", width: "100%", borderRadius: "0 0 0.5rem 0.5rem" }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {activeShipments.map((shipment) => {
                const status = statusConfig[shipment.status as keyof typeof statusConfig];
                
                // Color mapping for better visibility on map
                const markerColorMap: Record<string, string> = {
                  "on-route": "#2563eb", // Bright blue
                  delayed: "#dc2626", // Bright red
                  arriving: "#059669", // Bright green
                  stopped: "#f59e0b", // Amber
                };
                
                const markerColor = markerColorMap[shipment.status] || "#2563eb";
                
                const icon = L.divIcon({
                  html: `
                    <div class="flex items-center justify-center w-10 h-10 rounded-full shadow-lg border-2 border-white" style="background-color: ${markerColor};">
                      <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9h12m0 0l-3-3m3 3l-3 3M6 15h12m0 0l-3 3m3-3l-3-3"/>
                      </svg>
                    </div>
                  `,
                  className: "custom-marker",
                  iconSize: [40, 40],
                  iconAnchor: [20, 20],
                });

                return (
                  <Marker key={shipment.id} position={[shipment.lat, shipment.lng] as [number, number]} icon={icon as any}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">{shipment.id}</p>
                        <p>{shipment.driver} • {shipment.truck}</p>
                        <p className="text-xs text-muted-foreground">
                          {shipment.origin} → {shipment.destination}
                        </p>
                        <p className="text-xs">Speed: {shipment.speed}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </CardContent>
        </Card>

        {/* Shipment List */}
        <Card className="flex flex-col">
          <CardHeader className="py-3">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-lg">Active Shipments</CardTitle>
              <Badge variant="secondary">{activeShipments.length}</Badge>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 h-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-24 h-9">
                  <Filter className="h-4 w-4 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="on-route">On Route</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="arriving">Arriving</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100vh-22rem)]">
              <div className="space-y-3 p-4 pt-0">
                {activeShipments.map((shipment) => {
                  const status = statusConfig[shipment.status as keyof typeof statusConfig];
                  return (
                    <div
                      key={shipment.id}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{shipment.id}</span>
                          <Badge
                            variant="outline"
                            className={`${status.color} bg-opacity-10 border-none`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${status.color} mr-1.5`} />
                            {status.label}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {shipment.lastUpdate}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span>{shipment.driver}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{shipment.truck}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Navigation className="h-4 w-4" />
                          <span className="truncate">{shipment.origin} → {shipment.destination}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>ETA: {shipment.eta}</span>
                          </div>
                          <span className="text-muted-foreground">{shipment.speed}</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                          <div
                            className={`h-full ${status.color} transition-all`}
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Quick actions */}
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="h-3.5 w-3.5 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

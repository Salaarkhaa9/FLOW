import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  UserPlus,
  Search,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Shield,
  Truck,
  Headphones,
  Briefcase,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@swiftlogistics.com",
    phone: "+1 (555) 123-4567",
    role: "driver",
    status: "active",
    location: "Dallas, TX",
    joinDate: "Jan 2023",
    loads: 156,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@swiftlogistics.com",
    phone: "+1 (555) 234-5678",
    role: "dispatcher",
    status: "active",
    location: "Chicago, IL",
    joinDate: "Mar 2022",
    loads: 423,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@swiftlogistics.com",
    phone: "+1 (555) 345-6789",
    role: "driver",
    status: "on-leave",
    location: "Phoenix, AZ",
    joinDate: "Aug 2023",
    loads: 89,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@swiftlogistics.com",
    phone: "+1 (555) 456-7890",
    role: "admin",
    status: "active",
    location: "Los Angeles, CA",
    joinDate: "Dec 2021",
    loads: 0,
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom.brown@swiftlogistics.com",
    phone: "+1 (555) 567-8901",
    role: "driver",
    status: "active",
    location: "Seattle, WA",
    joinDate: "Jun 2023",
    loads: 67,
  },
  {
    id: 6,
    name: "Lisa Martinez",
    email: "lisa.martinez@swiftlogistics.com",
    phone: "+1 (555) 678-9012",
    role: "dispatcher",
    status: "active",
    location: "Miami, FL",
    joinDate: "Sep 2022",
    loads: 312,
  },
];

const roleConfig = {
  driver: { label: "Driver", icon: Truck, color: "text-primary" },
  dispatcher: { label: "Dispatcher", icon: Headphones, color: "text-chart-2" },
  admin: { label: "Admin", icon: Shield, color: "text-chart-3" },
  manager: { label: "Manager", icon: Briefcase, color: "text-chart-4" },
};

const statusConfig = {
  active: { label: "Active", variant: "default" as const },
  "on-leave": { label: "On Leave", variant: "secondary" as const },
  inactive: { label: "Inactive", variant: "outline" as const },
};

export default function TeamMembers() {
  return (
    <DashboardLayout title="Team Members">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-9" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
                <DialogDescription>
                  Invite a new member to join your team.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="john.doe@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="dispatcher">Dispatcher</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {teamMembers.filter((m) => m.role === "driver").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Drivers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {teamMembers.filter((m) => m.status === "active").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Now</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {teamMembers.filter((m) => m.role === "dispatcher").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Dispatchers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team List */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="dispatchers">Dispatchers</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => {
                const role = roleConfig[member.role as keyof typeof roleConfig];
                const status = statusConfig[member.status as keyof typeof statusConfig];
                const RoleIcon = role.icon;
                return (
                  <Card key={member.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <div className="flex items-center gap-1.5">
                              <RoleIcon className={`h-3.5 w-3.5 ${role.color}`} />
                              <span className="text-sm text-muted-foreground">
                                {role.label}
                              </span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>Assign Load</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{member.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <Badge variant={status.variant}>{status.label}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Joined {member.joinDate}</span>
                        </div>
                      </div>

                      {member.role === "driver" && (
                        <div className="mt-3 p-3 bg-accent/50 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Completed Loads</span>
                            <span className="font-semibold">{member.loads}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="drivers" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers
                .filter((m) => m.role === "driver")
                .map((member) => {
                  const role = roleConfig[member.role as keyof typeof roleConfig];
                  const status = statusConfig[member.status as keyof typeof statusConfig];
                  const RoleIcon = role.icon;
                  return (
                    <Card key={member.id} className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {member.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{member.name}</h3>
                              <div className="flex items-center gap-1.5">
                                <RoleIcon className={`h-3.5 w-3.5 ${role.color}`} />
                                <span className="text-sm text-muted-foreground">
                                  {role.label}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <div className="p-3 bg-accent/50 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Completed Loads</span>
                            <span className="font-semibold">{member.loads}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="dispatchers" className="mt-4">
            <p className="text-muted-foreground">Dispatcher list view</p>
          </TabsContent>

          <TabsContent value="admins" className="mt-4">
            <p className="text-muted-foreground">Admin list view</p>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

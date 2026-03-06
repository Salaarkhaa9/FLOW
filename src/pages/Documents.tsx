import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  Search,
  Download,
  Eye,
  Trash2,
  FolderOpen,
  FileCheck,
  FileWarning,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const documents = [
  {
    id: 1,
    name: "BOL-12345.pdf",
    type: "Bill of Lading",
    load: "LD-12345",
    uploadedBy: "John Smith",
    uploadDate: "Jan 15, 2024",
    size: "245 KB",
    status: "verified",
  },
  {
    id: 2,
    name: "POD-12345.pdf",
    type: "Proof of Delivery",
    load: "LD-12345",
    uploadedBy: "John Smith",
    uploadDate: "Jan 16, 2024",
    size: "312 KB",
    status: "pending",
  },
  {
    id: 3,
    name: "Invoice-INV-2024-001.pdf",
    type: "Invoice",
    load: "LD-12343",
    uploadedBy: "Sarah Wilson",
    uploadDate: "Jan 14, 2024",
    size: "156 KB",
    status: "verified",
  },
  {
    id: 4,
    name: "RateConfirmation-RC-789.pdf",
    type: "Rate Confirmation",
    load: "LD-12342",
    uploadedBy: "Mike Johnson",
    uploadDate: "Jan 13, 2024",
    size: "89 KB",
    status: "verified",
  },
  {
    id: 5,
    name: "CDL-JohnSmith.pdf",
    type: "Driver License",
    load: "-",
    uploadedBy: "John Smith",
    uploadDate: "Dec 1, 2023",
    size: "1.2 MB",
    status: "expiring",
  },
  {
    id: 6,
    name: "Insurance-2024.pdf",
    type: "Insurance Certificate",
    load: "-",
    uploadedBy: "Emily Davis",
    uploadDate: "Jan 1, 2024",
    size: "456 KB",
    status: "verified",
  },
];

const statusConfig = {
  verified: { label: "Verified", variant: "default" as const, icon: FileCheck },
  pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
  expiring: { label: "Expiring Soon", variant: "destructive" as const, icon: FileWarning },
};

const folderStats = [
  { name: "All Documents", count: 156, icon: FolderOpen },
  { name: "Bills of Lading", count: 42, icon: FileText },
  { name: "Proof of Delivery", count: 38, icon: FileCheck },
  { name: "Invoices", count: 45, icon: FileText },
  { name: "Rate Confirmations", count: 31, icon: FileText },
];

export default function Documents() {
  return (
    <DashboardLayout title="Documents">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bol">Bill of Lading</SelectItem>
                <SelectItem value="pod">Proof of Delivery</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="rate">Rate Confirmation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Folder Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {folderStats.map((folder) => {
            const Icon = folder.icon;
            return (
              <Card
                key={folder.name}
                className="cursor-pointer hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{folder.count}</p>
                      <p className="text-xs text-muted-foreground truncate">{folder.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Documents Table */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="load">Load Documents</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Recent Documents</CardTitle>
                    <CardDescription>Manage and organize your documents</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Folder
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Load</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => {
                      const status = statusConfig[doc.status as keyof typeof statusConfig];
                      const StatusIcon = status.icon;
                      return (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">{doc.size}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>
                            {doc.load !== "-" ? (
                              <Badge variant="outline">{doc.load}</Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>{doc.uploadedBy}</TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>
                            <Badge variant={status.variant}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
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

          <TabsContent value="load" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Load-specific documents view</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Compliance documents view</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Financial documents view</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

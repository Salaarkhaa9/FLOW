import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Building2,
  Camera,
  Mail,
  Phone,
  MapPin,
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  Upload,
  Save,
  AlertCircle,
} from "lucide-react";

export default function Profile() {
  const [personalData, setPersonalData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@swiftlogistics.com",
    phone: "+1 (555) 123-4567",
  });

  const [businessData, setBusinessData] = useState({
    legalName: "Swift Logistics LLC",
    address: "123 Commerce Street, Suite 400",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    phone: "+1 (555) 987-6543",
    email: "contact@swiftlogistics.com",
    mcNumber: "MC-123456",
    dotNumber: "DOT-7890123",
    taxId: "12-3456789",
  });

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-2">
              <Building2 className="h-4 w-4" />
              Business
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          {/* Personal Profile */}
          <TabsContent value="personal" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        JS
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {personalData.firstName} {personalData.lastName}
                    </h3>
                    <p className="text-muted-foreground">Broker</p>
                    <Badge variant="outline" className="mt-2 gap-1 bg-primary/10 text-primary border-0">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Account
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={personalData.firstName}
                      onChange={(e) =>
                        setPersonalData({ ...personalData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={personalData.lastName}
                      onChange={(e) =>
                        setPersonalData({ ...personalData, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={personalData.email}
                        onChange={(e) =>
                          setPersonalData({ ...personalData, email: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={personalData.phone}
                        onChange={(e) =>
                          setPersonalData({ ...personalData, phone: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Profile */}
          <TabsContent value="business" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Manage your company details and regulatory information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="legalName">Business Legal Name</Label>
                    <Input
                      id="legalName"
                      value={businessData.legalName}
                      onChange={(e) =>
                        setBusinessData({ ...businessData, legalName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={businessData.address}
                        onChange={(e) =>
                          setBusinessData({ ...businessData, address: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={businessData.city}
                      onChange={(e) =>
                        setBusinessData({ ...businessData, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={businessData.state}
                        onChange={(e) =>
                          setBusinessData({ ...businessData, state: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={businessData.zip}
                        onChange={(e) =>
                          setBusinessData({ ...businessData, zip: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Business Phone</Label>
                    <Input
                      id="businessPhone"
                      value={businessData.phone}
                      onChange={(e) =>
                        setBusinessData({ ...businessData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Business Email</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={businessData.email}
                      onChange={(e) =>
                        setBusinessData({ ...businessData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Regulatory Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mc">MC Number</Label>
                    <Input
                      id="mc"
                      value={businessData.mcNumber}
                      onChange={(e) =>
                        setBusinessData({ ...businessData, mcNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dot">DOT Number</Label>
                    <Input
                      id="dot"
                      value={businessData.dotNumber}
                      onChange={(e) =>
                        setBusinessData({ ...businessData, dotNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax">Tax ID / EIN</Label>
                    <Input
                      id="tax"
                      value={businessData.taxId}
                      onChange={(e) =>
                        setBusinessData({ ...businessData, taxId: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Documents</CardTitle>
                <CardDescription>
                  Upload and manage your verification documents.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Document Items */}
                {[
                  {
                    name: "Business License",
                    status: "verified",
                    expiry: "Dec 31, 2025",
                    uploaded: "Jan 15, 2024",
                  },
                  {
                    name: "Insurance Certificate",
                    status: "verified",
                    expiry: "Jun 30, 2024",
                    uploaded: "Jan 10, 2024",
                  },
                  {
                    name: "W-9 Form",
                    status: "pending",
                    expiry: "-",
                    uploaded: "Jan 18, 2024",
                  },
                  {
                    name: "Operating Authority",
                    status: "required",
                    expiry: "-",
                    uploaded: "-",
                  },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      doc.status === "verified"
                        ? "bg-primary/10"
                        : doc.status === "pending"
                        ? "bg-chart-4/10"
                        : "bg-destructive/10"
                    }`}>
                      {doc.status === "verified" ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : doc.status === "pending" ? (
                        <Clock className="h-5 w-5 text-chart-4" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{doc.name}</span>
                        <Badge
                          variant="outline"
                          className={
                            doc.status === "verified"
                              ? "bg-primary/10 text-primary border-0"
                              : doc.status === "pending"
                              ? "bg-chart-4/10 text-chart-4 border-0"
                              : "bg-destructive/10 text-destructive border-0"
                          }
                        >
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {doc.expiry !== "-" && <span>Expires: {doc.expiry}</span>}
                        {doc.expiry !== "-" && doc.uploaded !== "-" && <span> • </span>}
                        {doc.uploaded !== "-" && <span>Uploaded: {doc.uploaded}</span>}
                        {doc.uploaded === "-" && <span>Not yet uploaded</span>}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      {doc.status === "required" ? "Upload" : "Replace"}
                    </Button>
                  </div>
                ))}

                <Button variant="outline" className="w-full gap-2 mt-4">
                  <Upload className="h-4 w-4" />
                  Upload New Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

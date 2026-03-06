import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Shield,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    author: "ABC Freight Co.",
    role: "Shipper",
    rating: 5,
    date: "Jan 15, 2024",
    content: "Excellent service! The load was delivered on time and in perfect condition. Communication was great throughout.",
    loadId: "LD-12345",
    helpful: 12,
  },
  {
    id: 2,
    author: "XYZ Logistics",
    role: "Broker",
    rating: 4,
    date: "Jan 12, 2024",
    content: "Good carrier to work with. Minor delay due to weather but kept us informed. Would use again.",
    loadId: "LD-12340",
    helpful: 8,
  },
  {
    id: 3,
    author: "FastShip Inc.",
    role: "Shipper",
    rating: 5,
    date: "Jan 10, 2024",
    content: "Professional team, great rates, and always reliable. Our go-to carrier for important shipments.",
    loadId: "LD-12338",
    helpful: 15,
  },
  {
    id: 4,
    author: "Metro Transport",
    role: "Shipper",
    rating: 5,
    date: "Jan 8, 2024",
    content: "Outstanding performance! Driver was courteous and professional. Highly recommend.",
    loadId: "LD-12335",
    helpful: 6,
  },
];

const trustBadges = [
  { name: "Verified Carrier", icon: Shield, earned: true },
  { name: "Top Performer", icon: Award, earned: true },
  { name: "On-Time Pro", icon: Clock, earned: true },
  { name: "5-Star Rated", icon: Star, earned: false },
];

const ratingBreakdown = [
  { stars: 5, count: 145, percentage: 78 },
  { stars: 4, count: 32, percentage: 17 },
  { stars: 3, count: 6, percentage: 3 },
  { stars: 2, count: 2, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
];

export default function Reviews() {
  return (
    <DashboardLayout title="Reviews & Trust">
      <div className="space-y-6">
        {/* Trust Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Trust Score</CardTitle>
              <CardDescription>Your overall reputation in the freight network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-accent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeDasharray={`${96 * 3.51} ${100 * 3.51}`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">96</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">out of 100</p>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 text-chart-4" />
                        <span className="text-sm text-muted-foreground">Avg Rating</span>
                      </div>
                      <p className="text-2xl font-bold">4.8</p>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Total Reviews</span>
                      </div>
                      <p className="text-2xl font-bold">186</p>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-chart-1" />
                        <span className="text-sm text-muted-foreground">On-Time Rate</span>
                      </div>
                      <p className="text-2xl font-bold">96.2%</p>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-chart-2" />
                        <span className="text-sm text-muted-foreground">Repeat Clients</span>
                      </div>
                      <p className="text-2xl font-bold">78%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trust Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.name}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        badge.earned ? "bg-primary/10" : "bg-accent/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          badge.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{badge.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {badge.earned ? "Earned" : "In Progress"}
                        </p>
                      </div>
                      {badge.earned && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reviews">
          <TabsList>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="breakdown">Rating Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Reviews</CardTitle>
                    <CardDescription>What customers are saying about you</CardDescription>
                  </div>
                  <Button variant="outline">Request Review</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {review.author.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{review.author}</h4>
                              <Badge variant="outline">{review.role}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{review.date}</span>
                              <span>•</span>
                              <span>{review.loadId}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-chart-4 fill-chart-4" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{review.content}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Breakdown of all 186 reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ratingBreakdown.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-20">
                        <span className="font-medium">{rating.stars}</span>
                        <Star className="h-4 w-4 text-chart-4 fill-chart-4" />
                      </div>
                      <Progress value={rating.percentage} className="flex-1 h-3" />
                      <div className="w-16 text-right">
                        <span className="text-sm text-muted-foreground">{rating.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

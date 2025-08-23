"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Report {
  id: string;
  name: string;
  type: "client" | "portfolio" | "performance" | "business" | "compliance";
  status: "completed" | "generating" | "scheduled" | "failed";
  generatedDate?: string;
  scheduledDate?: string;
  size?: string;
  downloadUrl?: string;
  description: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    name: "Q4 2023 Portfolio Performance Report",
    type: "portfolio",
    status: "completed",
    generatedDate: "2024-01-15",
    size: "2.4 MB",
    downloadUrl: "#",
    description: "Comprehensive portfolio performance analysis for Q4 2023",
  },
  {
    id: "2",
    name: "Client Relationship Summary - John Doe",
    type: "client",
    status: "completed",
    generatedDate: "2024-01-14",
    size: "1.8 MB",
    downloadUrl: "#",
    description: "Complete client profile and relationship history",
  },
  {
    id: "3",
    name: "Monthly Business Analytics",
    type: "business",
    status: "generating",
    description:
      "Revenue, client acquisition, and business metrics for January 2024",
  },
  {
    id: "4",
    name: "Compliance Audit Report",
    type: "compliance",
    status: "scheduled",
    scheduledDate: "2024-01-20",
    description: "Quarterly compliance review and audit documentation",
  },
  {
    id: "5",
    name: "Investment Performance Benchmark",
    type: "performance",
    status: "failed",
    description: "Comparative analysis against market benchmarks",
  },
];

const reportTypeLabels = {
  client: "Client Reports",
  portfolio: "Portfolio Reports",
  performance: "Performance Reports",
  business: "Business Reports",
  compliance: "Compliance Reports",
};

const statusColors = {
  completed: "bg-green-100 text-green-700 border-green-200",
  generating: "bg-blue-100 text-blue-700 border-blue-200",
  scheduled: "bg-yellow-100 text-yellow-700 border-yellow-200",
  failed: "bg-red-100 text-red-700 border-red-200",
};

const statusIcons = {
  completed: CheckCircle,
  generating: Clock,
  scheduled: Calendar,
  failed: AlertCircle,
};

export function ReportsDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Calculate metrics
  const totalReports = mockReports.length;
  const completedReports = mockReports.filter(
    (r) => r.status === "completed"
  ).length;
  const generatingReports = mockReports.filter(
    (r) => r.status === "generating"
  ).length;
  const scheduledReports = mockReports.filter(
    (r) => r.status === "scheduled"
  ).length;

  // Business analytics data
  const businessMetrics = {
    totalRevenue: 125000,
    newClients: 8,
    portfolioGrowth: 12.5,
    clientSatisfaction: 94,
  };

  const getStatusColor = (status: string) => {
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-700"
    );
  };

  const getStatusIcon = (status: string) => {
    const IconComponent = statusIcons[status as keyof typeof statusIcons];
    return IconComponent || AlertCircle;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const reportsByType = Object.keys(reportTypeLabels).map((type) => {
    const reports = mockReports.filter((r) => r.type === type);
    return {
      type,
      label: reportTypeLabels[type as keyof typeof reportTypeLabels],
      count: reports.length,
      completed: reports.filter((r) => r.status === "completed").length,
    };
  });

  return (
    <div className="space-y-6">
      {/* Reports Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedReports}
            </div>
            <p className="text-xs text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generating</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {generatingReports}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {scheduledReports}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="business">Business Analytics</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Report Types */}
          <Card>
            <CardHeader>
              <CardTitle>Report Categories</CardTitle>
              <CardDescription>
                Available report types and completion status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportsByType.map((category) => (
                  <div key={category.type} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{category.label}</h3>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span>
                          {category.completed}/{category.count}
                        </span>
                      </div>
                      <Progress
                        value={
                          category.count > 0
                            ? (category.completed / category.count) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Latest generated and scheduled reports
                </CardDescription>
              </div>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports.map((report) => {
                  const StatusIcon = getStatusIcon(report.status);

                  return (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <StatusIcon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold truncate">
                            {report.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {reportTypeLabels[report.type]}
                            </Badge>
                            {report.generatedDate && (
                              <span>
                                Generated {formatDate(report.generatedDate)}
                              </span>
                            )}
                            {report.scheduledDate && (
                              <span>
                                Scheduled {formatDate(report.scheduledDate)}
                              </span>
                            )}
                            {report.size && <span>{report.size}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(report.status)}
                        >
                          {report.status.replace("-", " ")}
                        </Badge>
                        {report.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          {/* Business Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  RM {businessMetrics.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Clients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {businessMetrics.newClients}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Portfolio Growth
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  +{businessMetrics.portfolioGrowth}%
                </div>
                <p className="text-xs text-muted-foreground">YTD average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Client Satisfaction
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {businessMetrics.clientSatisfaction}%
                </div>
                <p className="text-xs text-muted-foreground">Average rating</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Business Analytics Reports</CardTitle>
              <CardDescription>
                Generate comprehensive business performance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Revenue Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Monthly and quarterly revenue breakdown
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Client Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        Client acquisition and retention metrics
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <PieChart className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Service Breakdown</h3>
                      <p className="text-sm text-muted-foreground">
                        Revenue by service type and category
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">Growth Metrics</h3>
                      <p className="text-sm text-muted-foreground">
                        Business growth and performance trends
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Analytics Reports</CardTitle>
              <CardDescription>
                Generate detailed portfolio performance and analysis reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Performance Summary</h3>
                      <p className="text-sm text-muted-foreground">
                        Aggregate portfolio performance across all clients
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <PieChart className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Asset Allocation</h3>
                      <p className="text-sm text-muted-foreground">
                        Asset allocation breakdown and analysis
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Risk Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Portfolio risk metrics and stress testing
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Activity className="h-8 w-8 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">Benchmark Comparison</h3>
                      <p className="text-sm text-muted-foreground">
                        Performance vs market benchmarks
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

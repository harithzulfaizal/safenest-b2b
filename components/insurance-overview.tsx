"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import {
  AlertTriangle,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  FileText,
  Heart,
  Home,
  Plane,
  Plus,
  Shield,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface InsuranceOverviewProps {
  onNavigateToPolicies?: () => void;
  onNavigateToNeedsAssessment?: () => void;
  onNavigateToAddPolicy?: () => void;
  onNavigateToPolicyDetails?: (policyId: string) => void;
}

export function InsuranceOverview({
  onNavigateToPolicies,
  onNavigateToNeedsAssessment,
  onNavigateToAddPolicy,
  onNavigateToPolicyDetails,
}: InsuranceOverviewProps) {
  const [selectedCoverage, setSelectedCoverage] = useState<string | null>(null);

  // Mock data - in real app, this would come from API
  const protectionScore = 75;
  const coverageAreas = [
    {
      id: "health",
      name: "Health Insurance",
      icon: Heart,
      status: "covered",
      policies: 2,
      totalCoverage: "RM 300,000",
      color: "text-green-600",
    },
    {
      id: "life",
      name: "Life Insurance",
      icon: Shield,
      status: "partial",
      policies: 1,
      totalCoverage: "RM 500,000",
      color: "text-yellow-600",
    },
    {
      id: "motor",
      name: "Motor Insurance",
      icon: Car,
      status: "covered",
      policies: 1,
      totalCoverage: "RM 80,000",
      color: "text-green-600",
    },
    {
      id: "home",
      name: "Home Insurance",
      icon: Home,
      status: "not-covered",
      policies: 0,
      totalCoverage: "RM 0",
      color: "text-red-600",
    },
    {
      id: "travel",
      name: "Travel Insurance",
      icon: Plane,
      status: "covered",
      policies: 1,
      totalCoverage: "RM 100,000",
      color: "text-green-600",
    },
  ];

  const upcomingRenewals = [
    {
      id: "1",
      policyName: "Great Eastern MediSave",
      insurer: "Great Eastern",
      type: "Health",
      dueDate: "2024-02-15",
      amount: "RM 2,400",
      daysLeft: 12,
      autoDeduct: true,
    },
    {
      id: "2",
      policyName: "Allianz Motor Comprehensive",
      insurer: "Allianz",
      type: "Motor",
      dueDate: "2024-02-28",
      amount: "RM 1,800",
      daysLeft: 25,
      autoDeduct: false,
    },
    {
      id: "3",
      policyName: "AIA Life Protection",
      insurer: "AIA",
      type: "Life",
      dueDate: "2024-03-10",
      amount: "RM 3,600",
      daysLeft: 35,
      autoDeduct: true,
    },
  ];

  const activePolicies = [
    {
      id: "1",
      name: "Great Eastern MediSave",
      insurer: "Great Eastern",
      type: "Health",
      premium: "RM 200/month",
      coverage: "RM 150,000",
      nextDue: "Feb 15, 2024",
      status: "active",
    },
    {
      id: "2",
      name: "AIA Life Protection",
      insurer: "AIA",
      type: "Life",
      premium: "RM 300/month",
      coverage: "RM 500,000",
      nextDue: "Mar 10, 2024",
      status: "active",
    },
    {
      id: "3",
      name: "Allianz Motor Comprehensive",
      insurer: "Allianz",
      type: "Motor",
      premium: "RM 150/month",
      coverage: "RM 80,000",
      nextDue: "Feb 28, 2024",
      status: "active",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "covered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "partial":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "not-covered":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "covered":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Covered
          </Badge>
        );
      case "partial":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Partial
          </Badge>
        );
      case "not-covered":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Not Covered
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Moderate";
    return "Needs Attention";
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Insurance Overview</h2>
          <p className="text-muted-foreground">
            Manage your insurance coverage and protection needs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onNavigateToNeedsAssessment}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Assess Coverage Needs
          </Button>
          <Button onClick={onNavigateToAddPolicy}>
            <Plus className="h-4 w-4 mr-2" />
            Add Policy
          </Button>
        </div>
      </div>

      {/* Protection Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Overall Protection Score
          </CardTitle>
          <CardDescription>
            Based on your coverage across key protection areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div
                className={`text-4xl font-bold ${getScoreColor(
                  protectionScore
                )}`}
              >
                {protectionScore}
              </div>
              <div>
                <div
                  className={`text-lg font-semibold ${getScoreColor(
                    protectionScore
                  )}`}
                >
                  {getScoreStatus(protectionScore)}
                </div>
                <div className="text-sm text-muted-foreground">
                  You have active policies for 4 out of 5 key protection areas
                </div>
              </div>
            </div>
            <Progress value={protectionScore} className="w-32" />
          </div>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your critical illness coverage may be insufficient based on your
              income. Consider reviewing your life insurance policy.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Coverage Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Coverage Areas</CardTitle>
          <CardDescription>
            Quick status of your key protection areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {coverageAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedCoverage === area.id
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setSelectedCoverage(area.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-6 w-6 ${area.color}`} />
                    {getStatusIcon(area.status)}
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{area.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {area.policies}{" "}
                      {area.policies === 1 ? "policy" : "policies"}
                    </div>
                    <div className="text-xs font-medium">
                      {area.totalCoverage}
                    </div>
                    {getStatusBadge(area.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Renewals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Renewals & Premiums
          </CardTitle>
          <CardDescription>
            Policies requiring attention in the next 60 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingRenewals.map((renewal) => (
              <div
                key={renewal.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      renewal.daysLeft <= 15
                        ? "bg-red-500"
                        : renewal.daysLeft <= 30
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{renewal.policyName}</div>
                    <div className="text-sm text-muted-foreground">
                      {renewal.insurer} • {renewal.type}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{renewal.amount}</div>
                  <div className="text-sm text-muted-foreground">
                    Due in {renewal.daysLeft} days
                  </div>
                  {renewal.autoDeduct && (
                    <Badge variant="outline" className="text-xs mt-1">
                      Auto-deduct
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Policies Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Policies</CardTitle>
              <CardDescription>
                Your most important active insurance policies
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onNavigateToPolicies}>
              View All Policies
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePolicies.map((policy) => (
              <div
                key={policy.id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onNavigateToPolicyDetails?.(policy.id)}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{policy.type}</Badge>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Active
                    </Badge>
                  </div>
                  <div>
                    <div className="font-medium">{policy.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {policy.insurer}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coverage:</span>
                      <span className="font-medium">{policy.coverage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Premium:</span>
                      <span className="font-medium">{policy.premium}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Due:</span>
                      <span className="font-medium">{policy.nextDue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col"
              onClick={onNavigateToAddPolicy}
            >
              <Plus className="h-6 w-6 mb-2" />
              Add New Policy
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col"
              onClick={onNavigateToNeedsAssessment}
            >
              <TrendingUp className="h-6 w-6 mb-2" />
              Review Coverage
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              File a Claim
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              Explore Options
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import {
  Bell,
  Calendar,
  Car,
  Download,
  Edit,
  Eye,
  FileText,
  Heart,
  Home,
  MoreHorizontal,
  Plane,
  Plus,
  Search,
  Shield,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface MyPoliciesProps {
  onBack?: () => void;
  onNavigateToPolicyDetails?: (policyId: string) => void;
  onNavigateToAddPolicy?: () => void;
}

export function MyPolicies({
  onBack,
  onNavigateToPolicyDetails,
  onNavigateToAddPolicy,
}: MyPoliciesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Mock data - in real app, this would come from API
  const policies = [
    {
      id: "1",
      name: "Great Eastern MediSave",
      policyNumber: "GE-MS-2023-001",
      insurer: "Great Eastern",
      type: "Health",
      status: "active",
      premium: 2400,
      frequency: "Annual",
      nextDue: "2024-02-15",
      coverage: "150,000",
      startDate: "2023-02-15",
      endDate: "2024-02-15",
      hasDocuments: true,
      hasReminders: true,
      icon: Heart,
    },
    {
      id: "2",
      name: "AIA Life Protection Plus",
      policyNumber: "AIA-LP-2022-045",
      insurer: "AIA",
      type: "Life",
      status: "active",
      premium: 3600,
      frequency: "Annual",
      nextDue: "2024-03-10",
      coverage: "500,000",
      startDate: "2022-03-10",
      endDate: "2027-03-10",
      hasDocuments: true,
      hasReminders: true,
      icon: Shield,
    },
    {
      id: "3",
      name: "Allianz Motor Comprehensive",
      policyNumber: "ALZ-MC-2023-789",
      insurer: "Allianz",
      type: "Motor",
      status: "active",
      premium: 1800,
      frequency: "Annual",
      nextDue: "2024-02-28",
      coverage: "80,000",
      startDate: "2023-02-28",
      endDate: "2024-02-28",
      hasDocuments: true,
      hasReminders: false,
      icon: Car,
    },
    {
      id: "4",
      name: "Zurich Home Shield",
      policyNumber: "ZUR-HS-2023-156",
      insurer: "Zurich",
      type: "Home",
      status: "expired",
      premium: 1200,
      frequency: "Annual",
      nextDue: "2024-01-15",
      coverage: "200,000",
      startDate: "2023-01-15",
      endDate: "2024-01-15",
      hasDocuments: false,
      hasReminders: false,
      icon: Home,
    },
    {
      id: "5",
      name: "Tune Protect Travel",
      policyNumber: "TP-TR-2024-012",
      insurer: "Tune Protect",
      type: "Travel",
      status: "active",
      premium: 150,
      frequency: "Per Trip",
      nextDue: "N/A",
      coverage: "100,000",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      hasDocuments: true,
      hasReminders: false,
      icon: Plane,
    },
  ];

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.insurer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" ||
      policy.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus =
      filterStatus === "all" || policy.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "expired":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Expired
          </Badge>
        );
      case "lapsed":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Lapsed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    if (dateString === "N/A") return "N/A";
    return new Date(dateString).toLocaleDateString("en-MY", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysUntilDue = (dueDateString: string) => {
    if (dueDateString === "N/A") return null;
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Policies</h2>
          <p className="text-muted-foreground">
            Manage all your insurance policies in one place
          </p>
        </div>
        <Button onClick={onNavigateToAddPolicy}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Policy
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search policies, insurers, or policy numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="life">Life</SelectItem>
                  <SelectItem value="motor">Motor</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="lapsed">Lapsed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredPolicies.length}{" "}
            {filteredPolicies.length === 1 ? "Policy" : "Policies"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.map((policy) => {
                  const Icon = policy.icon;
                  const daysUntilDue = getDaysUntilDue(policy.nextDue);

                  return (
                    <TableRow
                      key={policy.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => onNavigateToPolicyDetails?.(policy.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{policy.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {policy.insurer} • {policy.policyNumber}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{policy.type}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(policy.status)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {formatCurrency(policy.premium)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {policy.frequency}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {formatDate(policy.nextDue)}
                          </div>
                          {daysUntilDue !== null && (
                            <div
                              className={`text-sm ${
                                daysUntilDue <= 15
                                  ? "text-red-600"
                                  : daysUntilDue <= 30
                                  ? "text-yellow-600"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {daysUntilDue > 0
                                ? `${daysUntilDue} days left`
                                : daysUntilDue === 0
                                ? "Due today"
                                : `${Math.abs(daysUntilDue)} days overdue`}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formatCurrency(Number.parseInt(policy.coverage))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {policy.hasDocuments && (
                            <FileText
                              className="h-4 w-4 text-green-600"
                              title="Documents attached"
                            />
                          )}
                          {policy.hasReminders && (
                            <Bell
                              className="h-4 w-4 text-blue-600"
                              title="Reminders set"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                onNavigateToPolicyDetails?.(policy.id)
                              }
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Policy
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bell className="h-4 w-4 mr-2" />
                              Set Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Renew Policy
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Policy
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {policies.filter((p) => p.status === "active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Policies</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {formatCurrency(
                policies
                  .filter((p) => p.status === "active")
                  .reduce((sum, p) => sum + p.premium, 0)
              )}
            </div>
            <div className="text-sm text-muted-foreground">Annual Premiums</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {formatCurrency(
                policies
                  .filter((p) => p.status === "active")
                  .reduce((sum, p) => sum + Number.parseInt(p.coverage), 0)
              )}
            </div>
            <div className="text-sm text-muted-foreground">Total Coverage</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {
                policies.filter((p) => {
                  const days = getDaysUntilDue(p.nextDue);
                  return days !== null && days <= 30 && days >= 0;
                }).length
              }
            </div>
            <div className="text-sm text-muted-foreground">Due Soon</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

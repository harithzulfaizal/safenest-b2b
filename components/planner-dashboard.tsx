// components/planner-dashboard.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlannerDashboardData } from "@/hooks/use-planner-dashboard-data";
import { isThisMonth, parseISO } from "date-fns"; // Import date-fns for date logic
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  DollarSign,
  Eye,
  FileText,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

interface PlannerDashboardProps {
  // clients: Client[]; // <-- ADDED: Prop to receive the clients data
  onNavigateToClients?: () => void;
  onNavigateToClient?: (clientId: string) => void;
  onNavigateToAppointments?: () => void;
  onNavigateToTasks?: () => void;
}

export function PlannerDashboard({
  // clients, // <-- Receive the clients prop
  onNavigateToClients,
  onNavigateToClient,
  onNavigateToAppointments,
  onNavigateToTasks,
}: PlannerDashboardProps) {
  const { loading, error, clients, metrics } = usePlannerDashboardData();
  if (loading)
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading dashboard…
      </div>
    );
  if (error)
    return <div className="p-6 text-sm text-red-600">Error: {error}</div>;
  // Calculate metrics dynamically based on the 'clients' prop
  const totalAUM = clients.reduce(
    (sum, client) => sum + client.portfolioValue,
    0
  );
  const activeClientsCount = clients.filter(
    (c) => c.status === "active"
  ).length;
  const needsAttentionClientsCount = clients.filter(
    (c) => c.status === "needs-attention"
  ).length;
  const newClientsThisMonth = clients.filter(
    (c) => c.joinDate && isThisMonth(parseISO(c.joinDate))
  ).length;

  const dashboardMetrics = {
    totalClients: clients.length,
    activeClients: activeClientsCount,
    totalAUM: totalAUM,
    monthlyRevenue: 45000, // This remains hardcoded as it's not client data driven here
    newClientsThisMonth: newClientsThisMonth, // Dynamic calculation
    appointmentsToday: 4, // This remains hardcoded for now
    pendingTasks: 12, // This remains hardcoded for now
    reviewsDue: needsAttentionClientsCount, // Dynamic calculation
  };

  // Use a slice of the clients array for recent activity
  const recentClients = clients.slice(0, 3); // Gets the first 3 clients from the list

  // These can remain hardcoded as they're not directly from the client list
  const upcomingAppointments = [
    {
      id: "apt-1",
      clientName: "John Doe",
      type: "Portfolio Review",
      time: "10:00 AM",
      date: "Today",
      status: "confirmed",
    },
    {
      id: "apt-2",
      clientName: "Sarah Lim",
      type: "Financial Planning",
      time: "2:00 PM",
      date: "Today",
      status: "confirmed",
    },
    {
      id: "apt-3",
      clientName: "Ahmad Rahman", // Changed from Michael Tan for consistency with your mock data
      type: "Investment Consultation",
      time: "9:00 AM",
      date: "Tomorrow",
      status: "pending",
    },
  ];

  const urgentTasks = [
    {
      id: "task-1",
      title: "Complete risk assessment for Sarah Lim",
      client: "Sarah Lim",
      dueDate: "Today",
      priority: "high",
    },
    {
      id: "task-2",
      title: "Prepare quarterly report for Ahmad Rahman",
      client: "Ahmad Rahman",
      dueDate: "Tomorrow",
      priority: "medium",
    },
    {
      id: "task-3",
      title: "Follow up on insurance claim",
      client: "John Doe",
      dueDate: "This week",
      priority: "low",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "needs-attention":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Good morning, Sarah!</h1>
        <p className="text-muted-foreground">
          Here's your portfolio overview for today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardMetrics.totalClients}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+
              {dashboardMetrics.newClientsThisMonth} this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assets Under Management
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {(dashboardMetrics.totalAUM / 1000000).toFixed(1)}M
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.2% from last month {/* This is still hardcoded */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {dashboardMetrics.monthlyRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              85% of monthly target
            </div>{" "}
            {/* This is still hardcoded */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardMetrics.appointmentsToday}
            </div>
            <div className="text-xs text-muted-foreground">
              {dashboardMetrics.pendingTasks} pending tasks
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Client Activity</CardTitle>
            <Button variant="outline" size="sm" onClick={onNavigateToClients}>
              View All Clients
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Maps over the dynamically selected recentClients */}
              {recentClients.length > 0 ? (
                recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                          alt={client.name}
                        />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">
                          RM {client.portfolioValue.toLocaleString()} •{" "}
                          {client.riskProfile}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last contact: {client.lastContact}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(client.status)}
                      >
                        {client.status.replace("-", " ")}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigateToClient?.(client.id)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  No recent clients to display.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments (remains hardcoded) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today's Schedule</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToAppointments}
            >
              View Calendar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-medium">
                        {appointment.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Tasks & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Urgent Tasks</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onNavigateToTasks}>
              View All Tasks
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Client: {task.client}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: {task.dueDate}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Reviews Due This Week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {dashboardMetrics.reviewsDue}
                </div>
                <p className="text-sm text-muted-foreground">
                  Client reviews scheduled for this week
                </p>
                <Button className="mt-4" size="sm">
                  Schedule Reviews
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions (still hardcoded buttons, but the "Add New Client" will trigger the modal from app/page.tsx) */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* This button still needs to trigger the modal through a prop */}
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToClients} // Re-using this to trigger the same action as "View All Clients" which opens modal
            >
              <Users className="h-5 w-5" />
              <span className="text-xs">Add New Client</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Schedule Meeting</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Generate Report</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Portfolio Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

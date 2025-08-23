"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Search,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "completed" | "overdue";
  category:
    | "client-follow-up"
    | "compliance"
    | "research"
    | "admin"
    | "meeting-prep";
  assignedTo: string;
  clientName?: string;
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
  completedDate?: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Prepare quarterly review for John Doe",
    description:
      "Compile portfolio performance report and prepare presentation materials",
    priority: "high",
    status: "in-progress",
    category: "meeting-prep",
    assignedTo: "You",
    clientName: "John Doe",
    dueDate: "2024-01-16",
    estimatedHours: 3,
    actualHours: 2,
  },
  {
    id: "2",
    title: "Follow up on Sarah Lim's insurance application",
    description: "Check status with insurance company and update client",
    priority: "medium",
    status: "todo",
    category: "client-follow-up",
    assignedTo: "You",
    clientName: "Sarah Lim",
    dueDate: "2024-01-17",
    estimatedHours: 1,
  },
  {
    id: "3",
    title: "Complete CPD training on ESG investing",
    description: "Finish online course and submit certificate",
    priority: "medium",
    status: "overdue",
    category: "compliance",
    assignedTo: "You",
    dueDate: "2024-01-15",
    estimatedHours: 4,
  },
  {
    id: "4",
    title: "Research retirement income strategies",
    description: "Analyze new retirement products for client recommendations",
    priority: "low",
    status: "todo",
    category: "research",
    assignedTo: "You",
    dueDate: "2024-01-20",
    estimatedHours: 6,
  },
  {
    id: "5",
    title: "Update client CRM records",
    description: "Sync recent meeting notes and update contact information",
    priority: "low",
    status: "completed",
    category: "admin",
    assignedTo: "You",
    dueDate: "2024-01-14",
    estimatedHours: 2,
    actualHours: 1.5,
    completedDate: "2024-01-14",
  },
  {
    id: "6",
    title: "Prepare investment proposal for Michael Chen",
    description: "Create customized investment strategy presentation",
    priority: "urgent",
    status: "todo",
    category: "meeting-prep",
    assignedTo: "You",
    clientName: "Michael Chen",
    dueDate: "2024-01-16",
    estimatedHours: 4,
  },
];

const priorityColors = {
  low: "bg-gray-100 text-gray-700 border-gray-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  urgent: "bg-red-100 text-red-700 border-red-200",
};

const statusColors = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
};

const categoryLabels = {
  "client-follow-up": "Client Follow-up",
  compliance: "Compliance",
  research: "Research",
  admin: "Admin",
  "meeting-prep": "Meeting Prep",
};

export function TasksManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.clientName &&
        task.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;
    const matchesStatus =
      selectedStatus === "all" || task.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;

    return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
  });

  // Calculate metrics
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(
    (t) => t.status === "completed"
  ).length;
  const overdueTasks = mockTasks.filter((t) => t.status === "overdue").length;
  const inProgressTasks = mockTasks.filter(
    (t) => t.status === "in-progress"
  ).length;
  const completionRate = (completedTasks / totalTasks) * 100;

  // Calculate time tracking
  const totalEstimatedHours = mockTasks.reduce(
    (sum, t) => sum + t.estimatedHours,
    0
  );
  const totalActualHours = mockTasks.reduce(
    (sum, t) => sum + (t.actualHours || 0),
    0
  );

  const getPriorityColor = (priority: string) => {
    return (
      priorityColors[priority as keyof typeof priorityColors] ||
      "bg-gray-100 text-gray-700"
    );
  };

  const getStatusColor = (status: string) => {
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-700"
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `In ${diffDays} days`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">Active tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completionRate.toFixed(0)}%
            </div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {overdueTasks}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {inProgressTasks}
            </div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
      </div>

      {/* Time Tracking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Time Tracking</CardTitle>
          <CardDescription>
            Estimated vs actual hours across all tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalEstimatedHours}h</div>
              <p className="text-sm text-muted-foreground">Estimated</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalActualHours}h</div>
              <p className="text-sm text-muted-foreground">Actual</p>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  totalActualHours <= totalEstimatedHours
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {totalEstimatedHours > 0
                  ? ((totalActualHours / totalEstimatedHours) * 100).toFixed(0)
                  : 0}
                %
              </div>
              <p className="text-sm text-muted-foreground">Efficiency</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-full lg:w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full lg:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Checkbox
                    checked={task.status === "completed"}
                    className="h-5 w-5"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3
                          className={`font-semibold ${
                            task.status === "completed"
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {task.title}
                        </h3>
                        {getStatusIcon(task.status)}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge
                          variant="outline"
                          className={getPriorityColor(task.priority)}
                        >
                          {task.priority.toUpperCase()}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getStatusColor(task.status)}
                        >
                          {task.status.replace("-", " ").toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {categoryLabels[task.category]}
                        </Badge>
                        {task.clientName && (
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-700"
                          >
                            <User className="h-3 w-3 mr-1" />
                            {task.clientName}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span
                            className={
                              task.status === "overdue"
                                ? "text-red-600 font-medium"
                                : ""
                            }
                          >
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {task.actualHours
                              ? `${task.actualHours}h / ${task.estimatedHours}h`
                              : `${task.estimatedHours}h est.`}
                          </span>
                        </div>
                        {task.completedDate && (
                          <div className="text-green-600">
                            Completed {formatDate(task.completedDate)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                          alt={task.assignedTo}
                        />
                        <AvatarFallback className="text-xs">
                          {task.assignedTo === "You"
                            ? "ME"
                            : task.assignedTo
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ||
                selectedPriority !== "all" ||
                selectedStatus !== "all" ||
                selectedCategory !== "all"
                  ? "Try adjusting your filters or search terms."
                  : "Start by adding your first task."}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

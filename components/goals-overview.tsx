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
import {
  AlertTriangle,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  GraduationCap,
  Home,
  Plane,
  Plus,
  Shield,
  Star,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

interface GoalsOverviewProps {
  onNavigateToGoalDetails?: (goalId: string) => void;
  onNavigateToCreateGoal?: () => void;
  onNavigateToGoalIdeas?: () => void;
  onNavigateToGoalHistory?: () => void;
}

export function GoalsOverview({
  onNavigateToGoalDetails,
  onNavigateToCreateGoal,
  onNavigateToGoalIdeas,
  onNavigateToGoalHistory,
}: GoalsOverviewProps) {
  // Mock data - in real app, this would come from API
  const overallProgress = {
    totalProgress: 68,
    totalSaved: 85000,
    totalTarget: 125000,
    estimatedCompletionDate: "December 2026",
    monthlyContribution: 2900,
  };

  const activeGoals = [
    {
      id: "emergency-fund",
      name: "Emergency Fund",
      icon: Shield,
      image: "/placeholder.svg?height=200&width=300",
      targetAmount: 25000,
      currentAmount: 21000,
      targetDate: "2024-06-30",
      status: "On Track",
      priority: "High",
      requiredMonthly: 800,
      timeRemaining: "4 months",
      category: "Safety",
      color: "bg-green-500",
    },
    {
      id: "house-deposit",
      name: "House Down Payment",
      icon: Home,
      image: "/placeholder.svg?height=200&width=300",
      targetAmount: 80000,
      currentAmount: 45000,
      targetDate: "2025-12-31",
      status: "Behind",
      priority: "High",
      requiredMonthly: 1500,
      timeRemaining: "23 months",
      category: "Major Purchase",
      color: "bg-blue-500",
    },
    {
      id: "japan-holiday",
      name: "Japan Holiday Fund",
      icon: Plane,
      image: "/placeholder.svg?height=200&width=300",
      targetAmount: 8000,
      currentAmount: 6500,
      targetDate: "2024-09-30",
      status: "Ahead",
      priority: "Medium",
      requiredMonthly: 200,
      timeRemaining: "8 months",
      category: "Travel",
      color: "bg-purple-500",
    },
    {
      id: "car-fund",
      name: "Car Replacement Fund",
      icon: Car,
      image: "/placeholder.svg?height=200&width=300",
      targetAmount: 35000,
      currentAmount: 12500,
      targetDate: "2025-06-30",
      status: "On Track",
      priority: "Medium",
      requiredMonthly: 600,
      timeRemaining: "16 months",
      category: "Transportation",
      color: "bg-orange-500",
    },
    {
      id: "education-fund",
      name: "Child's Education Fund",
      icon: GraduationCap,
      image: "/placeholder.svg?height=200&width=300",
      targetAmount: 50000,
      currentAmount: 8500,
      targetDate: "2030-01-01",
      status: "At Risk",
      priority: "High",
      requiredMonthly: 580,
      timeRemaining: "72 months",
      category: "Education",
      color: "bg-indigo-500",
    },
  ];

  const completedGoals = [
    {
      id: "ptptn-payoff",
      name: "PTPTN Loan Payoff",
      amount: 15000,
      completedDate: "2023-12-15",
      timeTaken: "18 months",
      category: "Debt",
    },
    {
      id: "laptop-fund",
      name: "Laptop Upgrade Fund",
      amount: 3500,
      completedDate: "2024-01-08",
      timeTaken: "8 months",
      category: "Technology",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ahead":
        return "text-green-600";
      case "on track":
        return "text-blue-600";
      case "behind":
        return "text-yellow-600";
      case "at risk":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "ahead":
        return "default" as const;
      case "on track":
        return "secondary" as const;
      case "behind":
        return "outline" as const;
      case "at risk":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "ahead":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "on track":
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case "behind":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "at risk":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  // Goals heatmap data for priority visualization
  const getGoalUrgency = (goal: any) => {
    const monthsRemaining = Number.parseInt(goal.timeRemaining.split(" ")[0]);
    if (monthsRemaining <= 6) return "urgent";
    if (monthsRemaining <= 12) return "moderate";
    return "low";
  };

  const getGoalProgress = (goal: any) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    if (progress >= 80) return "high";
    if (progress >= 50) return "moderate";
    return "low";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Financial Goals</h1>
          <p className="text-muted-foreground">
            Track your progress towards your financial dreams
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onNavigateToGoalHistory}>
            <Clock className="h-4 w-4 mr-2" />
            View History
          </Button>
          <Button variant="outline" onClick={onNavigateToGoalIdeas}>
            <Star className="h-4 w-4 mr-2" />
            Goal Ideas
          </Button>
          <Button onClick={onNavigateToCreateGoal}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Goal
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-purple-600" />
            <span>
              You are {overallProgress.totalProgress}% closer to your financial
              dreams!
            </span>
          </CardTitle>
          <CardDescription>
            RM {overallProgress.totalSaved.toLocaleString()} accumulated towards
            your goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Ring */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${overallProgress.totalProgress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {overallProgress.totalProgress}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Complete
                    </div>
                  </div>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                On Track Overall
              </Badge>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  RM {overallProgress.totalSaved.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Saved</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  RM {overallProgress.totalTarget.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Target
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-lg font-bold text-purple-600 mb-2">
                  {overallProgress.estimatedCompletionDate}
                </div>
                <div className="text-sm text-muted-foreground">
                  Estimated Completion
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-lg font-bold text-orange-600 mb-2">
                  RM {overallProgress.monthlyContribution.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Monthly Contributions
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-700 text-center">
              <strong>🎯 You're doing great!</strong> At your current pace, all
              goals are estimated to be achieved by{" "}
              {overallProgress.estimatedCompletionDate}. Keep up the momentum!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Goals Heatmap/Priority Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>Goals Priority Matrix</span>
          </CardTitle>
          <CardDescription>
            Visual overview of which goals need immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm font-medium mb-2">High Priority</div>
              <div className="space-y-2">
                {activeGoals
                  .filter(
                    (goal) =>
                      goal.status === "At Risk" || goal.status === "Behind"
                  )
                  .map((goal) => (
                    <div
                      key={goal.id}
                      className="p-2 bg-red-50 border border-red-200 rounded text-xs"
                    >
                      {goal.name}
                    </div>
                  ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium mb-2">Medium Priority</div>
              <div className="space-y-2">
                {activeGoals
                  .filter((goal) => goal.status === "On Track")
                  .map((goal) => (
                    <div
                      key={goal.id}
                      className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs"
                    >
                      {goal.name}
                    </div>
                  ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium mb-2">Low Priority</div>
              <div className="space-y-2">
                {activeGoals
                  .filter((goal) => goal.status === "Ahead")
                  .map((goal) => (
                    <div
                      key={goal.id}
                      className="p-2 bg-green-50 border border-green-200 rounded text-xs"
                    >
                      {goal.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Goals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Active Goals ({activeGoals.length})
          </h2>
          <Button variant="outline" size="sm">
            Sort by Priority
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeGoals.map((goal) => {
            const Icon = goal.icon;
            const progressPercentage =
              (goal.currentAmount / goal.targetAmount) * 100;

            return (
              <Card
                key={goal.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onNavigateToGoalDetails?.(goal.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 ${goal.color} rounded-full flex items-center justify-center`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                          {goal.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {goal.category}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={getStatusBadge(goal.status)}
                      className="text-xs"
                    >
                      {goal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Goal Image */}
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={goal.image || "/placeholder.svg"}
                      alt={goal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        RM {goal.currentAmount.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        RM {goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-semibold">
                        RM {goal.requiredMonthly}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Required Monthly
                      </div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-semibold">
                        {goal.timeRemaining}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Time Left
                      </div>
                    </div>
                  </div>

                  {/* Target Date */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Target:</span>
                    </div>
                    <span className="font-medium">
                      {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(goal.status)}
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          goal.status
                        )}`}
                      >
                        {goal.status}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {goal.priority} Priority
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recently Completed Goals */}
      {completedGoals.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <span>Recently Completed Goals</span>
            </CardTitle>
            <CardDescription>
              Celebrate your financial achievements! 🎉
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedGoals.map((goal, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg border border-green-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-green-800">
                        {goal.name}
                      </div>
                      <div className="text-sm text-green-600">
                        RM {goal.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Completed in {goal.timeTaken} •{" "}
                        {new Date(goal.completedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-green-700 mb-4">
                Congratulations! You've successfully achieved{" "}
                {completedGoals.length} financial goals. What's your next big
                milestone?
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={onNavigateToCreateGoal}
              >
                <Plus className="h-4 w-4 mr-2" />
                Set Your Next Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your goals and explore new opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Plus className="h-5 w-5" />
              <span className="text-sm">Create New Goal</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToGoalIdeas}
            >
              <Star className="h-5 w-5" />
              <span className="text-sm">Explore Goal Ideas</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToGoalHistory}
            >
              <Clock className="h-5 w-5" />
              <span className="text-sm">View Goal History</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
